'use strict';

require.config({
  paths: {
    'bower_components': '../../bower_components',
    'jquery': '../../bower_components/jquery/dist/jquery',
    'knockout.validation': '../../bower_components/knockout.validation/Dist/knockout.validation',
    'jquery.bootstrap': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
    'bootstrap3.typeahead':'../../bower_components/bootstrap3-typeahead/bootstrap3-typeahead'
  },
  shim: {
    'jquery.bootstrap': {
      deps: ['jquery']
    },
    'knockout.validation': {
      deps: ['knockout']
    }
  },
  map: {
    '*': {
      'knockout': '../../bower_components/knockout.js/knockout',
      'ko': '../../bower_components/knockout.js/knockout'
    }
  }
});

// Use the debug version of knockout in development only
/* global window:true*/
if (window.knockoutBootstrapDebug) {
  require.config({
    map: {
      '*': {
        'knockout': '../../bower_components/knockout.js/knockout.debug.js',
        'ko': '../../bower_components/knockout.js/knockout.debug.js'
      }
    }
  });
}

if (!window.requireTestMode) {
  require(['main'], function () { });
}


//JSON configs - used this over $.getJSON to make it work for this demo without having to run any servers
window.currency_rates = [{
    'code': 'AUDUSD',
    'rate': 0.8371
  },{
    'code': 'CADUSD',
    'rate': 0.8711
  },{
    'code': 'USDCNY',
    'rate': 6.1715
  },{
    'code': 'EURUSD',
    'rate': 1.2315
  },{
    'code': 'GBPUSD',
    'rate': 1.5683
  },{
    'code': 'NZDUSD',
    'rate': 0.7750
  },{
    'code': 'USDJPY',
    'rate': 119.95
  },{
    'code': 'EURCZK',
    'rate': 27.6028
  },{
    'code': 'EURDKK',
    'rate': 7.4405
  },{
    'code': 'EURNOK',
    'rate': 8.6651
  }
];

window.currency_formats = {
  'AUD': 2,
  'CAD': 2,
  'CNY': 2,
  'CZK': 2,
  'DKK': 2,
  'EUR': 2,
  'GBP': 2,
  'JPY': 0,
  'NOK': 2,
  'NZD': 2,
  'USD': 2
};
