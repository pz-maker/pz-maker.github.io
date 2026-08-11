// 知识星图（Hugo 版）：力导向 SVG，节点 = 文章，边 = 内部引用
// 逻辑移植自原 VitePress StarMap.vue；力参数按 60fps 基准校准
(() => {
  const root = document.getElementById('star-map');
  if (!root) return;

  const raw = root.dataset.map;
  if (!raw) return;
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return;
  }

  const svg = root.querySelector('svg');
  if (!svg) return;

  const W = 920;
  const H = 560;
  const NS = 'http://www.w3.org/2000/svg';

  const sectionOf = (n) => n.section || 'misc';
  const seedOf = (s) => [...s].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const normalizePath = (p) => p.replace(/\.html$/, '').replace(/\/+$/, '') || '/';

  // 星团锚点：按领域环形分布（确定性，SSR/CSR 一致）
  const sectionNames = [...new Set(data.nodes.map(sectionOf))];
  const clusterAnchors = new Map();
  sectionNames.forEach((name, i) => {
    const angle = (i / Math.max(1, sectionNames.length)) * Math.PI * 2 - Math.PI / 2;
    const radius = Math.min(W, H) * 0.3;
    clusterAnchors.set(name, {
      x: W / 2 + Math.cos(angle) * radius,
      y: H / 2 + Math.sin(angle) * radius * 0.82,
    });
  });

  const nodes = data.nodes.map((n) => {
    const anchor = clusterAnchors.get(sectionOf(n)) || { x: W / 2, y: H / 2 };
    const seed = seedOf(n.id);
    const angle = (seed % 360) * (Math.PI / 180);
    const dist = 46 + (seed % 130);
    return { ...n, x: anchor.x + Math.cos(angle) * dist, y: anchor.y + Math.sin(angle) * dist, vx: 0, vy: 0 };
  });
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const links = data.links || [];

  const linkKey = (l) => [l.source, l.target].sort().join('|');
  const neighbors = new Map();
  for (const l of links) {
    if (!neighbors.has(l.source)) neighbors.set(l.source, new Set());
    if (!neighbors.has(l.target)) neighbors.set(l.target, new Set());
    neighbors.get(l.source).add(l.target);
    neighbors.get(l.target).add(l.source);
  }

  // 当前在读：优先 ?from=，其次当前路径
  const params = new URLSearchParams(location.search);
  let activeId = '';
  const from = params.get('from');
  if (from) activeId = normalizePath(from);
  else if (location.pathname !== '/') activeId = normalizePath(location.pathname);

  // ===== SVG 构建 =====
  const el = (tag, attrs) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) e.setAttribute(k, v);
    return e;
  };

  const linkEls = links.map((l) => {
    const line = el('line', { class: 'star-map__link', 'data-k': linkKey(l) });
    svg.appendChild(line);
    return { l, line };
  });

  const clusterEls = sectionNames.map((name) => {
    const a = clusterAnchors.get(name);
    const t = el('text', { class: 'star-map__cluster', x: a.x, y: a.y, 'text-anchor': 'middle' });
    t.textContent = name;
    svg.appendChild(t);
    return t;
  });

  const isActive = (n) => n.id === activeId;

  const nodeEls = nodes.map((n) => {
    const g = el('g');
    const halo = isActive(n) ? el('circle', { class: 'star-map__halo', cx: n.x, cy: n.y, r: 24 }) : null;
    const circle = el('circle', {
      class: 'star-map__dot' + (isActive(n) ? ' is-active' : ''),
      cx: n.x,
      cy: n.y,
      r: isActive(n) ? 9 : 4,
    });
    const label = el('text', { class: 'star-map__label' + (isActive(n) ? ' is-active' : ''), x: n.x, y: n.y - 16, 'text-anchor': 'middle' });
    label.textContent = n.title;
    label.style.display = isActive(n) ? '' : 'none';

    if (halo) g.appendChild(halo);
    g.appendChild(circle);
    g.appendChild(label);
    svg.appendChild(g);

    circle.addEventListener('mouseenter', () => setHover(n.id));
    circle.addEventListener('mouseleave', () => setHover(null));
    circle.addEventListener('click', () => { location.href = n.url; });

    return { n, g, halo, circle, label };
  });

  // ===== 交互状态 =====
  let hoverId = null;
  let hoverAnchor = null;
  const mouse = { x: 0, y: 0 };
  const mouseSm = { x: 0, y: 0 };

  const setHover = (id) => {
    hoverId = id;
    if (id === null) {
      hoverAnchor = null;
    } else {
      const node = nodeById.get(id);
      hoverAnchor = node ? { x: node.x, y: node.y } : null;
    }
    applyClasses();
  };

  const applyClasses = () => {
    for (const { l, line } of linkEls) {
      line.classList.toggle('is-lit', hoverId !== null && (l.source === hoverId || l.target === hoverId));
    }
    const scope = hoverId !== null ? neighbors.get(hoverId) : null;
    for (const { n, circle, label } of nodeEls) {
      const isHover = hoverId === n.id;
      const isNeighbor = scope !== null && scope.has(n.id);
      circle.classList.toggle('is-hover', isHover);
      circle.classList.toggle('is-neighbor', isNeighbor);
      const active = isActive(n);
      const showLabel = active || isHover;
      circle.setAttribute('r', active ? 9 : isHover ? 6.5 : 4);
      label.style.display = showLabel ? '' : 'none';
      label.classList.toggle('is-active', active);
    }
  };

  const toViewBox = (e) => {
    const rect = svg.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * W,
      y: ((e.clientY - rect.top) / rect.height) * H,
    };
  };

  svg.addEventListener('mousemove', (e) => {
    const p = toViewBox(e);
    mouse.x = p.x;
    mouse.y = p.y;
  });
  svg.addEventListener('mouseleave', () => setHover(null));

  // ===== 力导向模拟（参数与原版一致） =====
  const REPULSION = 1800;
  const MIN_D = 34;
  const SPRING_REST = 120;
  const SPRING_K = 0.01;
  const CENTER_K = 0.028;
  const MOUSE_K = 0.14;
  const MOUSE_RANGE = 280;
  const DAMPING = 0.88;
  const MAX_SPEED = 2.4;
  const ANCHOR_K = 0.05;
  const MOUSE_SMOOTH = 0.3;

  let rafId = null;
  let lastTime = 0;

  const tick = (now) => {
    const n = nodes.length;
    if (!lastTime) lastTime = now;
    const dt = Math.min(Math.max((now - lastTime) / 16.667, 0.1), 2.5);
    lastTime = now;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = nodes[i];
        const b = nodes[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        const d = Math.max(Math.sqrt(d2), MIN_D);
        dx /= d;
        dy /= d;
        const f = (REPULSION / d2) * dt;
        a.vx += dx * f;
        a.vy += dy * f;
        b.vx -= dx * f;
        b.vy -= dy * f;
      }
    }

    for (const l of links) {
      const a = nodeById.get(l.source);
      const b = nodeById.get(l.target);
      if (!a || !b) continue;
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      const d = Math.max(Math.hypot(dx, dy), 1);
      dx /= d;
      dy /= d;
      const f = (d - SPRING_REST) * SPRING_K * dt;
      a.vx += dx * f;
      a.vy += dy * f;
      b.vx -= dx * f;
      b.vy -= dy * f;
    }

    for (const node of nodes) {
      const anchor = clusterAnchors.get(sectionOf(node)) || { x: W / 2, y: H / 2 };
      node.vx += (anchor.x - node.x) * CENTER_K * dt;
      node.vy += (anchor.y - node.y) * CENTER_K * dt;
    }

    if (hoverId !== null) {
      const scope = neighbors.get(hoverId) || new Set();
      mouseSm.x += (mouse.x - mouseSm.x) * MOUSE_SMOOTH;
      mouseSm.y += (mouse.y - mouseSm.y) * MOUSE_SMOOTH;
      for (const node of nodes) {
        if (!scope.has(node.id)) continue;
        const dx = mouseSm.x - node.x;
        const dy = mouseSm.y - node.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_RANGE && d > 1) {
          const f = MOUSE_K * (1 - d / MOUSE_RANGE) * dt;
          node.vx += (dx / d) * f;
          node.vy += (dy / d) * f;
        }
      }
    }

    if (hoverId !== null && hoverAnchor) {
      const h = nodeById.get(hoverId);
      if (h) {
        h.vx += (hoverAnchor.x - h.x) * ANCHOR_K * dt;
        h.vy += (hoverAnchor.y - h.y) * ANCHOR_K * dt;
      }
    }

    const damping = Math.pow(DAMPING, dt);
    for (const node of nodes) {
      node.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, node.vx * damping));
      node.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, node.vy * damping));
      node.x += node.vx * dt;
      node.y += node.vy * dt;
      node.x = Math.max(24, Math.min(W - 24, node.x));
      node.y = Math.max(24, Math.min(H - 24, node.y));
    }

    // 同步 DOM
    for (const { l, line } of linkEls) {
      const a = nodeById.get(l.source);
      const b = nodeById.get(l.target);
      if (!a || !b) continue;
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
    }
    for (const { n, halo, circle, label } of nodeEls) {
      circle.setAttribute('cx', n.x);
      circle.setAttribute('cy', n.y);
      label.setAttribute('x', n.x);
      label.setAttribute('y', n.y - 16);
      if (halo) {
        halo.setAttribute('cx', n.x);
        halo.setAttribute('cy', n.y);
      }
    }

    rafId = requestAnimationFrame(tick);
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    rafId = requestAnimationFrame(tick);
  } else {
    // 静态：直接渲染一帧初始位置
    for (const { l, line } of linkEls) {
      const a = nodeById.get(l.source);
      const b = nodeById.get(l.target);
      if (!a || !b) continue;
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
    }
  }
})();
