#!/usr/bin/env bash
# Architecture check: the domain module must not depend on GNOME/GI.
set -euo pipefail
cd "$(dirname "$0")/.."
if grep -nE "from '(gi|resource)://|imports\.gi" lib/capsState.js; then
  echo "FAIL: lib/capsState.js imports GNOME/GI modules" >&2
  exit 1
fi
# UI modules must not be imported by the adapter.
if grep -nE "overlay\.js|indicator\.js" lib/keymapSource.js; then
  echo "FAIL: adapter imports UI" >&2
  exit 1
fi
echo "layers ok"
