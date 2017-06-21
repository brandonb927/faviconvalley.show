import notify from 'gulp-notify'

export default function () {
  let args = Array.prototype.slice.call(arguments)

  // Send error to notification center with gulp-notify
  notify
    .onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    })
    .apply(this, args)

  // Keep gulp from hanging on this task
  return this.emit('end')
}
