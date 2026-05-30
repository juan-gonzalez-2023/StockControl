
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "preload": [
      "chunk-Y6R7XTYG.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-JFGSI3ZU.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 1,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28522, hash: '0451149bc3d49a82889109afb787fb2a510d3b88db12023b5a30c42cb3c644f9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 20960, hash: '4ca787acffd411973ec00b683479f4fb35883bff0ea6b81bfced110b1ed3e34b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-YPKFWAKN.css': {size: 8116, hash: 'gOIXaI3MvxA', text: () => import('./assets-chunks/styles-YPKFWAKN_css.mjs').then(m => m.default)}
  },
};
