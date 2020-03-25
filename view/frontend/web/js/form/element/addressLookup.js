'use strict';

define(['ko', 'Magento_Ui/js/form/element/abstract', 'Postcodes4uAddressLookup/model/apiLoadListener', 'Postcodes4uAddressLookup/model/postcodes4u/initializer', 'Postcodes4uAddressLookup/model/postcodes4u/strategy/default', 'Postcodes4uAddressLookup/model/address/addressData'], function (ko, Element, loadListener, Initializer, Strategy, addressData) {
    'use strict';

    return Element.extend({
        onElementRender: function onElementRender(el) {
            var _this2 = this;

            if (!loadListener.isPostcodes4uApiLoaded()) {
                loadListener.subscribe(function (isApiLoaded) {
                    if (isApiLoaded) {
                        _this2.initializer = new Initializer(el, Strategy, _this2.autocomplete_id);
                    }
                });
            } else {
                this.initializer = new Initializer(el, Strategy, this.autocomplete_id);
            }
        },
        initialize: function initialize() {
            var _this3 = this;

            this._super();
            this.isShowDetails = addressData.getForm(this.autocomplete_id).isShowDetails;
            this.value = ko.observable('');

            addressData.getForm(this.autocomplete_id).country.subscribe(function () {
                _this3.value('');
            });

            return this;
        },
        toggleAddressData: function toggleAddressData(data, evt) {
            evt.preventDefault();
            addressData.getForm(this.autocomplete_id).isShowDetails(true);
        },
        findAddress: function findAddress(data, evt) {
            var addressId = this.autocomplete_id;
            var strUrl = "",
                _this = jQuery;
            var zipEnter = document.getElementById('lookup').value;
            if (!zipEnter) {
                _this('.show_address').html('Please enter postcode!');
                _this('.show_address').css('color', 'red');
            } else {
                //Start loader
                _this('body').loader('show');
                strUrl = "https://services.3xsoftware.co.uk/Search/ByPostcode/json?username=" + encodeURI(window.UserName) + "&key=" + encodeURI(window.ApiKey) + "&postcode=" + encodeURI(zipEnter);
                _this.ajax({
                    url: strUrl,
                    type: 'GET',
                    dataType: 'jsonp',
                    cors: true,
                    contentType: 'application/json',
                    secure: true,
                    showLoader: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    beforeSend: function beforeSend(xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(""));
                    },
                    success: function success(data) {
                        var ul = _this('<ul>', { 'class': 'address-ul' });
                        _this('.show_address').empty();
                        if (data.Error && data.Error.Cause) {
                            _this('<li>', {
                                'id': 'error',
                                'class': 'address-li'
                            }).text(data.Error.Cause + data.Error.Resolution ? ': ' + data.Error.Resolution : '').appendTo(ul);
                        } else if (data.Summaries && data.Summaries.length > 0) {
                            _this.each(data.Summaries, function () {
                                _this('<li>', {
                                    'id': this.Id,
                                    'class': 'address-li',
                                    'onclick': "return checkoutAddress('" + this.Id + "','" + addressId + "')"
                                }).text(this.StreetAddress + ', ' + this.Place).appendTo(ul);
                            });
                        } else {
                            _this('<li>', {
                                'id': 'error',
                                'class': 'address-li'
                            }).text('Error: No results found').appendTo(ul);
                        }
                        _this(ul).appendTo('.show_address');
                        _this('body').loader('hide');
                        evt.preventDefault();
                        addressData.getForm(addressId).isShowDetails(true);
                    },
                    error: function error(data) {
                        _this(data).appendTo('.show_address');
                        _this('body').loader('hide');
                        console.error(data);
                    }
                });
            }
        }
    });
});
//# sourceMappingURL=addressLookup.js.map
