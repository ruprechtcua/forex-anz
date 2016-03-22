'use strict';

/* global define:true*/
define(['jquery','knockout'], function ($, $ko) {
  return function (base, term, baseAmount, termAmount) {
    var self = this;

    self.base = $ko.observable(base);
    self.term = $ko.observable(term);
    self.baseAmount = $ko.observable(baseAmount);
    self.termAmount = $ko.observable(termAmount);
  };
});
