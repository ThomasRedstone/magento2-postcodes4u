'use strict';

define(['ko', 'Magento_Ui/js/form/components/group', 'Postcodes4uAddressLookup/model/address/addressData'], function (ko, Element, addressData) {
    "use strict";

    return Element.extend({
        initialize: function initialize() {
            var _this = this;

            this._super();
            this.visible(false);
            this.template = 'ThreeXSoftware_Postcodes4uAddressLookup/form/element/group';

            addressData.getForm(this.autocomplete_id).isShowDetails.subscribe(function (isEnterManually) {
                _this.visible(isEnterManually);
            });

            return this;
        }
    });
});
//# sourceMappingURL=group.js.map
