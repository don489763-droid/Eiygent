const allBtns = document.querySelectorAll('.btn');
allBtns.forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    // If this button is a link (has href), let it navigate
    const href = btn.getAttribute('href');
    if (href && href !== '#') {
      btn.textContent = 'Loading...';
      return; // IMPORTANT: allow browser to go to author.html
    }

    // If no href (like REFRESH button), do the reload action
    event.preventDefault();
    btn.textContent = 'Loading...';
    setTimeout(function() {
      location.reload();
    }, 800);
  });
});
