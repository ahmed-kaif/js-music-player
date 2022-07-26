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
// const playlistContainer = document.querySelector('.playlist-container')
const siteUrl = new URL(window.location)
const playlistBtn = document.querySelector('.playlist-btn')
const playlist = document.querySelector('.sidenav')
const closeBtn = document.querySelector('.close-btn')

//current song Index
let songIndex = 0
let queryParam = new URLSearchParams(siteUrl.search)
let siteTitle = document.title

if(!queryParam.has('nasheed')){
  loadSong(Songs[songIndex].path)
} else {
  songIndex = getIndexFromQuery()
  loadSong(Songs[songIndex].path)
}
// console.log(playlistContainer)
// Update The URL parameter To current song

function updateUrl(path) {
  let newPath= path.split("/")[2]
  siteUrl.searchParams.set('nasheed', `${newPath}`)
  if (history.pushState) {
    var newurl = siteUrl.protocol + "//" + siteUrl.host + siteUrl.pathname + siteUrl.search;
    window.history.pushState({path:newurl},'',newurl);
}
}

function getIndexFromQuery() {
  if(queryParam.has('nasheed')){
  let newIndex = Songs.findIndex( Song => Song.path.includes(queryParam.get('nasheed')))
  return newIndex   
  }
}

// Updates The Page Title
function updateMetaTitle(title) {
  siteTitle = title
  document.title = siteTitle
}

function getAllSongTitle() {
  Songs.forEach((song, index) => {
    let div = document.createElement('btn');
    div.id = `${index}`
    div.className = 'title list-btn';
    div.innerText=`${song.title}`
    playlist.appendChild(div)
    div.addEventListener('click', ()=>{
      songIndex = index
      loadSong(song.path)
      playSong()
    })
  })
}
getAllSongTitle()

function loadSong(path) {
  audio.setAttribute('src', `${path}`)
  trackTitle.innerHTML = Songs[songIndex].title
  artist.innerHTML = Songs[songIndex].artist
  updateUrl(path) // updates the url
  updateMetaTitle(Songs[songIndex].title) // updates the page title to current song title
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

function togglePlayList() {
  playlist.classList.toggle('show')
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
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

playlistBtn.addEventListener('click', ()=>{
  togglePlayList()
})

closeBtn.addEventListener('click', ()=>{
  togglePlayList()
})

