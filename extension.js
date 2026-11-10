import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import {CapsState} from './lib/capsState.js';
import {KeymapSource} from './lib/keymapSource.js';
import {Overlay} from './lib/overlay.js';
import {CapsIndicator} from './lib/indicator.js';

export default class CapsOverlayExtension extends Extension {
    enable() {
        this._state = new CapsState();
        this._overlay = new Overlay();
        this._indicator = new CapsIndicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator, 0, 'right');

        this._source = new KeymapSource(on => this._onState(on));
        // First reading sets the baseline: no popup at login/enable.
        this._state.update(this._source.read());
        this._indicator.setOn(this._state.isOn);
    }

    _onState(on) {
        const change = this._state.update(on);
        this._indicator.setOn(this._state.isOn);
        if (change)
            this._overlay.show(change);
    }

    disable() {
        this._source?.destroy();
        this._source = null;
        this._overlay?.destroy();
        this._overlay = null;
        this._indicator?.destroy();
        this._indicator = null;
        this._state = null;
    }
}
