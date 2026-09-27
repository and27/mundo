-- Contactos que descargan los imprimibles desde /profesionales.
-- Ejecutar una vez en Supabase: SQL Editor -> pegar -> Run.

create table if not exists public.professional_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  city text not null,
  role text not null,
  -- Consentimiento para escribirles despues (LOPDP, Ecuador).
  consent boolean not null default false,
  -- De donde vino: ?ref=grupo-fb, ?ref=ig-anuncio... para saber que canal funciona.
  source text
);

create unique index if not exists professional_leads_email_key
  on public.professional_leads (lower(email));

-- RLS activo y sin politicas: nadie con la clave publica puede leer ni escribir.
-- Solo el servidor, con la service role, accede a estos datos personales.
alter table public.professional_leads enable row level security;
