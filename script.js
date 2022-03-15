let isPlay = false;
let index = 0;

let audio = document.getElementById('music');

let background = document.querySelector('.background');
let thumbnail = document.querySelector('.music-cover');

let playBtn = document.getElementById('play');
let pauseBtn = document.getElementById('pause');
let nextBtn = document.getElementById('forward');
let prevBtn = document.getElementById('backward');

let audioArtist = document.getElementById('artist');
let audioTitle = document.getElementById('name');
let durationBar = document.getElementById('duration-slider');

let currentTime = document.getElementById('currentTime');
let durationTime = document.getElementById('durationTime');

let volumeSlider = document.getElementById('sound-slider');
let muteVolume = document.getElementById('mute');
let maxVolume = document.getElementById('max-volume');

// Default volume value

audio.volume = volumeSlider.value / 100;
console.log(audio.volume);

const listOfMusic = [
  {
    artist: "Beyonce",
    title: "Don't Hurt Yourself",
    thumbnail: "./img/lemonade.png",
    file: "/music/beyonce.mp3"
  },
  {
    artist: "Dua Lipa",
    title: "Don't Start Now",
    thumbnail: "./img/dontstartnow.png",
    file: "/music/dontstartnow.mp3"
  },
  {
    artist: "Loud Luxury ft. Brando",
    title: "Body",
    thumbnail: "https://i.ibb.co/371t9Md/Loud-Luxury-Song-Cover-Art.jpg",
    file: "https://res.cloudinary.com/cbanlawi/video/upload/v1614186705/Loud_Luxury_ft._Brando_-_Body_fm7cdr.mp3"
  }
]

function playPause() {
  if (!isPlay) {
    isPlay = true;
    audio.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
  } else {
    isPlay = false;
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    audio.pause();
  } 
} 

playBtn.addEventListener('click', playPause);
pauseBtn.addEventListener('click', playPause);

nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

function nextTrack() {
  index++;
  if (index > listOfMusic.length - 1) {
    index = 0;
  }

  audio.src = listOfMusic[index].file;
  background.style.backgroundImage = `url(${listOfMusic[index].thumbnail})`;
  thumbnail.style.backgroundImage = `url(${listOfMusic[index].thumbnail})`;
  audioArtist.textContent = listOfMusic[index].artist;
  audioTitle.textContent = listOfMusic[index].title;

  isPlay = false;
  playPause();
}

audio.addEventListener('ended', nextTrack);

function prevTrack() {
  index--;
  if (index < 0) {
    index = listOfMusic.length - 1;
  }
  audio.src = listOfMusic[index].file;
  background.style.backgroundImage = `url(${listOfMusic[index].thumbnail})`;
  thumbnail.style.backgroundImage = `url(${listOfMusic[index].thumbnail})`;
  audioArtist.textContent = listOfMusic[index].artist;
  audioTitle.textContent = listOfMusic[index].title;

  isPlay = false;
  playPause();
}

function timeConverter(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

// Sound control

volumeSlider.addEventListener("change", () => {
  audio.volume = volumeSlider.value / 100;
});

muteVolume.addEventListener("click", () => {
  audio.volume = 0;
  volumeSlider.value = 0;
});

maxVolume.addEventListener("click", () => {
  audio.volume = 1;
  volumeSlider.value = 100;
});

// Rewinding
durationBar.addEventListener("input", rewindAudio); 

function rewindAudio() {
  audio.currentTime = durationBar.value;
}

function progressValue() {
  durationBar.max = audio.duration;
  durationBar.value = audio.currentTime;

  currentTime.textContent = timeConverter(audio.currentTime);
  durationTime.textContent = timeConverter(audio.duration);
}

setInterval(progressValue, 500);