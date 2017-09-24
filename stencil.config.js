exports.config = {
  bundles: [
    { components: ['stencil-bootstrap-demo', 'alerts-page', 'scb-alert'] },
    { components: ['badge-page', 'scb-badge'] },
    { components: ['breadcrumb-page', 'scb-breadcrumb'] },
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
