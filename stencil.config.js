exports.config = {
  bundles: [{
      components: ['stencil-bootstrap-demo', 'alerts-page', 'scb-alert']
    },
    {
      components: ['badge-page', 'scb-badge']
    },
    {
      components: ['breadcrumb-page', 'scb-breadcrumb']
    },
    {
      components: ['list-page', 'scb-list']
    },
  ],
  collections: [{
    name: '@stencil/router'
  }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}