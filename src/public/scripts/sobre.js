import { MAIN_TEXTS } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('main-title');
  const desc = document.getElementById('main-description');
  if (title && desc) {
    title.textContent = MAIN_TEXTS.sobre.title;
    desc.textContent = MAIN_TEXTS.sobre.description;
  }
});
