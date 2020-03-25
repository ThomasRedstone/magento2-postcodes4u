
define(['ko'], function(ko) {
    "use strict";

    /**
     * Api load listener is updated after the Postcodes4uAutocomplete script is loaded
     */
    class ApiLoadListener {
        constructor() {
            this.isPostcodes4uApiLoaded = ko.observable(false);
        }
        /**
         * @callback callback
         */
        subscribe(callback) {
            this.isPostcodes4uApiLoaded.subscribe(callback);
        }
    }

    return new ApiLoadListener();
});
