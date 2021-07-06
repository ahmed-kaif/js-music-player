import Songs from './songs.js'

const musicContainer = document.querySelector('.music-container')
const previousBtn = document.querySelector('.previous')
const playBtn = document.querySelector('.action')
const nextBtn = document.querySelector('.next')
const loopBtn = document.querySelector('.loop')
// const randomBtn = document.querySelector('.random')
const trackTitle = document.querySelector('.track-title')
const artist = document.querySelector('.artist')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const albumImage = document.querySelector('.album-image')
const audio = document.querySelector('.audio')

// albumImage.firstElementChild.setAttribute('src', `images/Al_Aqsa.jpg`)

//current song Index
let songIndex = 0

loadSong(Songs[songIndex].path)

function loadSong(path) {
  audio.setAttribute('src', `${path}`)
}

function previousSong() {
  songIndex = songIndex - 1
  if (songIndex < 0) {
    songIndex = Songs.length - 1
  }
  loadSong(Songs[songIndex].path)
  playSong()
}

function nextSong() {
  songIndex = songIndex + 1
  if (songIndex > Songs.length - 1) {
    songIndex = 0
  }

  loadSong(Songs[songIndex].path)
  playSong()
}

// function randomSong() {
//   musicContainer.classList.add('random')
//   randomBtn.style.backgroundColor = 'rgb(153, 153, 153)'
//   songIndex = Math.floor(Math.random() * Songs.length)
//   console.log(songIndex)
//   loadSong(Songs[songIndex].path)
// }

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  let progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
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

function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  trackTitle.textContent = Songs[songIndex].title
  artist.textContent = Songs[songIndex].artist
  audio.play()
}
function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  audio.pause()
}

// Event listeners
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

// randomBtn.addEventListener('click', randomSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)
