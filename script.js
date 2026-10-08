const startButton = document.getElementById('startButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const confirmStart = document.getElementById('confirmStart');
const timer = document.getElementById('timer');
const clock = document.getElementById('clock');
const shareButton = document.getElementById('shareButton');

startButton.addEventListener('click', () => modal.classList.remove('hidden'));
closeModal.addEventListener('click', () => modal.classList.add('hidden'));

shareButton.addEventListener('click', async () => {
  const shareData = {
    title: 'einestunde',
    text: 'Eine Stunde, die bewegt. Mach mit.',
    url: window.location.href
  };
  try {
    if (navigator.share) await navigator.share(shareData);
    else await navigator.clipboard.writeText(window.location.href);
  } catch (_) {}
});

confirmStart.addEventListener('click', () => {
  modal.classList.add('hidden');
  timer.classList.remove('hidden');

  // Prototype: 60 minutes. Backend-Anbindung kommt im nächsten Schritt.
  let seconds = 60 * 60;
  const tick = () => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    clock.textContent = `${m}:${s}`;
    if (seconds > 0) {
      seconds--;
      setTimeout(tick, 1000);
    } else {
      clock.textContent = '60:00';
    }
  };
  tick();
});
