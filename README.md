# Caps Lock Overlay

GNOME Shell extension for keyboards without a Caps Lock LED (e.g. ThinkPad X260).

- When Caps Lock turns on or off, a large, high-contrast notice appears near the
  bottom of the primary monitor for about 1.2 seconds.
- While Caps Lock is on, a yellow **A** badge stays in the top bar.
- Nothing is shown at login; only real changes trigger the notice.

Works on Wayland and X11 (it runs inside GNOME Shell and reads the compositor
keymap). Targets GNOME Shell 50.

## Install

```bash
git clone https://github.com/Quezka/caps-overlay
cd caps-overlay
./install.sh
```

On Wayland, log out and back in once, then:

```bash
gnome-extensions enable caps-overlay@quezka.uk
```

## Tests

```bash
gjs -m tests/capsState.test.js
tests/layers.test.sh
```

## Layout

- `lib/capsState.js`: domain, pure state logic (no GNOME imports).
- `lib/keymapSource.js`: adapter, reads the Clutter keymap.
- `lib/overlay.js`, `lib/indicator.js`: UI.
- `extension.js`: wiring.

## License

MIT
