require.config({

  deps: ['main'],

  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/lodash/lodash',
    backbone: '../bower_components/backbone-amd/backbone',
    markdown: '../bower_components/markdown/lib/markdown',
    moment: '../bower_components/moment/moment',
    tpl: '../bower_components/requirejs-tpl/tpl',
    'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage'
  },

  shim: {
    markdown: {
      exports: 'markdown'
    }
  }

});
