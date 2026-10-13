/* Mouss Media — escena 3D, animaciones de scroll, formulario y cookies */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = function () { return window.innerWidth < 860; };

  /* ---------- Escena 3D: arcos del logotipo en oro ---------- */
  var canvas = document.getElementById('gl');
  var webgl = !!window.THREE && (function () {
    try { var c = document.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; }
  })();

  var target = 0, p = 0, mx = 0, my = 0, render = function () {};
  // Dónde se coloca el objeto según la sección visible: right | left | center | dim
  var objMode = 'right', side = 1.8, alpha = 1;

  if (webgl) {
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !narrow(), powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow() ? 1.5 : 2));
    renderer.setClearColor(0x0A0A0B, 1);
    renderer.outputEncoding = THREE.sRGBEncoding;
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0A0A0B, 8, 20);
    var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    var arch = function (w, h) {
      var s = new THREE.Shape(), r = w / 2;
      s.moveTo(-r, 0); s.lineTo(-r, h - r); s.absarc(0, h - r, r, Math.PI, 0, true); s.lineTo(r, 0); s.lineTo(-r, 0);
      return new THREE.ExtrudeGeometry(s, { depth: 0.55, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 6, curveSegments: 48 });
    };
    var gold = new THREE.MeshStandardMaterial({ color: 0xC9A86A, metalness: 1, roughness: 0.28 });
    var group = new THREE.Group(); scene.add(group);
    var arches = [[-1.1, 0.9, 1.55], [0, 0.9, 2.25], [1.1, 0.9, 2.25]].map(function (d) {
      var m = new THREE.Mesh(arch(d[1], d[2]), gold);
      m.position.set(d[0], -1.1, -0.275); m.userData.x = d[0]; group.add(m); return m;
    });

    var N = narrow() ? 450 : 900, pg = new THREE.BufferGeometry(), pos = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22; pos[i * 3 + 1] = (Math.random() - 0.5) * 14; pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xC9A86A, size: 0.025, transparent: true, opacity: 0.55 }));
    scene.add(dust);

    scene.add(new THREE.HemisphereLight(0xfff3dc, 0x0a0a0b, 0.35));
    var key = new THREE.PointLight(0xffe7b8, 2.2, 30); key.position.set(4, 4, 6); scene.add(key);
    var rim = new THREE.PointLight(0xc9a86a, 2.6, 30); rim.position.set(-5, 1, -4); scene.add(rim);
    var fill = new THREE.PointLight(0xffffff, 0.8, 30); fill.position.set(0, -4, 5); scene.add(fill);

    var resize = function () {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize); resize();
    window.addEventListener('pointermove', function (e) { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; });

    render = function (t) {
      p += (target - p) * (reduce ? 1 : 0.07);
      var k = (t || 0) * 0.001;
      // Recorrido: de frente -> los arcos se separan -> giro completo -> vuelven a alinearse
      var spread = Math.sin(Math.min(1, p * 2.2) * Math.PI) * 1.1;
      arches.forEach(function (m, i) { m.position.x = m.userData.x * (1 + spread * (narrow() ? 0.35 : 0.9)); m.rotation.y = spread * (i - 1) * 0.5; });
      group.rotation.y = -0.5 + p * Math.PI * 2.2 + (reduce ? 0 : Math.sin(k * 0.4) * 0.05) + mx * 0.3;
      group.rotation.x = 0.12 + my * 0.15 - p * 0.3;
      var sx = narrow() ? 0 : ({ right: 1.9, left: -1.9, center: 0, dim: 0 })[objMode];
      var a = objMode === 'dim' ? 0.18 : (narrow() && objMode !== 'center' ? 0.55 : 1);
      var f = reduce ? 1 : 0.07;
      side += (sx - side) * f; alpha += (a - alpha) * f;
      group.position.x = side;
      group.position.y = narrow() ? 1.7 : 0;
      canvas.style.opacity = alpha.toFixed(3);
      camera.position.set(0, 0.2, (narrow() ? 15 : 9.5) - p * 3.2);
      camera.lookAt(0, 0, 0);
      dust.rotation.y = k * 0.02 + p * 0.6;
      renderer.render(scene, camera);
    };
  } else if (canvas) {
    canvas.style.display = 'none';
  }

  /* ---------- Scroll: progreso, código de tiempo y revelados ---------- */
  var tc = document.getElementById('tc');
  var setTimecode = function (prog) {
    // 25 fps, la página entera equivale a 1 minuto de metraje
    var frames = Math.round(prog * 60 * 25), f = frames % 25, s = Math.floor(frames / 25) % 60, m = Math.floor(frames / 1500);
    var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
    if (tc) tc.textContent = '00:' + pad(m) + ':' + pad(s) + ':' + pad(f);
  };

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) { target = s.progress; setTimecode(s.progress); if (reduce) render(); } });

    document.querySelectorAll('[data-obj]').forEach(function (sec) {
      ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%',
        onToggle: function (s) { if (s.isActive) { objMode = sec.getAttribute('data-obj'); if (reduce) render(); } } });
    });

    if (!reduce) {
      gsap.from('.hero .line > span', { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: 0.12, delay: 0.15 });
      gsap.utils.toArray('.reveal').forEach(function (el) {
        gsap.fromTo(el, { y: 80 }, { y: -40, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray('.incl li, .steps div, .sectors li').forEach(function (el) {
        gsap.fromTo(el, { y: 40, opacity: 0.35 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 70%', scrub: true } });
      });
    }
  }

  if (webgl) {
    if (reduce) { render(0); window.addEventListener('resize', function () { render(0); }); }
    else { var loop = function (t) { render(t); requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
  }

  /* ---------- Navegación: se oculta al bajar, aparece al subir ---------- */
  var nav = document.getElementById('nav'), lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    nav.classList.toggle('hide', y > lastY && y > 300);
    lastY = y;
  }, { passive: true });

  /* ---------- Showreel: solo aparece si existe el vídeo ---------- */
  var reel = document.getElementById('reel'), video = document.getElementById('reelVideo');
  if (video) {
    video.addEventListener('loadedmetadata', function () {
      reel.hidden = false;
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
        ScrollTrigger.create({ trigger: reel, start: 'top 80%', end: 'bottom 20%',
          onToggle: function (s) { if (s.isActive) { var pr = video.play(); if (pr && pr.catch) pr.catch(function () {}); } else video.pause(); } });
      }
    });
  }

  /* ---------- Formulario de lista de espera ---------- */
  var form = document.getElementById('applyForm');
  if (form) {
    var ok = document.getElementById('formOk'), btn = document.getElementById('submitBtn');
    var sink = document.getElementById('formSink'), fitNote = document.getElementById('fitNote');
    var budget = document.getElementById('f-presupuesto'), sent = false;
    var rules = {
      'f-marca': function (v) { return v.trim().length >= 2; },
      'f-sector': function (v) { return v !== ''; },
      'f-presupuesto': function (v) { return v !== ''; },
      'f-inicio': function (v) { return v !== ''; },
      'f-nombre': function (v) { return v.trim().length >= 2; },
      'f-cargo': function (v) { return v !== ''; },
      'f-email': function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      'f-telefono': function (v) { return /^[+\d][\d\s.-]{7,}$/.test(v.trim()); }
    };
    var check = function (id) {
      var el = document.getElementById(id), good = rules[id](el.value);
      el.closest('.f').classList.toggle('error', !good);
      return good;
    };
    Object.keys(rules).forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener('blur', function () { check(id); });
      el.addEventListener('change', function () { if (el.closest('.f').classList.contains('error')) check(id); });
    });
    budget.addEventListener('change', function () { fitNote.hidden = budget.value !== 'Menos de 1.500 €'; });

    form.addEventListener('submit', function (e) {
      var good = Object.keys(rules).map(check).every(Boolean);
      var priv = document.getElementById('f-privacidad');
      document.getElementById('privWrap').classList.toggle('error', !priv.checked);
      if (!good || !priv.checked) {
        e.preventDefault();
        var first = form.querySelector('.f.error input, .f.error select') || priv;
        first.focus();
        return;
      }
      sent = true; btn.disabled = true; btn.textContent = 'Enviando…';
    });
    sink.addEventListener('load', function () {
      if (!sent) return;
      sent = false;
      form.hidden = true; ok.hidden = false;
      if (window.gtag) gtag('event', 'generate_lead', { form: 'lista_espera' });
    });
  }

  /* ---------- Aviso de cookies ---------- */
  var banner = document.getElementById('cookieBanner');
  var stored = null;
  try { stored = localStorage.getItem('mm-cookies'); } catch (e) {}
  if (banner && !stored) banner.hidden = false;
  var choose = function (c) { try { localStorage.setItem('mm-cookies', c); } catch (e) {} banner.hidden = true; };
  if (banner) {
    document.getElementById('cookieAccept').addEventListener('click', function () { choose('accepted'); window.loadAnalytics(); });
    document.getElementById('cookieReject').addEventListener('click', function () { choose('rejected'); });
  }
})();
