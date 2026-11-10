// UI layer: small top-bar badge shown only while Caps Lock is on.

import GObject from 'gi://GObject';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

export const CapsIndicator = GObject.registerClass(
class CapsIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, 'Caps Lock', true);
        this.reactive = false;
        this.can_focus = false;
        this.track_hover = false;
        this.add_child(new St.Label({
            text: 'A',
            style_class: 'caps-indicator-label',
            y_align: Clutter.ActorAlign.CENTER,
        }));
        this.visible = false;
    }

    setOn(on) {
        this.visible = on;
    }
});
