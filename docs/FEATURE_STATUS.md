# YouGo Feature Status

Legend: ✅ foundation ready · 🟡 planned/partial · ⬜ not started

## Batch 1 — App foundation
- ✅ Expo SDK 57 project config
- ✅ Expo Router under `src/app`
- ✅ TypeScript path aliases
- ✅ Shared theme and UI primitives
- ✅ Session boundary
- ✅ Feature flags
- ✅ Room level rules
- ✅ VIP rules isolated in config
- ✅ Contracts for rooms/games/gifts
- ✅ Game, gift and room-tool registries
- ✅ Plug-in manifests for Spin & Win, Diamond Hunt and Rose gift
- ✅ Welcome screen
- ✅ Mobile login UI
- ✅ OTP UI
- ✅ Profile setup UI
- ✅ Main tabs
- ✅ Home foundation
- ✅ Discover foundation
- ✅ Messages foundation
- ✅ Profile foundation
- ✅ Persistent Room Shell with Voice/Video/Game mode switching

## Next
- 🟡 Auth state + real Supabase authentication
- 🟡 Profile persistence
- 🟡 Room feature modules split into seats/chat/audience/tools
- ⬜ Realtime room state
- ⬜ Real voice via LiveKit
- ⬜ Real video via LiveKit
- ⬜ Gift economy
- ⬜ Wallet/recharge
- ⬜ VIP/SVIP runtime
- ⬜ PK
- ⬜ Games runtime
- ⬜ Family/couple/events/rankings

## UI Direction
- ✅ Final 25-screen UI direction frozen in `docs/UI_DESIGN_FINAL.md`


## Premium UI implementation
- ✅ Splash / Welcome / Login / Phone / Password / OTP
- ✅ 3-step profile setup
- ✅ Home / Discover / Messages / Private Chat / Profile
- ✅ Create Room
- ✅ Persistent Room Shell
- ✅ Premium Voice Room
- ✅ Premium Video Room
- ✅ Premium Game Room
- ✅ Audience / live chat / room tools / bottom controls
- ✅ Gifts panel + full-screen gift effect preview
- ✅ Notifications center
- ✅ VIP Center
- ✅ Wallet
- ✅ Games Center
- ✅ Family / Couple hub
- ✅ Settings / Safety center
- ✅ 5-tab premium navigation
- ✅ Mobile TypeScript + Expo validation passing
- ✅ Web preview publishing successfully

## Backend/runtime progress
- 🟡 Supabase auth client + persistent session implemented; cloud project not linked yet
- 🟡 Profile persistence repository implemented; migration not deployed yet
- 🟡 Rooms create/load/join/mode/chat repositories implemented
- 🟡 Realtime room chat and private chat adapters implemented
- 🟡 Secure wallet read/history implemented
- 🟡 Server-authoritative gift transaction + gift UI connection implemented
- 🟡 Notifications repository + UI connection implemented
- 🟡 LiveKit token boundary + secure Edge Function implemented
- ⬜ Dedicated Ugo Supabase project deployment
- ⬜ Native LiveKit React Native media client
- ⬜ Production recharge/payment provider
- ⬜ Production game runtime / reward enforcement
