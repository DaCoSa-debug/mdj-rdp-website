-- MDJ Arcade: retos compartidos (MVP)
-- Ejecutar una sola vez en Supabase > SQL Editor.

create table if not exists public.arcade_challenges (
  id uuid primary key default gen_random_uuid(),
  game text not null check (game in ('quiz')),
  theme text not null,
  challenger_name text not null check (char_length(challenger_name) between 3 and 14),
  target_score integer not null check (target_score between 1 and 10000),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days')
);

create table if not exists public.arcade_challenge_attempts (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.arcade_challenges(id) on delete cascade,
  player_name text not null check (char_length(player_name) between 3 and 14),
  score integer not null check (score between 0 and 10000),
  completed_at timestamptz not null default now()
);

create index if not exists arcade_challenge_attempts_challenge_id_idx
  on public.arcade_challenge_attempts (challenge_id, score desc);

alter table public.arcade_challenges enable row level security;
alter table public.arcade_challenge_attempts enable row level security;

-- Un reto se comparte por enlace: cualquiera puede leerlo mientras está vigente.
create policy "Public can read active arcade challenges"
  on public.arcade_challenges for select
  using (expires_at > now());

create policy "Public can create arcade challenges"
  on public.arcade_challenges for insert
  with check (expires_at <= now() + interval '8 days');

-- Los resultados del reto son visibles para comparar el desafío.
create policy "Public can read arcade challenge attempts"
  on public.arcade_challenge_attempts for select
  using (true);

create policy "Public can submit arcade challenge attempts"
  on public.arcade_challenge_attempts for insert
  with check (true);

-- No se concede UPDATE ni DELETE desde el navegador.
