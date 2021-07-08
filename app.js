import Songs from './songs.js'
import Helper from './modules/helper.js'

const musicContainer = document.querySelector('.music-container')
const previousBtn = document.querySelector('.previous')
const playBtn = document.querySelector('.action')
const nextBtn = document.querySelector('.next')
const loopBtn = document.querySelector('.loop')
const randomBtn = document.querySelector('.random')
const trackTitle = document.querySelector('.track-title')
const artist = document.querySelector('.artist')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const albumImage = document.querySelector('.album-image')
const audio = document.querySelector('.audio')
const currentTime = document.querySelector('.current-time')
const audioDuration = document.querySelector('.duration')

//current song Index
let songIndex = 0

loadSong(Songs[songIndex].path)

function loadSong(path) {
  audio.setAttribute('src', `${path}`)
  trackTitle.innerHTML = Songs[songIndex].title
  artist.innerHTML = Songs[songIndex].artist
}

//######### Progress Bar Related functions #########

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  let progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
  if (currentTime === duration) {
    nextSong()
  }
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}
//######### Audio Time Related Functions #########

function setDuration() {
  audioDuration.innerHTML = Helper.formatTime(audio.duration)
}
function updateCurrentTime() {
  currentTime.innerHTML = Helper.formatTime(audio.currentTime)
}

//######### song related functions #########

function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  albumImage.classList.add('rotate')
  trackTitle.textContent = Songs[songIndex].title
  artist.textContent = Songs[songIndex].artist
  audio.play()
}
function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  albumImage.classList.remove('rotate')
  audio.pause()
}

function previousSong() {
  if (musicContainer.classList.contains('random')) {
    randomSong()
  } else {
    songIndex = songIndex - 1
    if (songIndex < 0) {
      songIndex = Songs.length - 1
    }
    loadSong(Songs[songIndex].path)
    playSong()
  }
}

function nextSong() {
  if (musicContainer.classList.contains('random')) {
    randomSong()
  } else {
    songIndex = songIndex + 1
    if (songIndex > Songs.length - 1) {
      songIndex = 0
    }

    loadSong(Songs[songIndex].path)
    playSong()
  }
}

function randomSong() {
  musicContainer.classList.add('random')
  randomBtn.classList.add('selected')
  songIndex = Helper.random(Songs.length)

  loadSong(Songs[songIndex].path)
  playSong()
}

function loopSong() {
  if (!audio.loop) {
    audio.loop = true
    loopBtn.classList.add('selected')
  } else {
    audio.loop = false
    loopBtn.classList.remove('selected')
  }
}

// ######### Event listeners #########

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

nextBtn.addEventListener('click', nextSong)

previousBtn.addEventListener('click', previousSong)

loopBtn.addEventListener('click', loopSong)

randomBtn.addEventListener('click', () => {
  const isRandom = musicContainer.classList.contains('random')
  if (!isRandom) {
    randomSong()
  } else {
    musicContainer.classList.remove('random')
    randomBtn.classList.remove('selected')
  }
})

audio.addEventListener('timeupdate', (e) => {
  updateProgress(e)
  updateCurrentTime()
})
audio.addEventListener('loadedmetadata', setDuration)

progressContainer.addEventListener('click', setProgress)
