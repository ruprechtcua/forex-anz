'use strict';

/* global define:true*/
/* global window:true*/
define(['jquery'], function($) {

    var rates_url = 'config/currency_rates.json',
        formats_url = 'config/currency_formats.json';

    function crossRates(rates, from, to) {
        var baseList = [],
            termList = [],
            cStack = [];

        var rate = rates[from + to];
        if (rate) {
            cStack.push(rate);
            return cStack;
        }

        $.each(rates, function(index, data) {
            if (data.from == from) {
                baseList.push(data);
                return true;
            }
            if (data.to == to) {
                termList.push(data);
                return true;
            }
        });

        //loop to candidates and find match
        if (baseList.length !== 0 && termList.length !== 0) {
            for (var i = 0, length = baseList.length; i < length; i++) {
                var fromData = baseList[i];

                for (var j = 0, jlength = termList.length; j < jlength; j++) {
                    var toData = termList[j];
                    if (fromData.to === toData.from) {
                        cStack.push(fromData);
                        cStack.push(toData);
                        return cStack;
                    }
                }
            }

            if (baseList.length == 1 && termList.length == 1) {
                var mid = rates[baseList[0].to + termList[0].from];
                cStack.push(baseList[0]);
                cStack.push(mid);
                cStack.push(termList[0]);
                return cStack;
            }

        }

        return cStack;
    }

    return {
        fetchCurrencyRates: function(callback) {
            //$.getJSON(rates_url, function(data) {
                var data = window.currency_rates;

                var currencies = {},
                    rates = {};

                //Step 1: transform & reverse data   
                $.each(data, function(index, value) {
                    var base = value.code.substr(0, 3),
                        term = value.code.substr(3, 6);

                    currencies[base] = '';
                    currencies[term] = '';

                    //transform data
                    rates[base + term] = {
                        from: base,
                        to: term,
                        rate: value.rate
                    };

                    //transform reverse data
                    rates[term + base] = {
                        from: term,
                        to: base,
                        rate: 1 / value.rate
                    };
                });

                //Step 2: loop through all possible currencies conversion and compute rate
                var cList = Object.keys(currencies),
                    currencyRates = {};

                $.each(cList, function(i1, base) {
                    $.each(cList, function(i2, term) {
                        if (base !== term) {
                            var stack = crossRates(rates, base, term),
                                actualRate = 1;
                            $.each(stack, function(index, data) {
                                actualRate = actualRate * data.rate;
                            });

                            currencyRates[base + term] = actualRate;
                        }
                    });
                });

                callback(currencyRates);
            //});
        },
        fetchCurrencyDecimalFormat: function(callback) {
            var data = window.currency_formats;
            //$.getJSON(formats_url, function(data) {
                callback(data);
            //});
        }
    };
});