# SrotaBio website preview — 5 September 2026

Branch: `codex/community-clinician-preview`, based on local `master` at `15470aa`.

## Review

Run `python3 -m http.server 8019 --bind 127.0.0.1` in this directory and open `http://127.0.0.1:8019/`.

Pages: Home, About, Conversations, For clinicians, Perspectives, Contact, Privacy.

This version preserves the approved identity and adds separate event and clinician invitations, founder context, accurate scientific-advisor wording, a curated link to the existing announcement, and contact@srotabio.com. Protocols, treatments, packages and care journeys are intentionally absent. Event date, venue, programme and other unconfirmed details remain tentative.

## Signup behavior

`previewMode: true` in `site-config.js` prevents all signup submissions. Localhost and file previews are always prevented from submitting, even if that flag changes. Valid entries show an explicit demonstration message; nothing is saved. The existing API address and production request shape remain available for later review. Contact buttons open email drafts; they do not send emails.

## Before any publication

- Obtain Abhirath’s explicit approval of the local version and production publication.
- Confirm event details and the co-host/speaker copy with Shilpa and PopVax.
- Review the adapted first-person founder story.
- Replace the preview privacy notice with an accurate public signup notice, align consent handling with the live service and establish withdrawal handling.
- Decide whether event-specific subscriptions are needed. The existing backend is an email-only waitlist that ignores duplicate email addresses; it does not maintain multiple audience interests or send confirmation emails.
- Only after that review, remove the preview ribbon, enable signup in configuration and verify against an approved test destination.

No repository push or deployment is part of this work.

## Verification

All seven pages reviewed in the same local preview tab at 1280 px desktop and 390 px mobile widths. Internal links, anchors, image alternatives, unique IDs and page headings checked. Mobile navigation and Escape behavior, invalid email feedback, and valid preview signup tested. Browser reported no warnings or errors. Approved Iron/Cream text contrast is 5.26:1.

## Revision — 7 September 2026

Restored the approved homepage copy from 15470aa, preserved the user-commented eyebrow, and removed the added homepage story, clinician hero button, invitation band, writing teaser and FAQ to simplify the page. Updated event date and venue to 19 September 2026, CIE @ IIIT-Hyderabad. Added Lime outline and disabled Register buttons pending the Luma URL. Project and repository AGENTS.md now require explicit authorization before changing existing website material. Desktop/mobile preview inspected after restoration.
