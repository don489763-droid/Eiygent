const allBtns = document.querySelectorAll('.btn');

allBtns.forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    btn.textContent = 'Loading...';
    setTimeout(function() {
      location.reload();
    }, 800);
  });
});
