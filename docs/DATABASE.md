# Database Plan

Ugo's backend schema is now defined under `supabase/migrations/`.

## Implemented schema

- profiles
- follows
- rooms
- room members / roles
- room seats
- realtime room messages
- private conversations / members / messages
- wallets / wallet transactions
- gifts / gift events
- VIP state
- families / family members
- couples
- events
- missions / mission progress
- blocks
- reports
- notifications

## Security

- Row Level Security is enabled on all user-facing tables.
- Wallet balances cannot be directly mutated by the mobile client.
- Gift spending uses the server-authoritative `send_gift` database function.
- Private conversation creation uses a security-definer RPC.
- Membership helper functions avoid recursive RLS policies.
- Room creation automatically creates owner membership and the correct initial seat rows.

## Migrations

- `202609300001_core_backend.sql` — core schema, RLS, room bootstrap, gift catalog
- `202609300002_secure_gift_send.sql` — atomic gift transaction
- `202609300003_private_chat_rpc.sql` — secure private conversation bootstrap

## Deployment state

The repository is ready for a dedicated Ugo Supabase project. No migration has been applied to unrelated Supabase projects.
