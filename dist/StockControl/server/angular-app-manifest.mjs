
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
      "chunk-NDJ5SDUV.js"
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
    'index.csr.html': {size: 28522, hash: '9a4e729dbdcb774f5c808f811efe98f088d4d3f42c068a4be9b160d77ba91112', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 20960, hash: '18411dcdeb8922597311f16e82e5d41b6e9a37ae390b8a6d62f36af4d2b01997', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-YPKFWAKN.css': {size: 8116, hash: 'gOIXaI3MvxA', text: () => import('./assets-chunks/styles-YPKFWAKN_css.mjs').then(m => m.default)}
  },
};
