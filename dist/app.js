// Shared navigation and contact form. No dependencies.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');

function closeMenu() {
  navigation?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menú');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  navigation?.classList.toggle('open', open);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});

navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
const desktop = window.matchMedia('(min-width: 761px)');
desktop.addEventListener('change', closeMenu);
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

document.getElementById('idea-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = 'Propuesta ciudadana: ' + form.get('topic');
  const body = [
    'Nombre: ' + (form.get('name') || 'No indicado'),
    'Provincia: ' + (form.get('province') || 'No indicada'),
    'Tema: ' + form.get('topic'),
    '', 'Propuesta:', form.get('message')
  ].join('\n');
  window.location.href = 'mailto:kristvec@outlook.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  document.getElementById('form-status').textContent = 'Revisa y envía el mensaje desde tu aplicación de correo. Si no se abre, puedes escribirme por WhatsApp.';
});
