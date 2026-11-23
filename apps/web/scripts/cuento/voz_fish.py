"""Genera la voz de un cuento con Fish Audio, una frase por archivo.

Uso: python3 scripts/cuento/voz_fish.py lineas.json salida_dir
lineas.json: [{"id": "e1-0", "say": "texto hablado"}, ...]
Imprime la duración de cada archivo (ya sin silencios al inicio y al final).
La clave la inyecta el proxy del entorno (network secret de api.fish.audio).
"""
import json, os, subprocess, sys

VOICE = os.environ.get("FISH_VOICE", "119fec1a64e0408e97ce3b078a188819")  # "Cuento" (provisional)
MODEL = os.environ.get("FISH_MODEL", "s2.1-pro")

def process(src, dst):
    """Recorta silencios dejando margen y suaviza solo ese margen (nunca la voz)."""
    pad = 0.2
    trim = (f"silenceremove=start_periods=1:start_threshold=-55dB:start_silence={pad},"
            f"areverse,silenceremove=start_periods=1:start_threshold=-55dB:start_silence={pad},areverse")
    clean = "highpass=f=60,afftdn=nr=10:nf=-50"
    fades = "afade=t=in:d=0.03,areverse,afade=t=in:d=0.08,areverse"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-af", f"{trim},{clean},loudnorm=I=-18:TP=-2,{fades}",
                    "-ar", "44100", "-ac", "1", "-b:a", "96k", dst], check=True)


lines = json.load(open(sys.argv[1]))
out = sys.argv[2]
os.makedirs(out, exist_ok=True)
durs = {}
for ln in lines:
    raw = os.path.join(out, f"{ln['id']}.raw.mp3")
    dst = os.path.join(out, f"{ln['id']}.mp3")
    if not os.path.exists(dst):
        body = json.dumps({"text": ln["say"], "reference_id": VOICE, "format": "mp3"})
        r = subprocess.run(["curl", "-sS", "-m", "120", "-o", raw, "-w", "%{http_code}", "https://api.fish.audio/v1/tts",
                            "-H", "Authorization: Bearer from-proxy", "-H", "Content-Type: application/json",
                            "-H", f"model: {MODEL}", "--data", body], capture_output=True, text=True)
        if r.stdout != "200":
            sys.exit(f"error {ln['id']}: {r.stdout} {open(raw, 'rb').read()[:200]!r}")
        keep = os.path.join(out, "_raw", f"{ln['id']}.mp3")
        os.makedirs(os.path.dirname(keep), exist_ok=True)
        os.replace(raw, keep)  # se guarda el original para reprocesar sin volver a generar
        process(keep, dst)
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst], capture_output=True, text=True).stdout)
    durs[ln["id"]] = round(d, 2)
print(json.dumps(durs, indent=1))
