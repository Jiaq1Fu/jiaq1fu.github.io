const demos = document.querySelectorAll('[data-demo] video');
for (const video of demos) {
  const startButton = video.parentElement.querySelector('.demo-start');
  function showPoster() {
    video.controls = false;
    startButton.hidden = false;
  }
  showPoster();
  startButton.addEventListener('click', async () => {
    for (const other of demos) {
      if (other !== video) other.pause();
    }
    startButton.hidden = true;
    video.controls = true;
    try {
      await video.play();
      video.focus();
    } catch {
      // Native controls provide error and retry feedback.
      video.controls = true;
    }
  });
  video.addEventListener('ended', () => {
    video.load();
    showPoster();
  });
}
