// Run: gjs -m tests/capsState.test.js
import {CapsState, LABEL_ON, LABEL_OFF} from '../lib/capsState.js';

let failures = 0;
function check(name, cond) {
    print(`${cond ? 'ok  ' : 'FAIL'} ${name}`);
    if (!cond)
        failures++;
}

const s = new CapsState();
check('first reading shows nothing', s.update(false) === null);
check('not on after off baseline', s.isOn === false);
check('same state shows nothing', s.update(false) === null);
const on = s.update(true);
check('off->on reports on', on && on.on === true && on.label === LABEL_ON);
check('isOn true', s.isOn === true);
check('repeat on shows nothing', s.update(true) === null);
const off = s.update(0);
check('on->off reports off (falsy coerced)', off && off.on === false && off.label === LABEL_OFF);

const t = new CapsState();
check('baseline on shows nothing', t.update(true) === null);
check('baseline on sets isOn', t.isOn === true);

if (failures) {
    print(`${failures} failure(s)`);
    imports.system.exit(1);
}
print('all passed');
