const Helper = {
  formatTime: (time) => {
    let mins = Math.floor(time / 60)
    if (mins < 10) {
      mins = '0' + String(mins)
    }
    let secs = Math.floor(time % 60)
    if (secs < 10) {
      secs = '0' + String(secs)
    }

    return mins + ':' + secs
  },
  random: (maxRange) => {
    return Math.floor(Math.random() * maxRange)
  },
}

export default Helper
