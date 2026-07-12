const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Reveal on scroll
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// Project filters
const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project[data-category], .mini-project[data-category]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projects.forEach((project) => {
      const categories = (project.dataset.category || '').split(' ');
      const show = filter === 'all' || categories.includes(filter);
      project.classList.toggle('is-hidden', !show);
    });
  });
});

function buildMedia(kind, src, poster, alt) {
  if (kind === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    if (poster) video.poster = poster;
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    return video;
  }
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt || '';
  image.loading = 'eager';
  return image;
}

// Media galleries
const galleries = document.querySelectorAll('[data-gallery]');
galleries.forEach((gallery) => {
  const stage = gallery.querySelector('.gallery-stage');
  const thumbs = gallery.querySelectorAll('.media-thumb');
  const caption = stage.querySelector('.stage-caption');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach((item) => item.classList.remove('active'));
      thumb.classList.add('active');

      const current = stage.querySelector(':scope > img, :scope > video');
      const next = buildMedia(thumb.dataset.kind, thumb.dataset.src, thumb.dataset.poster, thumb.dataset.title);
      if (current) current.replaceWith(next);
      else stage.prepend(next);

      caption.innerHTML = `<b>${thumb.dataset.title || ''}</b><span>${thumb.dataset.caption || ''}</span>`;
      stage.dataset.kind = thumb.dataset.kind;
      stage.dataset.src = thumb.dataset.src;
      stage.dataset.poster = thumb.dataset.poster || '';
      stage.dataset.title = thumb.dataset.title || '';
      stage.dataset.caption = thumb.dataset.caption || '';
    });
  });

  const active = gallery.querySelector('.media-thumb.active') || thumbs[0];
  if (active) {
    stage.dataset.kind = active.dataset.kind;
    stage.dataset.src = active.dataset.src;
    stage.dataset.poster = active.dataset.poster || '';
    stage.dataset.title = active.dataset.title || '';
    stage.dataset.caption = active.dataset.caption || '';
  }
});

// Fullscreen media dialog
const dialog = document.querySelector('#mediaDialog');
const dialogContent = dialog?.querySelector('.dialog-content');
const dialogCaption = dialog?.querySelector('.dialog-caption');
const closeButton = dialog?.querySelector('.dialog-close');

document.querySelectorAll('.expand-media').forEach((button) => {
  button.addEventListener('click', () => {
    const stage = button.closest('.gallery-stage');
    if (!dialog || !stage) return;
    dialogContent.replaceChildren(buildMedia(stage.dataset.kind || 'image', stage.dataset.src, stage.dataset.poster, stage.dataset.title));
    dialogCaption.textContent = [stage.dataset.title, stage.dataset.caption].filter(Boolean).join(' — ');
    dialog.showModal();
  });
});

closeButton?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog?.addEventListener('close', () => {
  const video = dialogContent.querySelector('video');
  if (video) video.pause();
  dialogContent.replaceChildren();
});

// Active navigation section
const navLinks = [...document.querySelectorAll('.site-header nav a')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] });
  sections.forEach((section) => navObserver.observe(section));
}
