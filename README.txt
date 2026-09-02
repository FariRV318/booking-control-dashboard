PRIVATE HIRE BOOKING CONTROL DASHBOARD V3.6.0

This build adds shared staff accounts, role-based navigation and a permanent Firestore audit trail on top of the working V3.5.1 Firebase cloud-sync build.

NEW IN V3.6.0
- Separate staff logins using Firebase Email/Password Authentication
- One shared company workspace: staff do NOT need the owner's password
- Roles: Administrator, Dispatcher, Accounts, Read Only
- Administrator-only Staff Accounts page
- Invite staff by name, email and role
- Staff creates their own password with the invited email using Create Account
- Staff role/status management (change role, disable/enable)
- Dedicated Logs / Audit Trail page
- Audit entries contain date/time, staff name/email, role, action, affected record and change summary
- Logs are append-only in Firestore (normal users cannot edit/delete audit records)
- Existing bookings, drivers, vehicles, companies, penalties, reports and statements remain in the same synced workspace

IMPORTANT FIRESTORE RULE UPDATE
Before using Staff Accounts, replace the current Firestore Rules with the contents of firestore.rules in this package and Publish them.

OWNER MIGRATION
The first time the existing owner signs into V3.6.0, the app creates the owner's workspace membership automatically. Existing cloud data remains at the same workspace ID and is not moved or deleted.

STAFF JOIN FLOW
1. Administrator opens Staff Accounts and clicks Invite Staff.
2. Enter staff name, email and role.
3. Staff opens the same dashboard URL.
4. Staff enters the invited email, chooses Create Account, and sets a password.
5. The app automatically joins that login to the owner's shared workspace.

SECURITY NOTE
Read Only cannot write synced workspace state. Administrator, Dispatcher and Accounts are write-enabled roles. The UI exposes role-appropriate navigation; because the current dashboard stores operational state in one shared Firestore state document, finer field-level server enforcement can be added later if you want very granular permissions per booking field.


V3.7.0 APPROVED OPERATIONS UPDATE
- Sidebar hidden by default on desktop/tablet/mobile; hamburger opens overlay drawer.
- Add Booking button on Dashboard.
- Analytics moved above Upcoming / In Process Journeys.
- Dashboard keeps From Date, To Date, Search, Filter, Clear and Hide/Show controls.
- Expiring Documents moved to its own page; Quick Reports removed from Dashboard.
- Dashboard removes Complaint and Driver Paid only; All Bookings keeps both.
- Added Pax & Lugg, Vehicle Requested + mileage, Flight No., compact £ fare, Driver, Driver Vehicle and Dispatch columns.
- Dashboard and All Bookings columns are user-customisable with Hide / Show.
- Larger/darker typography and responsive layouts.
- Booking page has action buttons under the map and corrected penalty field alignment.
- Send SMS modal builds journey details and opens the device SMS composer.
- Existing Firebase sync, staff roles and audit logs preserved.
