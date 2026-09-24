# Database Plan

Database implementation will be split by domain:

- users / profiles
- follows / visitors
- rooms / room_roles / room_seats
- room_members / room_chat
- private_conversations / private_messages
- wallets / transactions
- gifts / gift_events
- vip / levels / achievements
- couples / families
- events / rankings / missions
- moderation / reports / blocks

Migrations live under `supabase/migrations/`.
