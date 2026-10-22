const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  nav.classList.toggle('open', expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
});

document.querySelector('#application-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Application — Digital Marketing Executive — ${data.get('name')}`;
  const body = [
    'Hi Lugia,', '',
    'I would like to apply for the Digital Marketing Executive role.', '',
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Current city and country: ${data.get('location')}`,
    `Preferred arrangement: ${data.get('arrangement')}`,
    `Relevant experience: ${data.get('experience') || 'Not provided'}`,
    `CV / portfolio / LinkedIn: ${data.get('work') || 'I can attach my CV to this email.'}`,
    '', 'About me:', data.get('message'), '',
    'Thank you!'
  ].join('\n');
  window.location.href = `mailto:lugiainternational@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#application-status').textContent = 'Your email draft is ready to open. Review it, attach your CV if needed, and send it to apply. If your email app did not open, email lugiainternational@gmail.com directly.';
});
