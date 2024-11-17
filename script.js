// scripts.js
const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const tracks = playlist.getElementsByTagName('li');
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const seekBar = document.getElementById('seek');
const volumeBar = document.getElementById('volume');

let currentTrack = 0;

function loadTrack(trackIndex) {
    const track = tracks[trackIndex];
    audio.src = track.getAttribute('data-src');
    audio.play();
    updateActiveTrack(track);
    playPauseBtn.textContent = 'Pause';
}

function updateActiveTrack(activeTrack) {
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].classList.remove('active');
    }
    activeTrack.classList.add('active');
}

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
});

prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack > 0) ? currentTrack - 1 : tracks.length - 1;
    loadTrack(currentTrack);
});

nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack < tracks.length - 1) ? currentTrack + 1 : 0;
    loadTrack(currentTrack);
});

seekBar.addEventListener('input', () => {
    const seekTime = (audio.duration / 100) * seekBar.value;
    audio.currentTime = seekTime;
});

audio.addEventListener('timeupdate', () => {
    const seekPosition = (audio.currentTime / audio.duration) * 100;
    seekBar.value = seekPosition || 0;
});

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});

for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', function() {
        currentTrack = i;
        loadTrack(i);
    });
}

// Load the first track by default
loadTrack(currentTrack);
