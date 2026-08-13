#!/bin/bash
# SessionStart hook: prepare the repo so an agent session can build, lint and
# format immediately. Runs synchronously, so the session starts with a working
# node_modules rather than racing against one.
set -euo pipefail

# Only run in Claude Code on the web. Local sessions manage their own toolchain
# (see .tool-versions).
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

# --- Node version -----------------------------------------------------------
# Required version is pinned in .tool-versions, not hardcoded here — this is
# just a check that the sandbox's Node actually matches the pin, since this
# script only runs where .tool-versions isn't guaranteed to be self-enforcing
# (see the CLAUDE_CODE_REMOTE guard above). On Node 18, pnpm silently skips
# the platform-specific @oxc-parser native bindings; the install still exits
# 0 and the failure only appears later as an unrelated-looking `astro check`
# crash.
REQUIRED_NODE_MAJOR="$(awk '$1 == "nodejs" { split($2, v, "."); print v[1] }' .tool-versions 2>/dev/null)"
REQUIRED_NODE_MAJOR="${REQUIRED_NODE_MAJOR:-22}"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$NODE_MAJOR" -lt "$REQUIRED_NODE_MAJOR" ]; then
  echo "WARNING: Node $(node --version 2>/dev/null || echo 'not found') detected; .tool-versions requires Node $REQUIRED_NODE_MAJOR."
  echo "         Builds may fail with \"Cannot find module '@oxc-parser/binding-*'\"."
fi

# --- pnpm -------------------------------------------------------------------
if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found; enabling via corepack"
  corepack enable >/dev/null 2>&1 || true
  corepack prepare --activate >/dev/null 2>&1 || true
fi

# --- Dependencies -----------------------------------------------------------
# Prefer the lockfile-exact install so the tree matches CI. Fall back to a
# regular install if the lockfile has drifted, so a session is never blocked.
echo "Installing dependencies with pnpm..."
if ! pnpm install --frozen-lockfile; then
  echo "WARNING: --frozen-lockfile failed (lockfile may be out of sync with package.json)."
  echo "         Falling back to 'pnpm install'."
  if ! pnpm install; then
    echo "WARNING: fallback 'pnpm install' also failed. Continuing session anyway; node_modules may be incomplete." >&2
  fi
fi

# --- Sanity check -----------------------------------------------------------
# Confirm the native bindings actually landed. This is the specific failure
# mode that has broken this repo's builds before.
oxc_ok=1
if [ -z "$(ls -A node_modules/@oxc-parser 2>/dev/null)" ]; then
  echo "WARNING: node_modules/@oxc-parser is missing or empty." >&2
  echo "         'pnpm run build' will fail. Check the Node version (needs $REQUIRED_NODE_MAJOR)." >&2
  oxc_ok=0
else
  echo "oxc-parser native bindings present."
fi

# Generate Astro's content collection types so type-aware tooling works before
# the first build.
pnpm exec astro sync >/dev/null 2>&1 || true

if [ "$oxc_ok" -eq 0 ]; then
  echo "Session setup finished with warnings; see above. 'pnpm run build' will likely fail." >&2
  exit 1
fi

echo "Session setup complete."
