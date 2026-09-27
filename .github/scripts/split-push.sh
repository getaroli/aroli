#!/usr/bin/env bash
# Push one monorepo prefix to its split repo (mirror).
# Usage: split-push.sh <prefix> <repo>
# Requires SPLIT_PUSH_TOKEN (classic PAT with `repo` + `workflow` scopes).
set -euo pipefail
prefix="$1"
repo="$2"
branch="split-tmp-${repo}"
if [[ -z "${SPLIT_PUSH_TOKEN:-}" ]]; then
    echo "SPLIT_PUSH_TOKEN is empty or unavailable; configure it as an Actions repository secret." >&2
    exit 1
fi
git subtree split --prefix="$prefix" -b "$branch"
git push --force "https://x-access-token:${SPLIT_PUSH_TOKEN}@github.com/getaroli/${repo}.git" "$branch:main"
git branch -D "$branch"
