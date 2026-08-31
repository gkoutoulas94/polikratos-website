# POLIKRATOS website upload

This is a Vite-powered static website. It needs no database or server-side application.

## Hostinger GitHub deployment (recommended)

1. In Hostinger choose **Deploy Web App → Import Git Repository**.
2. Select the public `polikratos-website` repository and the `main` branch.
3. Framework: **Vite** (Hostinger should detect it automatically).
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Node.js: use the newest available Node 22.x or 24.x version.

## Traditional static upload

1. Upload **the contents of this `website` folder** to the public root of `polikratos.com` (often `public_html`, `www` or the host's deploy folder).
2. Keep the file and folder names unchanged.
3. Enable HTTPS and redirect HTTP to HTTPS in your hosting dashboard.
4. Verify these public URLs:
   - `https://polikratos.com/`
   - `https://polikratos.com/privacy.html`
   - `https://polikratos.com/terms.html`
   - `https://polikratos.com/delete-account.html`
   - `https://polikratos.com/support.html`
5. Use the Privacy Policy URL in Google Play Console.
6. Use the Delete Account URL in the Play Console account-deletion field.

## Before production

- Confirm that `info@polikratos.com` can receive and answer messages.
- Add the final Google Play download link when the listing is live.
- Review the legal text with a qualified lawyer for the countries where the game will be offered.
- Update the policy and Play Console Data safety form whenever ads, analytics, payments or new SDKs are added.
