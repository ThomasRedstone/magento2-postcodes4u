
define([
    'ko',
    'Magento_Ui/js/form/components/group',
    'Postcodes4uAddressLookup/model/address/addressData'
], function (ko, Element, addressData) {
    "use strict";

    return Element.extend({
        initialize: function () {
            this._super();
            this.visible(false);
            this.template = 'ThreeXSoftware_Postcodes4uAddressLookup/form/element/group';

            addressData.getForm(this.autocomplete_id).isShowDetails.subscribe((isEnterManually) => {
                this.visible(isEnterManually);
            });

            return this;
        }
    });
});
