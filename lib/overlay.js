// UI layer: large centred popup near the bottom of the primary monitor.

import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const SHOW_MS = 1200;
const FADE_MS = 150;

export class Overlay {
    constructor() {
        this._box = new St.BoxLayout({
            style_class: 'majuscule',
            vertical: false,
            reactive: false,
            opacity: 0,
            visible: false,
        });
        this._icon = new St.Icon({
            style_class: 'majuscule-icon',
            icon_name: 'input-keyboard-symbolic',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this._label = new St.Label({
            style_class: 'majuscule-label',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this._box.add_child(this._icon);
        this._box.add_child(this._label);
        Main.layoutManager.uiGroup.add_child(this._box);
        this._timeoutId = 0;
    }

    show(change) {
        this._label.text = change.label;
        this._box.remove_style_pseudo_class(change.on ? 'off' : 'on');
        this._box.add_style_pseudo_class(change.on ? 'on' : 'off');

        Main.layoutManager.uiGroup.set_child_above_sibling(this._box, null);
        this._box.visible = true;
        this._place();

        this._box.remove_all_transitions();
        this._box.ease({
            opacity: 255,
            duration: FADE_MS,
            mode: Clutter.AnimationMode.EASE_OUT_QUAD,
        });

        this._clearTimeout();
        this._timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, SHOW_MS, () => {
            this._timeoutId = 0;
            this._hide();
            return GLib.SOURCE_REMOVE;
        });
    }

    _place() {
        const monitor = Main.layoutManager.primaryMonitor;
        if (!monitor)
            return;
        const [, natW] = this._box.get_preferred_width(-1);
        const [, natH] = this._box.get_preferred_height(natW);
        this._box.set_position(
            Math.round(monitor.x + (monitor.width - natW) / 2),
            Math.round(monitor.y + monitor.height * 0.78 - natH / 2));
    }

    _hide() {
        this._box.ease({
            opacity: 0,
            duration: FADE_MS,
            mode: Clutter.AnimationMode.EASE_IN_QUAD,
            onComplete: () => {
                if (this._box)
                    this._box.visible = false;
            },
        });
    }

    _clearTimeout() {
        if (this._timeoutId) {
            GLib.source_remove(this._timeoutId);
            this._timeoutId = 0;
        }
    }

    destroy() {
        this._clearTimeout();
        if (this._box) {
            this._box.remove_all_transitions();
            this._box.destroy();
            this._box = null;
        }
    }
}
