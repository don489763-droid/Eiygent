// external-popup.js - Yellow on Green - Leaving Eiygent Warning

document.addEventListener('DOMContentLoaded', function() {

  // Create popup (hidden by default)
  const popup = document.createElement('div');
  popup.id = 'externalPopup';
  popup.innerHTML = `
    <div style="background:#16a34a; max-width:400px; width:90%; padding:30px; border-radius:20px; text-align:center; font-family:sans-serif; box-shadow:0 10px 30px rgba(0,0,0,0.4); border:3px solid #facc15;">
      <div style="font-size:50px;">⚠️🚪🌍</div>
      <h2 style="margin:10px 0; color:#fde047; font-size:24px;">Leaving Eiygent? 👀</h2>
      <p style="color:#fef08a; line-height:1.6; font-size:16px;">
        You are now navigating outside the <b>Eiygent</b> website! 💛<br>
        You will go to:<br>
        <span id="externalLinkUrl" style="color:#ffffff; word-break:break-all; font-weight:bold;"></span>
      </p>
      <p style="font-size:22px;">🔗✨ Stay safe out there!</p>
      <div style="display:flex; gap:10px; justify-content:center;">
        <button id="stayBtn" style="background:#ffffff; color:#14532d; border:none; padding:12px 20px; border-radius:30px; font-size:15px; font-weight:bold; cursor:pointer;">
          Stay Here 🏠
        </button>
        <button id="leaveBtn" style="background:#facc15; color:#14532d; border:none; padding:12px 20px; border-radius:30px; font-size:15px; font-weight:bold; cursor:pointer;">
          Continue ➡️
        </button>
      </div>
    </div>
  `;

  popup.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999; display:none; justify-content:center; align-items:center;';
  document.body.appendChild(popup);

  let nextUrl = '';

  function closePopup() {
    popup.style.display = 'none';
  }

  document.getElementById('stayBtn').addEventListener('click', closePopup);

  document.getElementById('leaveBtn').addEventListener('click', function() {
    window.location.href = nextUrl;
  });

  popup.addEventListener('click', function(e) {
    if (e.target.id === 'externalPopup') closePopup();
  });

  // Catch ALL external links & buttons
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

    // Check if it's external
    const url = new URL(href, window.location.href);
    const isExternal = url.hostname !== window.location.hostname;

    if (isExternal) {
      e.preventDefault();
      nextUrl = url.href;
      document.getElementById('externalLinkUrl').textContent = nextUrl;
      popup.style.display = 'flex';
    }
  });
});
