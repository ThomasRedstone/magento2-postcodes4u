<?php
/**
 * @package  ThreeXSoftware\Postcodes4uAddressLookup
 */

namespace ThreeXSoftware\Postcodes4uAddressLookup\Block\Checkout;

use Magento\Checkout\Block\Checkout\LayoutProcessorInterface;

/**
 * Class LayoutProcessor
 */
class LayoutProcessor implements LayoutProcessorInterface
{
    /**
     * @var PostcodeLookupConfigurationResolver
     */
    protected $configResolver;

    /**
     * @var array
     */
    protected $paymentsList;

    /**
     * @var array
     */
    protected $addressFields = [];

    /**
     * @var array
     */
    protected $fieldsConfig;

    /**
     * LayoutProcessor constructor.
     *
     * @param PostcodeLookupConfigurationResolver $configurationResolver
     * @param array $fieldsConfig
     */
    public function __construct(PostcodeLookupConfigurationResolver $configurationResolver, $fieldsConfig = [])
    {
        $this->configurationResolver = $configurationResolver;
        $this->fieldsConfig = $fieldsConfig;
    }

    /**
     * Process js Layout of block
     *
     * @param array $layout
     *
     * @return array
     */
    public function process($layout)
    {
        if (false === $this->configResolver->getIsEnabled()) {
            return $layout;
        }

        $this->addressFields = &$layout['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset'];
        $this->paymentsList = &$layout['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['payments-list']['children'];

        $this->processShippingAddress();
        $this->processBillingAddress();

        return $layout;
    }

    /**
     * Processing shipping address layout
     *
     * @return void
     */
    protected function processShippingAddress()
    {
        $this->updateStreetFields($this->addressFields['children']['street'], 'shippingAddress');

        foreach ($this->fieldsConfig as $fieldName => $config) {
            $field = &$this->addressFields['children'][$fieldName];
            $this->configureField($field, 'shippingAddress', $config);
        }
    }

    /**
     * Processing billing address layout
     *
     * @return void
     */
    protected function processBillingAddress()
    {
        // Unlike in shipping address, on billing address there is a lot of different billing forms.
        // Each of these forms must be processed.
        foreach ($this->paymentsList as &$payment) {
            foreach ($this->fieldsConfig as $fieldName => $config) {
                if (!isset($payment['children']['form-fields'])) {
                    continue;
                }

                if ('region' === $fieldName) {
                    $payment = $this->copyRegionLayoutFromShippingAddress($payment, $fieldName);
                }

                $field = &$payment['children']['form-fields']['children'][$fieldName];
                $this->configureField($field, 'billingAddress', $config);

                if ('street' === $fieldName) {
                    $this->updateStreetFields($field, 'billingAddress');
                }
            }
        }
    }

    /**
     * @param array $streetField
     * @param string $scope
     *
     * @return void
     */
    protected function updateStreetFields(array &$streetField, string $scope)
    {
        foreach ($streetField['children'] as &$input) {
            $input['component'] = 'ThreeXSoftware_Postcodes4uAddressLookup/js/form/element/input';
            $input['autocomplete_id'] = $scope;
        }

        /**
         * There is a bug in Magento with inconsistency in validation of streets
         * in address modal and first address form.
         * In address form all street fields[$i > 0] are required but on modal only the first one.
         * This solution fix this gap.
         */
        $streetCount = count($streetField['children']);

        for ($i = 1; $i <= $streetCount; $i++) {
            $streetField['children'][$i]['validation']['min_text_length'] = 0;
        }
    }

    /**
     * @param mixed $field
     * @param string $scope
     * @param array $config
     *
     * @return $this
     */
    protected function configureField(&$field, string $scope, array $config = [])
    {
        $field = is_array($field) ? $field : [];
        $field = array_merge($field, $config);
        $field['autocomplete_id'] = $scope;

        return $this;
    }

    /**
     * @param array $payment
     * @param string$fieldName
     *
     * @return array
     */
    protected function copyRegionLayoutFromShippingAddress(array $payment, string $fieldName): array
    {
        $region = $this->addressFields['children']['region'];
        $payment['children']['form-fields']['children'][$fieldName] = $region;

        return $payment;
    }
}
