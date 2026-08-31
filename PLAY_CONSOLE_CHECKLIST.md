# POLIKRATOS — Google Play setup draft

This checklist reflects the app code as reviewed on 31 August 2026. Re-check it before submission; the developer is responsible for final Play Console declarations.

## URLs

- Privacy policy: `https://polikratos.com/privacy.html`
- Account deletion: `https://polikratos.com/delete-account.html`
- Support: `https://polikratos.com/support.html`

## App access / sign-in details

- Explain that Local Duel is available after authentication in the current build.
- Supply Google Play reviewers with a reusable test account if they cannot create/sign into an account during review.
- Describe how to reach Online Ranked, Duel with Friends, Profile and Settings.

## Ads

- Current code review: **No advertising SDK detected.** Select “No” only while this remains true.

## Likely Data safety declarations

Collected for app functionality/account management:

- Personal info — email address.
- Personal info — name or nickname (display name).
- Photos — only if an avatar URL/photo supplied through the chosen social sign-in is used.
- User IDs — Supabase/authentication account identifier.
- App activity — gameplay interactions and server-validated match actions.
- App activity — other user-generated content may include room participation/display name.
- App info and performance / device or other identifiers — verify Supabase, Google Sign-In and Apple Sign-In SDK disclosures before selecting final answers.

Purposes include account management, app functionality, security/fraud prevention, multiplayer, matchmaking and leaderboards. Data is transmitted using encrypted connections. Account data is not optional where authentication is required; avatar/social sign-in is optional where email/password login is available.

“Shared” in Google Play has a specific definition. Review each service provider's current Data safety guidance before deciding whether Supabase, Google or Apple processing counts as sharing for the form.

## Account deletion requirement

The public deletion page satisfies the required external resource pathway once deployed and functional. Google Play also requires an intuitive **in-app** account-deletion path for mobile apps that allow account creation. The current Profile screen has sign-out but no deletion control; implement this before production submission.

## Other declarations — current feature assessment

- Government app: No.
- Financial features: No.
- Health features: No.
- News app: No.
- Ads: No in the current build.
- Target audience: choose the real intended age group; do not select children unless the app and all content/SDKs satisfy Families requirements.
- Content rating: complete the IARC questionnaire accurately for competitive card-game themes and any fantasy conflict imagery.

## Store listing starting point

- App category: Game → Card (or Strategy, based on final positioning).
- Developer name: Georgios Koutoulas.
- Contact email: info@polikratos.com.
- Short description draft: “Forge alliances, command legends and rule the ancient Greek world.”
- Full description should explain Local Duel, Duel with Friends, Online Ranked, ELO, strategic card mechanics and cosmetic boards without promising unavailable purchases or features.
