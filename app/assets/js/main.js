'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    '../../assets/js/controllers/app.js',
    'jquery.bootstrap',
    'bootstrap3.typeahead'
    ], function ($, ko, App) {

  var UI = new App();

  ko.applyBindings(UI);

});
