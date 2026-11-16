const allBtns = document.querySelectorAll('.btn');
allBtns.forEach(function(btn) {
 const originalText = btn.textContent;

  btn.addEventListener('click', function(event) {
    // If this button is a link (has href), let it navigate
    const href = btn.getAttribute('href');
    
    btn.textContent = 'Loading...';
    setTimeout(function() {
	btn.textContent = originalText
     }, 800);
  });



