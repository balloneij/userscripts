# Userscripts

Violentmonkey userscripts, installed from and auto-updated against this repository's raw GitHub URLs.

## Public repository

This repository is public. Never write anything sensitive: no credentials, tokens, email addresses, people's names, internal hostnames, organization or customer details, or content copied from a page a script runs on. Selectors and logic only.

## Layout

One `<name>.user.js` per script at the repository root. Every script's metadata block carries `@name`, `@namespace`, `@version`, `@match`, and `@downloadURL` and `@updateURL` pointing at `https://raw.githubusercontent.com/balloneij/userscripts/main/<name>.user.js`.

## Testing

Use the browser MCP to test a script against the live page when it helps. Pages with a strict Content-Security-Policy refuse injected JavaScript, so verify selectors through the accessibility tree instead. Never take an irreversible action on a real account while testing.

## Releasing

Violentmonkey only updates a script whose `@version` increases. When a change is committed and pushed, remind the user to bump `@version` if the change did not.

## No comments

Do NOT write inline comments or docstrings. The userscript metadata block is not a comment.

Prefer expressive code: well-named variables and functions.

## Illegal state

Do NOT set defaults or blank values for illegal state. Fail hard and fast, and prefer to eliminate the possibility of illegal state in the first place.

A blank fallback reads as careful and passes review. It converts a loud failure into a silent wrong answer.

## Do not branch or create worktrees

Stay on your branch and your checkout. Do NOT branch or create a worktree unless explicitly instructed to.

## Config

Do NOT add knobs unless necessary. Prefer constants over settings.
