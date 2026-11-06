# POLIKRATOS website audit — 6 November 2026

Status at initial audit: local implementation ready for human review. The owner subsequently authorized publication on 6 November 2026; see the publication follow-up below. No campaign change, certification application, gameplay change, backend change or payment-processing change was made.

## A. Files changed

- `index.html`: publication status, two Google Play buttons, About, Fair Play & Virtual Currency, navigation and SEO.
- `terms.html`: monetization, subscriptions, digital access, currencies, refunds, deletion and consumer protections; SEO.
- `privacy.html`: verified integrations, data uses, identifiers, consent behavior, deletion, retention and provider disclosures; SEO.
- `delete-account.html`: in-app route, accurate deletion effects, subscriptions and entitlements; SEO.
- `support.html`: canonical, description, Open Graph and navigation accessibility attributes; existing contact details preserved.
- `assets/site.css`: narrow-screen wrapping, focus indicators, anchor offset, navigation spacing, date contrast and progressive reveal behavior.
- `assets/site.js`: correct expanded/closed menu labels, close state on navigation, Escape handling, content visible without JavaScript.
- `404.html`: noindex.
- `public/polikratos-icon.png`: copy of the existing icon at a stable URL for Open Graph; no new visual identity.
- `README_UPLOAD.md`: replace stale instruction to add the future store link; require audit review and explicit publication authorization.
- `docs/WEBSITE_AUDIT_2026_11_06.md`: this evidence and review report.

## B. Outdated or contradictory statements

Confirmed both in source and on the live site by HTTP fetch:

1. Homepage: “POLIKRATOS is preparing for its Google Play release.” The public listing instead offers installation, identifies ads and in-game purchases, and shows an October 7, 2026 update.
2. Terms: “The current release does not activate real-money purchases or an advertising network.” This conflicts with billing/AdMob implementation and the listing.
3. Deletion page promised deleted or irreversibly anonymised associated data too broadly. The deletion function preserves shared match records and an internal profile reference after clearing the display name/avatar and deleting authentication access.

Other audit findings:

- Homepage had no direct store download button and no explanation separating match treasury/tribute from Wallet credits.
- Privacy already disclosed Analytics and Crashlytics correctly, but omitted push-token registration, ordinary subscription entitlement verification and Google Fonts requests. Its “anonymous analytics” phrasing could overstate anonymity.
- Advertising disclosure described only optional rewarded ads; current source also has fallback interstitial ads, suppressed by ad-free ownership.
- Public information pages lacked canonical URLs and Open Graph metadata; most lacked descriptions.
- Mobile navigation closed visually after choosing a link without resetting aria-expanded. Reveal CSS hid content when JavaScript did not execute.
- Existing legal wording about cosmetic availability needed an explicit reservation of rights for paid digital content.

## C. Homepage and technical corrections

- Two visible “Download on Google Play” anchors use exactly `https://play.google.com/store/apps/details?id=com.polikratosgame.polikratos` with normal same-tab navigation, usable without JavaScript.
- About explains Ancient Greek tactical card decisions, city/faction sets, local AI, private rooms, ranked matches, cosmetic boards and optional purchases.
- Fair Play section uses the existing three-column gold/navy card styling and collapses with the existing mobile layout.
- Match cards, treasury and tribute remain honestly described. They are explicitly separate from account Wallet credits. No legitimate gameplay vocabulary was scrubbed to evade review.
- Wallet credits are described as account-bound, non-transferable, not staked or won from another player's Wallet and not redeemable for cash. No real-world prizes or cash withdrawals are advertised.
- Optional purchases are described as cosmetics/ad-free access rather than stronger cards or match resources. Pack availability is qualified.
- Titles/descriptions/canonicals/Open Graph cover the five public information pages. Auth pages retain their existing noindex/security behavior. Sitemap and robots were already correct and left unchanged.
- Stable social-preview icon is copied through Vite public output; existing imagery, fonts and architecture remain.

## D. Privacy changes and evidence

| Subject | Evidence inspected | Result |
| --- | --- | --- |
| Email and Google authentication | `app/lib/features/online/data/social_auth_service.dart` | Explain Supabase and Google sign-in. Apple is conditional on supported iOS availability; no iOS launch claimed. |
| Gameplay/social/progression | `app/lib/game/`, social/progression migrations | Explain match records, rankings, invitations, friend/block relationships, reports, achievements and missions. |
| Analytics | `analytics_service.dart`, `analytics_policy.dart`, Android manifest | Confirmed implementation, bounded custom events, Android Analytics ad-ID collection disabled, default-enabled collection and Settings opt-out. Avoid calling SDK data necessarily anonymous. |
| Crashlytics | `crash_reporting_service.dart` | Confirmed, default enabled, separately switchable in Settings. Retained diagnostic disclosure. |
| AdMob/consent | `match_ad_service.dart`, `drachma_service.dart`, Settings | Explain interstitial/rewarded ads, advertising identifiers where available, UMP gating and privacy choices. This does not certify regional consent compliance. |
| Push | `push_notification_service.dart`, `notify-match-found`, deletion function | Explain account-linked token, platform/update timestamp, Google delivery, device display permission versus stored token deletion. |
| Billing | `commerce_service.dart`, `verify-purchase`, store lifecycle migrations | Explain account/product/receipt or token processing, subscription status, verification/restoration and refund handling; no payment-card access. |
| Wallet | Wallet and pack migrations, `drachma_service.dart` | Preserve signed reward verification, account-linked balances, purchased-credit non-expiry and negative-balance refund adjustments. Earning is explicitly not currently enabled in production per handoff. |
| Deletion | `delete-account/index.ts`, auth-cascade migrations | Distinguish deletion of authentication/push/Wallet records from preserved shared history and separately retained store/security records. |
| Website | CSS Google Fonts import, page scripts, recovery pages | Disclose external font requests, hosting and support email data; public information pages have no ad/analytics scripts. |

Existing controller name and email, GDPR rights, security wording, children's policy and general retention criteria were retained. Added purpose-specific legal-basis explanation, consent caveat, objection/withdrawal details, provider links and a route to request transfer safeguards. No numeric retention schedule, new encryption guarantee or actual transfer mechanism was invented.

## E. Terms changes and verification

`commerce_service.dart` and `shop_screen.dart` confirm `ad_free`, `polikratos_plus`, `lifetime_access`, board products and pack products. Prices are fetched through store ProductDetails; a local catalog is not proof of active regional pricing.

- Ad Free: monthly ad-free entitlement.
- Plus: monthly ad-free/premium and future seasonal board entitlement while active.
- Lifetime: one-time, no scheduled subscription expiry; no promise of perpetual online operation or every future product.
- Individual cosmetic purchases and eligible Wallet access periods are distinguished from recurring store subscriptions.
- Packs: repeatable one-time purchases where enabled/offered, not an assertion that the current production flags allow purchase.
- No hardcoded EUR 0.99 / 1.99 / 29.99 amounts: these could not be verified against current Play Console regional/base-plan configuration.
- Auto-renewal, store cancellation, normally remaining paid-period access, restoration, refunds/revocation and deletion consequences explained.
- Deletion/uninstall does not cancel subscriptions. Wallet refunds may produce a negative virtual balance, not a cash debt.
- Existing licence, fair-play, availability, updates and liability provisions retained with mandatory consumer protections. No blanket no-refund clause or invented governing-law/licence/company information.

## F. Google Ads policy readiness

Sources reviewed:

- https://support.google.com/adspolicy/answer/15132179
- https://support.google.com/google-ads/answer/9338593
- https://play.google.com/store/apps/details?id=com.polikratosgame.polikratos

Google distinguishes staking value for a chance at value, prize-bearing non-casino games and simulated gambling-style social casino games. A “no cash prizes” statement alone does not establish that a product is outside every restricted category. The reviewed source describes a strategy card game and supplies no Wallet betting, cash-out or player-to-player Wallet stake path. The revised text explains mechanics rather than claiming a policy exemption.

Why reviewers could have been confused: the website combined card-game imagery and “wealth”, “treasury”, “risk” and “tribute” terminology without explaining the separate currencies, lacked a store CTA, and contradicted the published listing about launch and monetization. This is a plausible explanation, not evidence of Google's actual classification reason. Ad creatives, policy detail, six target countries and campaign settings were not inspected.

No certification was requested; no campaign or appeal was submitted. Website wording does not guarantee Google Ads approval. The owner can review the exact policy decision through Google's documented appeal process after reviewing the product and destination evidence.

Consumer/store references reviewed:
- https://support.google.com/googleplay/answer/7018481
- https://europa.eu/youreurope/citizens/consumers/shopping/guarantees/index_en.htm

## G. Validation results

- `npm run build`: PASS, Vite 8.2.2, 59 modules, all eight HTML entry points built.
- `npm test`: PASS, all four existing recovery-policy tests.
- `node --check assets/site.js`: PASS.
- `git diff --check`: PASS.
- No lint script or HTML validator is configured in package.json. No dependency added.
- Static HTML checks across source/build: one h1 per page, no duplicate IDs; local href/src/fragment targets resolve. The confirmation page's app URI is a legitimate custom scheme, not a missing file.
- Combined reference audit examined 216 HTML/CSS references; all local targets resolve after correctly treating generated CSS `/assets/...` paths as site-root-relative. Fourteen local CSS image references checked separately: PASS.
- Canonical, description and Open Graph markers present on all five public information pages. Built stable Open Graph icon exists.
- Both source and built homepage contain exactly two correctly targeted store buttons; stale launch/monetization claims absent.
- Live HTTP checks: homepage, Privacy, Terms, deletion, Support, robots and sitemap all 200; deliberately nonexistent path returns 404. Store link, Google privacy, Supabase privacy, Google subscription help and Hostinger privacy all 200.
- Secret-pattern scan of generated HTML/JS/CSS/JSON/text found no private keys, service-account documents or `sb_secret_` credentials. No private/signing files were accessed or copied. Public Supabase client configuration in existing recovery code is not a service credential. This was a targeted scan, not a complete security certification.
- Browser rendering/mobile/desktop interaction/console checks: NOT COMPLETED. Browser tool reports local browser use disabled in Work settings. Responsive CSS was inspected, but no visual or runtime-console pass is claimed.
- Local Supabase auth integration script was inspected, not run: it requires a separate local staging stack and changes disposable authentication data; auth implementation was not changed in this task.
- Mailbox delivery not tested; no support/deletion messages were sent. Deep-link launch on a physical device not tested.

## H. Open verification issues before publication

1. Confirm current active Play products, base-plan periods, region prices and production Wallet/pack flags. Source includes unreleased November changes; it is not identical evidence for the October store build. Existing handoff says production earning is disabled; no production flag was changed or authenticated backend queried.
2. Review lawful basis/prior-consent requirements for default-enabled Analytics and Crashlytics. Existing opt-outs and advertising UMP do not prove analytics consent. No app changes made.
3. Verify deployed SDKs/settings and align Play Data Safety with the shipped binary, including identifiers, approximate location from ads, diagnostics, purchases and push tokens.
4. Confirm Firebase/provider retention settings, scheduled database retention jobs, logs/backups, financial-record obligations and actual international-transfer safeguards. No fixed retention days were invented. Existing normal 30-day request target and support response target remain owner commitments needing operational confirmation.
5. Resolve age-policy implementation: existing 13+/country requirements and children's privacy language were preserved. Play “Everyone” is a content rating, not proof of privacy consent eligibility. Verify age handling, targeting and AdMob child settings; no unverified age gate is claimed.
6. Confirm in-app deletion against deployed schema/function, shared-history identifiers and purchase access/restoration after deletion. No real account deleted to test. Store subscription cancellation remains separate.
7. Verify controller/business disclosures and whether seller-address/precontract information or notice of changed terms is legally required. Existing developer identity preserved; no company/address/licence fabricated.
8. Complete visual QA at narrow mobile, tablet and desktop sizes, keyboard/menu checks, zoom and runtime console checks when browser access is enabled.
9. After a separately authorized deployment, recheck updated public text, stable OG icon, cache behavior, app policy links, and actual Play Console deletion URL. Current public pages remain the old version.
10. Review six actual campaign countries, assets and policy-detail evidence with the owner. No conclusion about those country-specific decisions is possible from the site alone.

## I. Review decision

READY FOR HUMAN CONTENT/ENGINEERING REVIEW. Build and static checks pass. NOT signed off for production publication, legal compliance or Google Ads approval. Browser QA and the owner/legal/store checks above remain open. No production deployment performed.


## Publication follow-up — owner authorization, 6 November 2026

- Owner explicitly authorized the website changes and publication through GitHub/Hostinger after receiving the initial report and limitations.
- Verified Hostinger dashboard: exact domain `polikratos.com`, repository `gkoutoulas94/polikratos-website`, branch `main`, Vite, Node 24.x, root `./`, no environment variables, automatic Git deployment ON. The previous deployment `4c663ed999a1cbdc67ae0a9fafad8693be286daf` was completed.
- Fast-forwarded local main to preserve the existing Hostinger security update (Vite range `^8.2.4`). Its lockfile was stale; synchronized it with npm, resolving Vite 8.3.6 and compatible build dependencies. No application dependency or runtime feature added.
- Re-ran build (59 modules), all four existing tests, JavaScript syntax and diff whitespace checks: PASS.
- Browser access became available, but the origin approval gate declined local preview access and a Play Console navigation. Neither restriction was bypassed. Regional product status/prices remain unverified and are not presented as exact public prices.
- Publication is authorized with the documented operational/legal limitations; it is not certification of legal compliance or Google Ads eligibility. Live deployment evidence will be recorded separately after delivery.
