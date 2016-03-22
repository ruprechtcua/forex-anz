'use strict';

/* global define:true*/
define(['jquery', 'knockout', '../models/base_term_request', '../services/rates'], function($, $ko, $BaseTermRequest, $Service) {
    return function() {
        var self = this;

        self.error = $ko.observable('');

        //default value is set to AUDUSD with $1
        self.request = new $BaseTermRequest('AUD', 'USD', 1, 0);

        //init config data
        $Service.fetchCurrencyRates(function(rates) {
            self.currencyRates = rates;
        });

        $Service.fetchCurrencyDecimalFormat(function(formats) {
            self.currencyFormats = formats;
            $('#rbase').typeahead({
                source: Object.keys(formats),
                minLength: 0
            });
            $('#rterm').typeahead({
                source: Object.keys(formats),
                minLength: 0
            });
            //self.computeRate();
            self.output = $ko.computed(function() {
                var rate = self.currencyRates[self.request.base() + self.request.term()];
                if (rate) {
                    var amount = self.request.baseAmount() * rate;
                    self.request.termAmount(parseFloat(Math.floor(amount * 100) / 100).toFixed(self.currencyFormats[self.request.term()]));
                    self.error('');
                } else {
                    self.error('Unable to find rate for ' + self.request.base() + '/' + self.request.term());
                }
            }, this);
        });

    };
});