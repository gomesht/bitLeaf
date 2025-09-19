fetch('/header.html')
  .then(res => res.text())
  .then(html => {
    const header = document.querySelector('body > header');
    if (header) {
      header.outerHTML = html;
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }
  });
