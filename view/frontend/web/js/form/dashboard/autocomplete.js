'use strict';

define(['jquery', 'Postcodes4uAddressLookup/model/apiLoadListener', 'Postcodes4uAddressLookup/model/postcodes4u/initializer', 'Postcodes4uAddressLookup/model/postcodes4u/strategy/default', 'Postcodes4uAddressLookup/model/address/addressData', 'Postcodes4uAddressLookup/model/address/addressFieldsMap', 'Postcodes4uAddressLookup/model/address/valueExtractor'], function ($, loadListener, Initializer, Strategy, addressData, addressFieldsMap, valueExtractor) {
    var addressFinder = document.getElementById('address_finder');
    var country = document.getElementById('country');
    var form = addressData.addForm('address');

    form.country($(country).val());

    country.addEventListener('change', function (event) {
        var el = event.target;
        form.country(el.options[el.selectedIndex].value);
        addressFinder.value = '';
    }, false);

    form.address.subscribe(function (address) {
        var $inputs = $('[data-address-fieldset]').find('[data-autocomplete]');

        var autocompleteField = function autocompleteField(index, el) {
            var id = el.getAttribute('id');
            if (addressFieldsMap.map[id]) {
                $(el).val(valueExtractor(address, addressFieldsMap.map[id]));
            }
        };

        $inputs.each(autocompleteField);
    });

    if (!loadListener.isPostcodes4uApiLoaded()) {
        loadListener.subscribe(function (isApiLoaded) {
            if (isApiLoaded) {
                new Initializer(addressFinder, Strategy, 'address');
            }
        });
    } else {
        new Initializer(addressFinder, Strategy, 'address');
    }
});
//# sourceMappingURL=autocomplete.js.map
