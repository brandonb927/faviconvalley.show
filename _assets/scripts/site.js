/*
 * Site JS
 */

// Show Overcast icon on iOS devices
let iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
let iosOnlyElement = document.querySelector('.show-on-ios')
if (iOSDevice) {
  iosOnlyElement.style.display = 'block'
}
