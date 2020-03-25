'use strict';

define(['ko', 'Magento_Ui/js/form/element/select', 'Postcodes4uAddressLookup/model/address/addressData', 'jquery'], function (ko, Element, addressData, $) {
    "use strict";

    return Element.extend({
        initialize: function initialize() {
            var _this = this;

            this._super();
            window.autocomplete_id = this.autocomplete_id;
            this.form = addressData.getForm(this.autocomplete_id);
            this.form.country(this.value());
            this.value.subscribe(function (value) {
                _this.form.country(value);
            });
            console.log('setting up country select');

            this.value.subscribe(function (country) {
                console.log('got value from subscribe');
                console.log({ country: country });
                var api = $('.postcodeApi');
                country === 'GB' ? api.show() : api.hide() && $('.address-manual').trigger('click');
                window.country = country;
            });

            return this;
        }
    });
});
//# sourceMappingURL=countrySelect.js.map
