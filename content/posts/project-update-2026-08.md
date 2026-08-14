---
title: "Project Update — August 2026"
subtitle: "NOVA and five automation products spanning AI operations, email, rental discovery, translation, and inventory."
category: "Project Updates"
description: "A dated, public-safe progress report on my recent blockchain, AI administration, email, rental, translation, and inventory projects."
date: "2026-08-14"
pinned: false
---

## Snapshot

This update records the state of my recent projects as of **14 August 2026 (Europe/London)**. Dates below come from the projects' Git history and dated architecture records. I have separated completed work from work that is still being tested, and removed credentials, customer data, private network details, and local machine information.

- **NOVA:** the latest committed version is **v0.20.0**, dated 13 August 2026.
- **K&M AI Administration:** the latest committed product changes are dated 10 August 2026, with documentation and hardening work continuing locally.
- **Email Assembler:** the consolidated **v0.8.0** desktop MVP was released on 4 August 2026.
- **RedNotesHouseRenting:** the English public **v1.0.0** release was merged on 8 August 2026.
- **RithumAuto:** the current desktop and macOS Apple Silicon work is recorded through 12 August 2026 on its active development branch.
- **WhatsApp Desktop translation plug-in:** the companion-panel vertical slice and its architecture decisions are dated 13 August 2026; it has not completed customer-PC acceptance testing.
- **This blog:** the bilingual project report was published on 14 August 2026.

## NOVA — a personally operated blockchain

[NOVA](https://github.com/KristWangCY/NOVA) is my long-term blockchain engineering project: an independent, permissioned chain that I can understand and operate myself. It is not a token contract deployed on another public chain, and the current consensus prototype is **not presented as production-grade BFT**.

### Completed by 13 August

- Built a deterministic Node.js 22 chain core with fixed validators, signed transactions, native NOVA balances, account nonces, and 2-of-3 block commitment.
- Added encrypted account, validator, and faucet keystores; atomic startup; node-home locking; graceful shutdown; signed-chain replay; diagnostics; backups; and recovery exercises.
- Added a file-record transaction that commits a SHA-256 hash and explicitly public metadata without placing file contents, filenames, or local paths on-chain.
- Added authenticated validator write requests, challenge-bound signed remote status, quorum-verified remote backups, and crash-safe mempool and vote-lock recovery.
- Built a local Explorer for blocks, transactions, accounts, receipts, and file-record verification.
- Completed the readiness framework: each genuine daily use must be backed by a final transaction, a verified backup, a healthy chain head, and a tamper-evident journal using the Europe/London calendar.
- Changed idle operation from periodic empty blocks to **demand-driven block production**. The chain stays quiet when there is no transaction and produces a block at the next slot when work arrives.

The latest committed readiness record states that 11 and 12 August were the first two consecutive real-use days. Five more consecutive days were still required at that point; automated tests cannot substitute for this evidence.

### Next milestones

- Finish the seven-day real-use readiness run without backfilling dates.
- Deploy validators to three real devices over private transport, then rehearse node loss, backup, restoration, and catch-up.
- Add TLS and key-rotation procedures before treating the network as remotely operable.
- Confirm the next genuinely useful business module before investing in public-chain features, token economics, bridges, or general smart contracts.

## K&M AI Administration — an internal AI meeting workspace

K&M AI Administration is an internal workspace for coordinating a small AI team. The user sets the objective as CEO, Codex acts as the manager, and three DeepSeek agents contribute from advisor, engineering, and product perspectives.

### Completed in the committed history by 10 August

- Created the meeting workspace and connected live AI responses.
- Defined the CEO → Codex → DeepSeek A/B/C organization model and distinct responsibilities.
- Added sequential agent turns with recent meeting context so opinions can be compared in one transcript.
- Added live work-status panels, a meeting timeline, round navigation, and a broader company sidebar.
- Added Markdown meeting-minute archiving through Cloudflare R2.

The current stack is React 19, vinext, a Cloudflare Worker, DeepSeek, and R2. API credentials remain server-side and are not part of the blog or source code.

### In progress on 14 August

- Replacing starter documentation with an operator-focused setup and recovery guide.
- Hardening meeting-record filenames and expanding rendered application and API tests.
- Clarifying the boundary between hosting access control, application authorization, and information that is approved to be sent to the model provider.

These changes are still in the local working state, so I am recording them as ongoing work rather than a completed release.

## Email Assembler — human-reviewed Gmail reply automation

[Email Assembler](https://github.com/KristWangCY/Email-Assembler) is a Windows desktop Gmail assistant. It monitors new mail, filters obvious automated messages locally, uses DeepSeek to summarize customer intent and prepare an English reply, and keeps the final decision with the user.

### v0.8.0 released on 4 August

- Gmail OAuth, background polling, message deduplication, and a configurable interval down to five seconds.
- Latest-message summaries, customer-intent labels, signature-based identity extraction, persistent manual contact corrections, and complete read-only contact history.
- Editable English reply drafts, custom regeneration prompts, back and exit paths, and a strict rule that **nothing is sent until the user clicks “Apply this reply.”**
- A local reference-document library for TXT, Markdown, CSV, JSON, DOCX, XLSX, and PDF, with selected documents grounding company, product, and pricing facts.
- 58 automated tests covering configuration, Gmail parsing, AI constraints, identity memory, and document extraction.

The current status is a complete desktop MVP, not a packaged Windows installer. Real Gmail authorization, incoming-message retrieval, and sending still require end-to-end testing with the user's own OAuth client. Email bodies and explicitly selected reference documents are sent to DeepSeek when those features run; credentials and local business files remain outside Git.

## RedNotesHouseRenting — Xiaohongshu rental discovery

[RedNotesHouseRenting](https://github.com/KristWangCY/RedNotesHouseRenting) is a personal rental discovery assistant built for Canary Wharf, London. It performs low-frequency Xiaohongshu searches, structures evidence from listing cards with DeepSeek, and sends a report to one fixed Gmail recipient.

### v1.0.0 public release merged on 8 August

- Multiple configurable searches, whole-property and budget prioritisation, deduplication, and HTML, CSV, and JSON reports.
- Natural-language email commands for location, budget, property type, move-in date, and stay length. Commands cannot change the sender, recipient, APIs, or security settings.
- A dedicated Edge profile for Xiaohongshu instead of reading cookies from the user's normal browser profile.
- Optional daily execution at 15:00 London time and a separate Gmail command watcher, both installed as Windows scheduled tasks.
- Rate limits, duplicate-command suppression, trusted senders, local-only configuration, and ignored credentials, browser sessions, reports, and logs.

The collector does not bypass authentication, verification challenges, or platform restrictions. Xiaohongshu's page structure and login rules can change, and social listings are not verified; the advertiser, property, contract, deposit protection, and viewing must all be checked independently before payment.

## WhatsApp Desktop translation plug-in — a private companion panel

This is a single-user Windows 11 plug-in-style tool being developed under the K&M workspace. It is implemented as a separate companion panel rather than an injected WhatsApp extension, and is designed to show the original inbound message, Simplified Chinese, and English.

### First runnable slice completed on 13 August

- A .NET 10 and WPF side panel with window docking and DPI-aware positioning.
- A manual translation fallback, Azure Translator integration, and keys stored with Windows Credential Manager.
- An isolated UI Automation probe so a blocked third-party provider cannot freeze the translation panel.
- Guards against attaching an old translation to a newly selected conversation.
- In-memory-only message handling and diagnostics that do not record message text, translations, contacts, phone numbers, or chat titles.

### Acceptance gate still open

Automatic capture will not be enabled until the real customer PC proves that WhatsApp's UI Automation tree can reliably expose complete text, message direction, conversation changes, and stable ordering. The current gate requires at least 99% visible-text coverage, 99.9% character accuracy, zero outbound-to-inbound misclassification in 500 labelled samples, and zero cross-chat translation leakage in 100 in-flight conversation switches.

If the gate fails, the product will keep the safe manual copy-and-translate path instead of guessing. Text sent for translation leaves WhatsApp's end-to-end encrypted boundary after decryption and is transmitted to Microsoft Azure over HTTPS; that privacy boundary must be shown to the user before the first automatic translation.

## RithumAuto — guarded inventory workflow automation

[RithumAuto](https://github.com/KristWangCY/RithumAuto) is a desktop and command-line tool for Rithum / DSCO Inventory. For each SKU, it selects exactly one row, opens **Update Item Inventory**, leaves the existing inventory values unchanged, submits the form, waits for Rithum's success notification, and writes a timestamped result.

### Development branch progress through 12 August

- A two-action Electron desktop interface: process all SKUs with live progress, or review current and historical logs.
- Windows 10/11 x64 packaging and an Apple Silicon macOS build workflow for M1–M4 devices.
- A separate Chrome profile, encrypted credentials through OS-backed Electron `safeStorage`, exact SKU-row verification, per-SKU error isolation, and failure screenshots when available.
- A dual safety gate for command-line writes: both `--commit` and an explicit local commit-enable setting are required before real inventory updates.
- A 09:30 local-time in-app schedule for macOS; Windows runs are intentionally manual in the current desktop build.

This work is still on an active development branch rather than a completed main-branch release. The macOS build is unsigned and not notarized, and MFA or CAPTCHA challenges still require a human login through the dedicated browser profile. Rithum UI changes, session expiry, and network interruptions can also stop a run, so the latest log must be reviewed before retrying.

## Blog platform update

On 3 August 2026, I improved the blog's deployment reliability and security checks, draft handling, sitemap and metadata generation, error boundaries, and automated content tests. Language switching now appears only when the matching translation exists.

This post and its Chinese counterpart share the same publication date and slug pair. Use the **中文** button at the top of the article to switch language; the Chinese page provides an **English** button to return.

## What I am focusing on next

The common theme across these projects is moving from a working prototype to something I can operate safely: evidence instead of claims, explicit privacy boundaries, recoverable state, and a clear distinction between finished work and experiments still under validation.

- Complete NOVA's seven-day real-use record and three-device recovery exercise.
- Validate the WhatsApp capture gate on the actual customer PC before enabling automation.
- Run Email Assembler's Gmail end-to-end acceptance flow and decide on installer packaging.
- Monitor Xiaohongshu structure changes and keep the rental assistant within low-frequency, personal-use boundaries.
- Validate RithumAuto against real inventory data before merging and labelling a desktop release.
