-- Ejecutar DESPUÉS de arcade-challenges.sql para habilitar retos en todos los juegos.
alter table public.arcade_challenges drop constraint if exists arcade_challenges_game_check;
alter table public.arcade_challenges
  add constraint arcade_challenges_game_check
  check (game in ('quiz', 'rdp-run', 'snake', 'rdp-blocs', 'triki'));

-- Snake y RDP Blocs pueden superar 10 000 puntos.
alter table public.arcade_challenges drop constraint if exists arcade_challenges_target_score_check;
alter table public.arcade_challenges
  add constraint arcade_challenges_target_score_check check (target_score between 1 and 1000000);

alter table public.arcade_challenge_attempts drop constraint if exists arcade_challenge_attempts_score_check;
alter table public.arcade_challenge_attempts
  add constraint arcade_challenge_attempts_score_check check (score between 0 and 1000000);
