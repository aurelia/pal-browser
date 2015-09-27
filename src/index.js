import {initializePAL} from 'aurelia-pal';
import {PLATFORM} from './platform';
import {FEATURE} from './feature';
import {DOM} from './dom';

export function initialize() {
  initializePAL(PLATFORM, FEATURE, DOM);
}
