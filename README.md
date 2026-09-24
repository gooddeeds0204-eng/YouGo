# YouGo

**Talk • Play • Connect**

YouGo is a modular social party app built around persistent rooms that can switch between Voice, Video and Game modes without losing room identity, roles, audience, chat, gifts, VIP state or event state.

## Production app

The real mobile app is now being built with:

- Expo SDK 57
- React Native
- Expo Router
- TypeScript
- Feature-first modular architecture
- Registry-based games, gifts, room tools and effects

Production source lives under `src/`.

## Architecture principles

- Routes stay tiny.
- Every major feature owns its own folder.
- Games and gifts are plug-in modules with manifests.
- Business rules are isolated from UI.
- The room is a persistent shell with Voice / Video / Game mode adapters.
- Supabase, LiveKit, payments and notifications will sit behind platform adapters.
- Feature flags allow modules to be disabled without deleting code.

See:

- `docs/ARCHITECTURE.md`
- `docs/FEATURE_STATUS.md`
- `FEATURES.md`

## Legacy prototype

The root HTML/CSS/JS files are retained temporarily as a visual reference only. They are not the production app architecture.
