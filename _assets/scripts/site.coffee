###
# Site JS
###

# credit where it’s due:
# http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

window.requestAnimFrame = () ->
  return window.requestAnimationFrame or
         window.webkitRequestAnimationFrame or
         window.mozRequestAnimationFrame or
         (callback) -> window.setTimeout(callback, 1000 / 60)

# Show Overcast icon on iOS devices
iOSDevice = /iPad|iPhone|iPod/.test(navigator.platform)
iosOnlyElement = document.querySelector('.show-on-ios')

iosOnlyElement.style.display = 'block' if iOSDevice
