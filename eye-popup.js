// eye-popup.js - Yellow on Green Eye Health Popup

document.addEventListener('DOMContentLoaded', function() {
  // Don't show again if already seen
  if (localStorage.getItem('eyePopupSeen')) return;

  // Create popup HTML
  const popup = document.createElement('div');
  popup.id = 'eyePopup';
  popup.innerHTML = `
    <div style="background:#16a34a; max-width:400px; width:90%; padding:30px; border-radius:20px; text-align:center; font-family:sans-serif; box-shadow:0 10px 30px rgba(0,0,0,0.4); border:3px solid #facc15;">
      <div style="font-size:50px;">👀✨🌿</div>
      <h2 style="margin:10px 0; color:#fde047; font-size:26px;">Easy On Your Eyes! 😌</h2>
      <p style="color:#fef08a; line-height:1.6; font-size:16px;">
        We designed this theme to be gentle for your eyes! 💛<br>
        Soft colours, no harsh glare, and comfortable to read day & night 🌙☀️
      </p>
      <p style="font-size:22px;">👁️💚 🧿💡</p>
      <button id="closeEyePopupBtn" style="background:#facc15; color:#14532d; border:none; padding:12px 25px; border-radius:30px; font-size:16px; font-weight:bold; cursor:pointer;">
        Got it, Thanks! 🙏😊
      </button>
    </div>
  `;

  // Overlay styles
  popup.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999; display:none; justify-content:center; align-items:center;';

  document.body.appendChild(popup);

  // Show after 1.5 seconds
  setTimeout(function() {
    popup.style.display = 'flex';
  }, 1500);

  // Close function
  function closePopup() {
    popup.style.display = 'none';
    localStorage.setItem('eyePopupSeen', 'yes');
  }

  document.getElementById('closeEyePopupBtn').addEventListener('click', closePopup);

  // Close when clicking outside
  popup.addEventListener('click', function(e) {
    if (e.target.id === 'eyePopup') closePopup();
  });
});
