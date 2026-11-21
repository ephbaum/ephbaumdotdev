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
# Required version is pinned in .tool-versions, not hardcoded here; this only
# checks the sandbox's Node major against the pin. pnpm merely warns on an
# engine mismatch, so a wrong Node otherwise goes unnoticed until the build.
REQUIRED_NODE_MAJOR="$(awk '$1 == "nodejs" { split($2, v, "."); print v[1] }' .tool-versions 2>/dev/null)"
REQUIRED_NODE_MAJOR="${REQUIRED_NODE_MAJOR:-22}"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$NODE_MAJOR" -lt "$REQUIRED_NODE_MAJOR" ]; then
  echo "WARNING: Node $(node --version 2>/dev/null || echo 'not found') detected; .tool-versions requires Node $REQUIRED_NODE_MAJOR."
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
# astro sync loads Astro, its native compiler and the UnoCSS config, so it
# fails if a platform-specific optional dependency was silently skipped. It
# also generates content collection types for type-aware tooling.
if ! pnpm exec astro sync >/dev/null 2>&1; then
  echo "WARNING: 'astro sync' failed; node_modules is likely incomplete." >&2
  echo "         Check the Node version (needs $REQUIRED_NODE_MAJOR), then reinstall from scratch." >&2
  exit 1
fi

echo "Session setup complete."
