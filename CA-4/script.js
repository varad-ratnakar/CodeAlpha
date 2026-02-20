const songs = [
    {
        title: "Song One",
        artist: "Artist A",
        file: "songs/song1.mp3"
    },
    {
        title: "Song Two",
        artist: "Artist B",
        file: "songs/song2.mp3"
    },
    {
        title: "Song Three",
        artist: "Artist C",
        file: "songs/song3.mp3"
    }
];

let currentSongIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeControl = document.getElementById("volume");

// Load Song
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.file;
}

loadSong(songs[currentSongIndex]);

// Play / Pause
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

// Next Song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    audio.play();
    playBtn.textContent = "⏸";
}

// Previous Song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    audio.play();
    playBtn.textContent = "⏸";
}

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";

    // Format time
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

// Click to Seek
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});

// Volume Control
volumeControl.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

// Auto Play Next
audio.addEventListener("ended", nextSong);

// Format Time Function
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
}