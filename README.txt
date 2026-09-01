PRIVATE HIRE BOOKING CONTROL DASHBOARD V3.5.0

This build adds secure Firebase Authentication and real-time Firestore cloud sync on top of V3.4.4.

NEW
- Email/password Sign In
- Create Account
- Forgot Password
- Firebase persistent login session
- Firestore cloud workspace sync across PC, tablet and phone
- Automatic first-login migration of current local browser data when the cloud workspace is empty
- Real-time cloud listener so changes from another signed-in device appear automatically
- Settings page with cloud connection, signed-in account, last sync, Sync Now and Reload from Cloud
- Secure owner-only Firestore rules supplied in firestore.rules

SETUP
Read FIREBASE_SETUP.txt before deployment. Firebase must be configured in config.js and Email/Password Authentication + Firestore must be enabled in Firebase Console.

IMPORTANT
V3.5.0 uses one secure owner workspace per Firebase account. Sign into the SAME account on multiple devices to share the same data. Separate staff accounts/roles can be added as the next phase without sharing the owner password.

All V3.4.4 booking, dashboard, reports, penalties and driver statement logic is preserved.
