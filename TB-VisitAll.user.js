// ==UserScript==
// @name         GC TB Visit All
// @namespace    https://github.com/Knollo/Trackable-Visit-All
// @version      1.0.0
// @description  Adds a "Visit all" button to set all trackables to "Visit" on geocaching.com log compose pages
// @author       Jens Collasch
// @match        https://www.geocaching.com/live/geocache/*/draft/*/compose*
// @match        https://www.geocaching.com/live/geocache/*/log*
// @icon         https://www.geocaching.com/favicon.ico
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const BUTTON_LABEL = 'Visit all';
    const POLL_INTERVAL = 500;
    const MAX_WAIT = 15000;

    function createVisitAllButton() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = BUTTON_LABEL;
        btn.setAttribute('data-event-category', 'data');
        btn.setAttribute('data-event-label', 'Cache Log - visit all');
        btn.className =
            'inline-block m-0 p-0 border-0 text-base bg-transparent font-input underline cursor-pointer text-blue-500 hover:no-underline';
        btn.addEventListener('click', visitAllTrackables);
        return btn;
    }

    function visitAllTrackables() {
        // Each trackable row has a button group; the "Visit" option has
        // data-event-label="Cache Log - visit" or data-testid="gc-button-group-option-1"
        const visitButtons = document.querySelectorAll(
            'button[data-event-label="Cache Log - visit"]'
        );

        if (visitButtons.length === 0) {
            // Fallback: try by testid
            const fallback = document.querySelectorAll(
                'button[data-testid="gc-button-group-option-1"]'
            );
            fallback.forEach((btn) => btn.click());
            return;
        }

        visitButtons.forEach((btn) => btn.click());
    }

    function insertButton() {
        // Avoid duplicate insertion
        if (document.querySelector('[data-event-label="Cache Log - visit all"]')) {
            return true;
        }

        // Find the "Drop all" button as anchor point
        const dropAllBtn = document.querySelector(
            'button[data-event-label="Cache Log - drop all"]'
        );
        if (!dropAllBtn) return false;

        const visitAllBtn = createVisitAllButton();

        // Insert "Visit all" before "Drop all", separated by a space
        const separator = document.createTextNode(' · ');
        dropAllBtn.parentNode.insertBefore(visitAllBtn, dropAllBtn);
        dropAllBtn.parentNode.insertBefore(separator, dropAllBtn);

        return true;
    }

    // Poll until the "Drop all" button appears (React renders async)
    let elapsed = 0;
    const timer = setInterval(() => {
        if (insertButton() || elapsed >= MAX_WAIT) {
            clearInterval(timer);
        }
        elapsed += POLL_INTERVAL;
    }, POLL_INTERVAL);

    // Also watch for SPA navigation / dynamic re-renders
    const observer = new MutationObserver(() => insertButton());
    observer.observe(document.body, { childList: true, subtree: true });
})();
