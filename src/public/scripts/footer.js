fetch('/footer.html')
  .then(res => res.text())
  .then(html => {
    const footerDiv = document.getElementById('footer-include');
    if (footerDiv) footerDiv.innerHTML = html;
  });
