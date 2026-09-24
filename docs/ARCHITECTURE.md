# YouGo Architecture

## Decision

YouGo uses a **feature-first modular architecture with registries and contracts**.

The goal is simple: updating one feature tomorrow must not require moving or rewriting unrelated app files.

## Layers

- `src/app`: Expo Router routes only. Route files stay tiny.
- `src/core`: app backbone such as navigation, session, permissions, realtime event bus and error boundaries.
- `src/contracts`: stable interfaces between rooms, games, gifts, wallet and platform services.
- `src/features`: product features such as auth, home, room shell, profile, messages, VIP, family and events.
- `src/modules`: plug-in modules such as individual games, gifts, frames, vehicles and effects.
- `src/registries`: lists modules available to the app without hard-coding them into screens.
- `src/platform`: Supabase, LiveKit, storage, notifications, payments and analytics adapters.
- `src/shared`: reusable UI, theme, hooks and utilities.
- `src/config`: business rules and feature flags.

## Non-negotiable rules

1. Route files may import screens but must not contain feature business logic.
2. Each game/gift/effect is an independent module with its own manifest.
3. The room is a persistent shell; Voice, Video and Game are modes inside it.
4. Global state is limited to session, current user, current room and wallet. Feature state stays local to its feature.
5. Business rules such as room seat progression and VIP qualification live in config/domain files, not UI components.
6. External services are hidden behind platform adapters so Supabase/LiveKit can be changed without rewriting screens.
7. Features can be enabled/disabled through registries and feature flags.

## Room progression

- Level 1: 8 seats
- Level 5: 12 seats
- Level 10: 16 seats
- Level 20: 20 seats
- Level 30+: up to 27 seats

Owner/admin/moderator capability begins from Level 1.

## Legacy prototype

The original root HTML/CSS/JS prototype remains temporarily as a visual reference only. The production mobile app is now being built under `src/` using Expo Router and React Native.
