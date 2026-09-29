# Ugo LiveKit Runtime

The UI and token boundary are now prepared for real room media.

## Required public app env

- `EXPO_PUBLIC_LIVEKIT_URL`
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Required Supabase Edge Function secrets

- `LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`

The Edge Function is `supabase/functions/livekit-token/index.ts`.

## Security model

The mobile app never receives the LiveKit API secret. It sends the current Supabase access token to the Edge Function. The Edge Function validates the authenticated user and creates a short-lived room token.

## Remaining native integration

The native LiveKit React Native client dependency and Expo config plugin must be added only after the Ugo Supabase project and LiveKit deployment are selected. This avoids locking the app to an unverified native package combination before the backend exists.
