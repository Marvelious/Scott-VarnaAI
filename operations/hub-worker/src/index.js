import projects from '../projects-loader.js';

function jsonResponse(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    ...init,
  });
}

function notFound(msg = 'Not found') {
  return jsonResponse({ error: msg }, { status: 404 });
}

function textResponse(body, contentType = 'text/plain') {
  return new Response(body, { headers: { 'content-type': contentType } });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = env.OPS_ALLOW_ORIGIN || '*';

    // Basic CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const send = (res) => new Response(res.body, {
      ...res,
      headers: { 'Access-Control-Allow-Origin': origin, ...(res.headers || {}) },
    });

    // Routes
    if (url.pathname.startsWith('/flags/')) {
      const project = url.pathname.split('/')[2]?.replace('.json', '');
      if (!project) return send(jsonResponse({ error: 'Missing project' }, { status: 400 }));
      const cfg = projects[project];
      if (!cfg) return send(notFound('Unknown project'));
      const flags = cfg.flags || {};
      return send(jsonResponse({ project, flags }));
    }

    if (url.pathname === '/feedback' && req.method === 'POST') {
      try {
        const payload = await req.json();
        // For now, just log in dev. Replace with Slack/Email sink later.
        console.log('[feedback]', JSON.stringify(payload));
        return send(jsonResponse({ ok: true }));
      } catch (e) {
        return send(jsonResponse({ error: 'Invalid JSON' }, { status: 400 }));
      }
    }

    if (url.pathname === '/embed/feedback.js') {
      // Serve the local snippet so you can embed during dev
      // Note: in production, you might bake this into the Worker bundle.
      const js = FEEDBACK_JS;
      return send(textResponse(js, 'application/javascript'));
    }

    if (url.pathname === '/' || url.pathname === '/health') {
      return send(textResponse('ops-hub-worker ok'));
    }

    return send(notFound());
  }
}

// Inline the feedback snippet (bundler will replace this during build if desired)
const FEEDBACK_JS = `(() => { const s=document.currentScript;const project=s?.dataset?.project||'default';const host=new URL(s.src).origin;const b=document.createElement('button');b.textContent='Feedback';b.style.position='fixed';b.style.right='16px';b.style.bottom='16px';b.style.zIndex='99999';b.style.padding='10px 14px';b.style.background='#111';b.style.color='#fff';b.style.borderRadius='8px';b.style.border='1px solid #444';const m=document.createElement('div');m.style.position='fixed';m.style.inset='0';m.style.display='none';m.style.alignItems='center';m.style.justifyContent='center';m.style.background='rgba(0,0,0,0.35)';m.innerHTML='<div style="background:#fff; color:#111; max-width:520px; width:90%; border-radius:10px; padding:16px; box-shadow:0 8px 30px rgba(0,0,0,.2)"><div style="font-weight:600; margin-bottom:8px">Send feedback</div><textarea id="ops_fb_msg" rows="6" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px" placeholder="What\'s on your mind?"></textarea><input id="ops_fb_email" type="email" placeholder="(Optional) email" style="margin-top:8px; width:100%; padding:8px; border:1px solid #ccc; border-radius:6px"/><div style="margin-top:12px; display:flex; gap:8px; justify-content:flex-end"><button id="ops_fb_cancel" style="padding:8px 12px; border:1px solid #ccc; border-radius:6px; background:#fff">Cancel</button><button id="ops_fb_send" style="padding:8px 12px; border:1px solid #111; border-radius:6px; background:#111; color:#fff">Send</button></div></div>';
const open=()=>m.style.display='flex'; const close=()=>m.style.display='none'; b.addEventListener('click',open); m.addEventListener('click',e=>{ if(e.target===m) close();}); document.body.appendChild(b); document.body.appendChild(m);
const send=async()=>{ const message=document.getElementById('ops_fb_msg').value.trim(); const email=document.getElementById('ops_fb_email').value.trim(); if(!message) return close(); try { await fetch(host+'/feedback',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ project, page:location.href, message, email })}); } catch(e){} close(); };
m.querySelector('#ops_fb_send').addEventListener('click',send); m.querySelector('#ops_fb_cancel').addEventListener('click',close); })();`;

