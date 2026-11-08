/* Artificial Alliance / Collection preview desk.
   The sounds below are pre-existing synthetic INTERFACE DEMOS, not part of this pack.
   Replace the track list with actual licensed pack previews prior to launch. */
(() => {
  'use strict';

  const menu = document.getElementById('menu');
  const navLinks = document.getElementById('navLinks');
  if (menu && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = 'Menu +';
    };
    menu.addEventListener('click', () => {
      if (menu.getAttribute('aria-expanded') === 'true') closeMenu();
      else {
        navLinks.classList.add('open');
        menu.setAttribute('aria-expanded', 'true');
        menu.textContent = 'Menu −';
      }
    });
    navLinks.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  const audio = document.getElementById('packAudio');
  const play = document.getElementById('packPlay');
  const glyph = document.getElementById('packPlayGlyph');
  const trackName = document.getElementById('packTrackName');
  const seek = document.getElementById('packSeek');
  const currentTime = document.getElementById('packCurrent');
  const durationTime = document.getElementById('packDuration');
  const loop = document.getElementById('packLoop');
  const loopLabel = document.getElementById('packLoopLabel');
  const status = document.getElementById('packStatus');
  const buttons = Array.from(document.querySelectorAll('[data-pack-track]'));
  if (!audio || !play || !seek || !trackName || !buttons.length) return;

  const tracks = [
    { title: 'Harmonic', src: '../../assets/audio/study-01.mp3', duration: 10.4348 },
    { title: 'Sequence', src: '../../assets/audio/study-02.mp3', duration: 8.8889 },
    { title: 'Rhythm', src: '../../assets/audio/study-03.mp3', duration: 10.0 }
  ];
  const normalNotice = 'INTERFACE DEMOS ONLY — NOT AUDIO FROM THIS PACK.';
  let selected = 0;
  let isSeeking = false;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const n = Math.max(0, Math.floor(seconds));
    return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0');
  }
  function duration() {
    return Number.isFinite(audio.duration) && audio.duration > 0
      ? audio.duration : tracks[selected].duration;
  }
  function updateProgress() {
    if (!isSeeking) {
      const fraction = duration() > 0 ? Math.min(1, audio.currentTime / duration()) : 0;
      seek.value = String(Math.round(fraction * 1000));
      seek.style.setProperty('--played', (fraction * 100).toFixed(2) + '%');
    }
    currentTime.textContent = formatTime(audio.currentTime);
    durationTime.textContent = formatTime(duration());
  }
  function updatePlayUI() {
    const playing = !audio.paused && !audio.ended;
    glyph.textContent = playing ? 'Ⅱ' : '▶';
    play.setAttribute('aria-label', (playing ? 'Pause ' : 'Play ') + tracks[selected].title + ' demo');
    play.setAttribute('aria-pressed', String(playing));
    play.classList.toggle('is-playing', playing);
  }
  function selectTrack(index, shouldPlay) {
    if (!Number.isInteger(index) || !tracks[index]) return;
    selected = index;
    audio.pause();
    audio.src = tracks[index].src;
    audio.load();
    trackName.textContent = tracks[index].title;
    buttons.forEach((button, i) => {
      button.classList.toggle('active', i === index);
      button.setAttribute('aria-pressed', String(i === index));
    });
    status.textContent = normalNotice;
    isSeeking = false;
    updateProgress();
    updatePlayUI();
    if (shouldPlay) attemptPlay();
  }
  async function attemptPlay() {
    try {
      await audio.play();
      status.textContent = normalNotice;
    } catch (error) {
      status.textContent = 'Unable to play this demo. Check audio files and browser settings.';
    }
    updatePlayUI();
  }

  play.addEventListener('click', () => {
    if (audio.paused) attemptPlay(); else { audio.pause(); updatePlayUI(); }
  });
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.packTrack);
      if (index === selected) {
        if (audio.paused) attemptPlay(); else audio.pause();
      } else selectTrack(index, true);
      updatePlayUI();
    });
  });
  seek.addEventListener('input', () => {
    isSeeking = true;
    const fraction = Number(seek.value) / 1000;
    seek.style.setProperty('--played', (fraction * 100).toFixed(2) + '%');
    currentTime.textContent = formatTime(fraction * duration());
  });
  function commitSeek() {
    audio.currentTime = (Number(seek.value) / 1000) * duration();
    isSeeking = false;
    updateProgress();
  }
  seek.addEventListener('change', commitSeek);
  seek.addEventListener('pointerup', () => { if (isSeeking) commitSeek(); });
  loop.addEventListener('click', () => {
    audio.loop = !audio.loop;
    loop.setAttribute('aria-pressed', String(audio.loop));
    loopLabel.textContent = audio.loop ? 'LOOP ON' : 'LOOP OFF';
  });
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('durationchange', updateProgress);
  audio.addEventListener('play', updatePlayUI);
  audio.addEventListener('pause', updatePlayUI);
  audio.addEventListener('ended', () => { updatePlayUI(); updateProgress(); });
  audio.addEventListener('error', () => {
    status.textContent = 'Demo audio unavailable. Check the local assets/audio folder.';
    updatePlayUI();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !audio.paused) audio.pause();
  });
  selectTrack(0, false);
})();
