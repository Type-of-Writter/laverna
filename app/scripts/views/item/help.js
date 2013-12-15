/*global define*/
/*global Mousetrap*/
define([
    'underscore',
    'jquery',
    'backbone',
    'marionette',
    'text!helpTempl',
    'Mousetrap'
], function ( _, $, Backbone, Marionette, Tmpl) {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: _.template(Tmpl),

        className: 'modal-dialog',

        events: {
            'click .cancelBtn'  : 'close'
        },

        initialize: function () {
            this.on('hidden', this.redirect);
            Mousetrap.reset();
        },

        serializeData: function() {
            return {
                collection: this.collection.toJSON(),
                shortcuts: this.collection.getConfigs()
            };
        },

        /**
         * Redirect
         */
        redirect: function () {
            var url = window.history;
            if (url.length === 0) {
                Backbone.history.navigate('/', {trigger: true});
            } else {
                url.back();
            }
            return false;
        },

        /**
         * Close
         */
        close: function (e) {
            if (e !== undefined) {
                e.preventDefault();
            }
            this.trigger('close');
        }

    });

    return View;
});
