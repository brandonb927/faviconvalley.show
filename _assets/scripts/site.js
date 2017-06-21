/*
 * Site JS
 */

// credit where it’s due:
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

window.requestAnimFrame = () =>
  window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         (callback => window.setTimeout(callback, 1000 / 60))
;

// Show Overcast icon on iOS devices
let iOSDevice = /iPad|iPhone|iPod/.test(navigator.platform);
let iosOnlyElement = document.querySelector('.show-on-ios');

if (iOSDevice) { iosOnlyElement.style.display = 'block'; }
