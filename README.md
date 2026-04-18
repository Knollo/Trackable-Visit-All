# Trackable Visit All

A lightweight Tampermonkey userscript that adds a **"Visit all"** button to geocaching.com log compose pages — setting all your trackables to *Visit* with a single click.

![Tampermonkey](https://img.shields.io/badge/Tampermonkey-compatible-green) ![Violentmonkey](https://img.shields.io/badge/Violentmonkey-compatible-green) ![License](https://img.shields.io/badge/license-MIT-blue)

## What it does

When composing a cache log on geocaching.com, you'll see the existing **Drop all** and **Clear all** buttons for trackables. This script adds a **Visit all** button right next to them, which clicks every trackable's *Visit* option at once.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or [Violentmonkey](https://violentmonkey.github.io/)) in your browser
2. Click the link below to install the script directly:

   👉 **[Install TB-VisitAll.user.js](https://raw.githubusercontent.com/Knollo/Trackable-Visit-All/main/TB-VisitAll.user.js)**

3. Tampermonkey will open and ask you to confirm — click **Install**
4. Done! Navigate to any geocaching.com log compose page to see the new button

## Supported pages

The script runs on:

- `https://www.geocaching.com/live/geocache/*/draft/*/compose*`
- `https://www.geocaching.com/live/geocache/*/log*`

## Usage

1. Open a cache log page (e.g. `https://www.geocaching.com/live/geocache/GC2G6FA/draft/LDAW6C90/compose#`)
2. Scroll down to the trackable section
3. Click **Visit all** — all trackables will be set to *Visit*

## Compatibility

| Script Manager | Status |
|---|---|
| Tampermonkey | ✅ Tested |
| Violentmonkey | ✅ Should work |
| Greasemonkey | ⚠️ Untested |

## License

MIT — feel free to use, modify, and share.
