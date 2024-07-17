const musicContainer = document.querySelector(".music-container");
const cover = document.querySelector("#cover");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".music-progress-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const songName = document.querySelector("#song-title");
const singerName = document.querySelector("#singer-name");

//song title
const songs = ["Cheshmami _ Shayea FT. Hoomaan", "Hello _ Adele", "Delm Az Donya Gerefte _ Hoomaan"];

//track the song
let songIndex = 0;

//update song details
const loadSong = function (song) {
  const [title, singer] = song.split(" _ ");
  audio.src = `./assets/music/${song}.mp3`;
  cover.src = `./assets/img/${title}.jpg`;
  singerName.innerText = singer;
  songName.innerText = title;
};

//
const playSong = function () {
  musicContainer.classList.add("play");
  playBtn.querySelector(".fa-solid").classList.remove("fa-play");
  playBtn.querySelector(".fa-solid").classList.add("fa-pause");
  playBtn.style.margin = "0px 32px";
  audio.play();
};

//
const pauseSong = function () {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
  playBtn.style.margin = "0px 30px";
  audio.pause();
};

const prevSong = function () {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
};
const nextSong = function () {
  songIndex++;
  if (songIndex >= songs.length) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
};

const updateProgress = function (e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

const setProgress = function (e) {
	const progressWidth = this.clientWidth;
	const selected = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (selected / progressWidth) * duration;
	// updateProgress();
};

//load song info DOM
loadSong(songs[songIndex]);

//event listener
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  isPlaying ? pauseSong() : playSong();
});

//change song event
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);
