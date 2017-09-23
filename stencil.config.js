exports.config = {
  bundles: [
    { components: ['stencil-bootstrap-demo', 'alerts-page', 'scb-alert'] },
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
