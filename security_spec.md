# Security Specification & "Dirty Dozen" Audit - InstaDemoX

## 1. Data Invariants
- **Schema Conformity**: A Lead document must have valid types and reasonable bounds. Specifically, a Lead requires `id`, `slug`, `business_name`, `category`, `owner_name`, `address`, `phone`, `whatsapp`, `city`, `created_at`, `viewed`, `time_on_page`, and `converted`.
- **Administrative Isolation**: The listing of all Leads or deletion of any Lead is restricted exclusively to authenticated agency administrators (matching email `progvisionsite@gmail.com`).
- **Limited Mutability**: Non-admin users are restricted to modifying only progressive analytics fields (`time_on_page`, `viewed_demo`, `clicked_whatsapp`, `viewed_pricing`, `converted`, `converted_at`) to prevent tampering with core business identity parameters during customer sessions.

---

## 2. The "Dirty Dozen" Payloads
These payloads describe exploit vectors targeted by malicious triggers. All of these are strictly rejected by the Security Rules:

1. **Self-Assigned Identity**: Non-authenticated write setting custom IDs of arbitrary size (1KB+) or illegal symbols.
2. **Ghost Field Mutation**: Writing a payload with extra unapproved fields to bypass strict parameters.
3. **Admin Privilege Escalation**: Modifying fields to declare another user as admin.
4. **Illegal Enumerated Domain**: Mutating `category` to highly dangerous executable scripts.
5. **PII Scraping Hunt**: Performing unconstrained index lists on `/leads` collection by non-admin users.
6. **Denial-Of-Wallet Injection**: Sending fields exceeding safety size margins (e.g. 1MB tagline string).
7. **Identity Spoofing**: Attempting to alter `id` or `slug` properties inside updates.
8. **Malicious Zero State Timing**: Setting `time_on_page` as random objects or nested maps rather than numerical values.
9. **Fake Verification Claims**: Signing in with a spoofed email other than the verified `progvisionsite@gmail.com` address.
10. **State Shortcutting**: Skipping core progression and forced administrative approval levels manually.
11. **Orphaned Writes**: Writing sub-document links to non-existent parent resources.
12. **Malicious Delete**: Issuing unauthenticated `DELETE` calls on active customers.

---

## 3. Security Assertions & Test Log
- **Pass Criteria**: Default-deny restricts all unauthorized reads/writes.
- **Verification Protocol**: Validating rules via Firestore Emulator / Compiler outputs. All tests pass successfully and are locked.
