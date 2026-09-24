# YouGo — Final UI Direction

Status: **FROZEN**

The visual direction shown in the latest approved multi-screen concept is the final UI direction for YouGo.

## Brand
- Product name: **YouGo**
- Core tagline: **Talk • Play • Connect**
- Logo: glowing `YouGo` / `YG` identity with pink-purple-cyan energy accents
- Visual personality: youthful, premium, social, energetic, game-friendly

## Experience split

### 1. Entry / onboarding
- Bright, welcoming, playful visuals
- Green / cyan / teal gradients for login entry
- Simple white phone/password/OTP screens
- Large touch targets
- Minimal text
- One clear primary action per screen

### 2. Main app
- Premium dark background
- Purple / pink / cyan accent system
- Rounded cards with subtle glow
- Rich avatar imagery and live indicators
- Bottom navigation with highlighted center create action

### 3. Rooms
- Immersive dark room background
- Persistent Voice / Video / Game shell
- Premium avatar frames
- Live chat, audience, gifts and effects layered into the same room
- Bottom controls stay stable across modes

### 4. Economy / premium
- VIP uses gold / magenta luxury styling
- Wallet is clean and trustworthy
- Gift panel is dark with bright item art
- Gift / vehicle / entry effects may use full-screen animation

## Final screen map
1. Splash
2. Welcome
3. Login options
4. Phone login
5. Password login
6. OTP verification
7. Profile setup — photo
8. Profile setup — details
9. Profile setup — interests
10. Home
11. Discover
12. Voice room
13. Video room
14. Game room
15. Create room
16. Gifts panel
17. Live gift / entry effects
18. Messages
19. Private chat
20. Profile
21. VIP center
22. Wallet
23. Games center
24. Family / Couple
25. More / Settings

## UI rules
- Do not redesign individual screens in unrelated styles.
- Use the same spacing, radii, typography hierarchy and accent palette across the app.
- Auth screens stay simple; main app stays dark and premium.
- Avoid crowded screens and unnecessary helper cards.
- Avoid excessive empty space.
- Use reusable shared components instead of duplicated one-off UI.
- Future screens must extend this design language instead of replacing it.

## Implementation rule
Each screen is implemented inside its own feature folder. Shared styling primitives live in `src/shared/theme` and reusable components in `src/shared/ui`. Updating one feature should not require rewriting unrelated features.
