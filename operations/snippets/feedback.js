(() => {
  const script = document.currentScript;
  const project = script?.dataset?.project || 'default';
  const host = new URL(script.src).origin;

  const btn = document.createElement('button');
  btn.textContent = 'Feedback';
  btn.style.position = 'fixed';
  btn.style.right = '16px';
  btn.style.bottom = '16px';
  btn.style.zIndex = '99999';
  btn.style.padding = '10px 14px';
  btn.style.background = '#111';
  btn.style.color = '#fff';
  btn.style.borderRadius = '8px';
  btn.style.border = '1px solid #444';

  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.display = 'none';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.background = 'rgba(0,0,0,0.35)';
  modal.innerHTML = `
  <div style="background:#fff; color:#111; max-width:520px; width:90%; border-radius:10px; padding:16px; box-shadow:0 8px 30px rgba(0,0,0,.2)">
    <div style="font-weight:600; margin-bottom:8px">Send feedback</div>
    <textarea id="ops_fb_msg" rows="6" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px" placeholder="What's on your mind?"></textarea>
    <input id="ops_fb_email" type="email" placeholder="(Optional) email" style="margin-top:8px; width:100%; padding:8px; border:1px solid #ccc; border-radius:6px"/>
    <div style="margin-top:12px; display:flex; gap:8px; justify-content:flex-end">
      <button id="ops_fb_cancel" style="padding:8px 12px; border:1px solid #ccc; border-radius:6px; background:#fff">Cancel</button>
      <button id="ops_fb_send" style="padding:8px 12px; border:1px solid #111; border-radius:6px; background:#111; color:#fff">Send</button>
    </div>
  </div>`;

  const open = () => (modal.style.display = 'flex');
  const close = () => (modal.style.display = 'none');
  btn.addEventListener('click', open);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  document.body.appendChild(btn);
  document.body.appendChild(modal);

  const send = async () => {
    const message = document.getElementById('ops_fb_msg').value.trim();
    const email = document.getElementById('ops_fb_email').value.trim();
    if (!message) return close();
    try {
      await fetch(`${host}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project, page: location.href, message, email }),
      });
    } catch (e) { /* swallow */ }
    close();
  };

  modal.querySelector('#ops_fb_send').addEventListener('click', send);
  modal.querySelector('#ops_fb_cancel').addEventListener('click', close);
})();

