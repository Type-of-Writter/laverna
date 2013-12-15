/*global define*/
define([
    'underscore',
    'jquery',
    'backbone',
    'marionette',
    'bootstrap'
], function (_, $, Backbone) {
    'use strict';

    /**
     * Modal region
     * @source: http://lostechies.com/derickbailey/2012/04/17/managing-a-modal-dialog-with-backbone-and-marionette/
     */
    var ModalRegion = Backbone.Marionette.Region.extend({
        el: '#modal',

        constructor: function() {
            this.$window = $(window);
            _.bindAll(this);
            Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
            this.on('show', this.showModal, this);
        },

        getEl: function(selector) {
            var $el = $(selector);
            $el.on('hidden', this.close);
            return $el;
        },

        showModal: function(view) {
            view.on('close', this.hideModal, this);

            // Trigger shown event
            this.$el.on('shown.bs.modal', function () {
                view.trigger('shown');
            });

            // Trigger hidden event
            this.$el.on('hidden.bs.modal', function () {
                view.trigger('hidden');
                view.remove();
            });

            // Show modal window
            this.$el.modal({
                show     : true,
                backdrop : 'static',
                keyboard : true
            });

            // If url is changed we should close modal window
            this.$window.on('hashchange.modal', function () {
                view.trigger('close');
            });
        },

        hideModal: function() {
            this.$window.off('hashchange.modal');
            this.$el.modal('hide');
        }
    });

    return ModalRegion;
});
