/*
		NEKO-PARA-JS 注入框架
		By 辉亦时空研究协会
*/

(function() {
  'use strict';

  const routes = [];
  let intervalId = null;
  let lastPath = '';

  function waitForAppRoot(callback) {
    const check = () => {
      const root = document.getElementById('appRoot');
      if (root) {
        callback(root);
        return true;
      }
      return false;
    };
    if (check()) return;
    const timer = setInterval(() => {
      if (check()) clearInterval(timer);
    }, 100);
  }

  function createPanel(routePath) {
    const id = `vcc-panel-${routePath.replace(/\//g, '_')}`;
    const appRoot = document.getElementById('appRoot');
    if (!appRoot) return null;

    let panel = document.getElementById(id);
    if (panel) return panel;

    panel = document.createElement('div');
    panel.id = id;
    panel.dataset.route = routePath;
    panel.style.cssText = `
		display: flex;
		width: 100%;
		height: 100%;
		max-height: 100vh;
		flex-direction: column;
		overflow-y: auto;
		padding: 0.5rem 1rem 1rem;
    `;
    appRoot.insertBefore(panel, appRoot.firstChild);
    return panel;
  }

  function removePanel(panel) {
    if (panel && panel.parentNode) {
      panel.parentNode.removeChild(panel);
    }
  }

  function syncAllPanels() {
    const appRoot = document.getElementById('appRoot');
    if (!appRoot) return;

    const currentPath = window.location.pathname;
    if (currentPath === lastPath) return;
    lastPath = currentPath;

    let matchedRoute = null;
    for (const route of routes) {
      if (currentPath === route.path) {
        matchedRoute = route;
        break;
      }
    }

    const allPanels = document.querySelectorAll('[id^="vcc-panel-"]');
    for (const panel of allPanels) {
      if (panel.dataset.route !== currentPath) {
        removePanel(panel);
      }
    }

    if (matchedRoute) {
      const panel = createPanel(matchedRoute.path);
      if (panel) {
        let content = typeof matchedRoute.render === 'function' ? matchedRoute.render() : matchedRoute.render;
        if (matchedRoute.css) {
          content = `<style data-route-css>${matchedRoute.css}</style>` + content;
        }
        panel.innerHTML = content;
        panel.style.display = 'block';
      }

      const children = appRoot.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child.id || !child.id.startsWith('vcc-panel-')) {
          child.style.display = 'none';
        }
      }
    } else {
      const children = appRoot.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child.id || !child.id.startsWith('vcc-panel-')) {
          child.style.display = '';
        }
      }
    }
  }

  window.AddNewRouter = function(path, renderContent, cssStyles) {
    if (routes.some(r => r.path === path)) {
      console.warn(`Route ${path} already exists, skipping.`);
      return;
    }
    routes.push({
      path: path,
      render: renderContent,
      css: cssStyles || ''
    });
    if (window.location.pathname === path) {
      syncAllPanels();
    }
  };

  function init() {
    waitForAppRoot(() => {
      syncAllPanels();
      intervalId = setInterval(syncAllPanels, 500);
    });

    window.addEventListener('popstate', syncAllPanels);
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      syncAllPanels();
    };
    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      syncAllPanels();
    };
  }
  
  window.AddNewRouterFromFile = function(path, htmlFile, cssFile) {
    if (routes.some(r => r.path === path)) {
      console.warn(`Route ${path} already exists, skipping.`);
      return;
    }
  
    const route = {
      path: path,
      render: `<div style="padding: 24px; text-align: center; color: var(--colorNeutralForeground3);">加载中...</div>`,
      css: '',
      loaded: false
    };
    routes.push(route);
  
    const loadContent = async () => {
      try {
        const fetchHtml = fetch(htmlFile).then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
          return res.text();
        });
        const fetchCss = cssFile
          ? fetch(cssFile).then(res => {
              if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
              return res.text();
            })
          : Promise.resolve('');
  
        const [html, css] = await Promise.all([fetchHtml, fetchCss]);
  
        route.render = html;
        route.css = css;
        route.loaded = true;
  
        if (window.location.pathname === path) {
          syncAllPanels();
        }
      } catch (error) {
        console.error(`Failed to load route ${path}:`, error);
        route.render = `<div style="padding: 24px; color: var(--colorPaletteRedForeground1);">加载失败：${error.message}</div>`;
        if (window.location.pathname === path) {
          syncAllPanels();
        }
      }
    };
  
    loadContent();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

window.openInBrowser = function(url) {
  fetch(`http://${window.API_URL || 'localhost:5477'}/api/commands/openUrl`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  .then(res => res.json())
  .then(data => console.log('Open URL success:', data))
  .catch(err => {
    console.error('Failed to open URL via API, fallback to window.open:', err);
    window.open(url, '_blank');
  });
};

