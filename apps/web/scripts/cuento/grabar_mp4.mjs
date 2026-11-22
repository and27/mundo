// Graba el cuento a MP4 (1080x1920, 30 fps) con voz, ambiente y efectos.
// Requiere el servidor dev en :3105. Uso: node scripts/cuento/grabar_mp4.mjs (salida en ./mp4)
import { chromium } from 'playwright';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const PUB = new URL('../../public', import.meta.url).pathname;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('http://localhost:3105/cuento/yachay?render=1',{waitUntil:'networkidle'});await p.waitForFunction(()=>window.__cuento);await p.evaluate(()=>document.fonts.ready);
const n=await p.evaluate(()=>window.__cuento.scenes);
for(let s=0;s<n;s++){const plan=await p.evaluate(i=>window.__cuento.plan(i),s);fs.writeFileSync(`mp4/plan${s}.json`,JSON.stringify(plan));
 const dir=`mp4/f${s}`;fs.mkdirSync(dir,{recursive:true});const N=Math.ceil(plan.duration*30);
 for(let i=0;i<N;i++){await p.evaluate(([s,t])=>window.__cuento.seek(s,t),[s,i/30]);await p.screenshot({path:`${dir}/${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:90})}
 // audio de la escena
 const ins=[],fc=[];let k=0;
 if(plan.bed){ins.push('-stream_loop','-1','-i',PUB+plan.bed);fc.push(`[${k}]atrim=0:${plan.duration},afade=t=in:d=1.2,volume=${plan.bedGain??1}[c${k}]`);k++;}
 for(const c of plan.clips){ins.push('-i',PUB+c.src);const ms=Math.round(c.at*1000);fc.push(`[${k}]aresample=44100,aformat=channel_layouts=mono,volume=${c.gain},adelay=${ms}|${ms}[c${k}]`);k++;}
 fc.push(Array.from({length:k},(_,i)=>`[c${i}]`).join('')+`amix=inputs=${k}:normalize=0:duration=longest,atrim=0:${plan.duration},alimiter=limit=0.9[a]`);
 execFileSync('ffmpeg',['-v','error','-y',...ins,'-filter_complex',fc.join(';'),'-map','[a]','-ac','2','-ar','44100',`mp4/a${s}.wav`]);
 execFileSync('ffmpeg',['-v','error','-y','-framerate','30','-i',`${dir}/%04d.jpg`,'-i',`mp4/a${s}.wav`,'-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-shortest',`mp4/s${s}.mp4`]);
 console.log('scene',s,'ok',plan.duration);}
await b.close()})();
