#!/usr/bin/env bash
# Symlink this checkout into the user's GNOME Shell extensions folder.
set -euo pipefail
UUID="majuscule@quezka.uk"
SRC="$(cd "$(dirname "$0")" && pwd)"
DEST="$HOME/.local/share/gnome-shell/extensions/$UUID"
mkdir -p "$(dirname "$DEST")"
ln -sfn "$SRC" "$DEST"
echo "Linked $DEST -> $SRC"
if gnome-extensions info "$UUID" >/dev/null 2>&1; then
  gnome-extensions enable "$UUID" && echo "Enabled."
else
  echo "On Wayland: log out and back in once, then run:"
  echo "  gnome-extensions enable $UUID"
fi
