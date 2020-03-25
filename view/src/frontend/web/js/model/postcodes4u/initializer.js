
define([
    'Postcodes4uAddressLookup/model/address/addressData',
], function (addressData) {
    "use strict";

    class Initializer {
        /**
         * @param {element} el
         * @param Strategy
         * @param {string} scope
         * @param {bool} init
         */
        constructor(el, Strategy, scope, init = true) {
            this.el = el;
            this.Strategy = Strategy;
            this.form =  addressData.getForm(scope);
        }

        /**
         * @param {object} instance
         */
        fillInAddress(instance) {
            const strategy = new this.Strategy(place);
            const newAddressData = strategy.getAddressData();

            if (newAddressData) {
                this.form.address(newAddressData);
                this.form.isShowDetails(true);
            }
        }
    }

    return Initializer;
});
