const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let musicStarted = false;

async function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    try { await music.play(); musicStarted = true; musicToggle.innerHTML = '♫ <span>Music on</span>'; }
    catch { musicToggle.innerHTML = '♫ <span>Add song</span>'; }
  } else {
    music.pause(); musicToggle.innerHTML = '♫ <span>Music off</span>';
  }
}
musicToggle?.addEventListener('click', toggleMusic);

const envelope = document.getElementById('envelope');
function openEnvelope(){ envelope?.classList.toggle('open'); if (!musicStarted && music) toggleMusic(); }
envelope?.addEventListener('click', openEnvelope);
envelope?.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){e.preventDefault();openEnvelope();} });

document.getElementById('openNote')?.addEventListener('click', () => {
  document.getElementById('noteReveal')?.classList.toggle('show');
  envelope?.classList.add('open');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.photo').forEach(button => {
  const path = button.dataset.image;
  const img = new Image();
  img.onload = () => {
    const placeholder = button.querySelector('.photo-placeholder');
    if(placeholder) placeholder.remove();
    button.prepend(img);
  };
  img.onerror = () => {};
  img.src = path;
  button.addEventListener('click', () => {
    if(!img.complete || !img.naturalWidth){ alert('இந்த இடத்தில் இன்னும் photo சேர்க்கவில்லை. assets/images folder-ல் சரியான photo file-ஐ வையுங்கள்.'); return; }
    document.getElementById('lightboxImage').src = path;
    document.getElementById('lightbox').classList.add('show');
  });
});
function closeLightbox(){ document.getElementById('lightbox')?.classList.remove('show'); }
document.getElementById('closeLightbox')?.addEventListener('click', closeLightbox);
document.getElementById('lightbox')?.addEventListener('click', e => { if(e.target.id === 'lightbox') closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

document.getElementById('celebrateBtn')?.addEventListener('click', () => {
  const box = document.getElementById('confetti');
  box.innerHTML = '';
  for(let i=0;i<65;i++){
    const piece = document.createElement('i');
    piece.style.left = Math.random()*100+'%';
    piece.style.animationDelay = Math.random()*1.2+'s';
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    piece.style.background = ['#d88e9e','#f4e8dc','#d6aa78','#a85b70'][i%4];
    box.appendChild(piece);
  }
  document.getElementById('birthdayNote').textContent = 'Make a wish, Harini. May beautiful things find their way to you. ✨';
});
