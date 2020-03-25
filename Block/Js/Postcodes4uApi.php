<?php

namespace ThreeXSoftware\Postcodes4uAddressLookup\Block\Js;

use Magento\Framework\View\Element\Template;

/**
 * Class Postcodes4uApi
 */
class Postcodes4uApi extends Template
{
    /**
     * @var array
     */
    private $fieldsMap;

    /**
     * @var PostcodeLookupConfigurationResolver
     */
    private $configurationResolver;

    /**
     * Postcodes4uApi constructor.
     *
     * @param Template\Context $context
     * @param PostcodeLookupConfigurationResolver $configurationResolver
     * @param array $fieldsMap
     * @param array $data
     */
    public function __construct(
        Template\Context $context,
        PostcodeLookupConfigurationResolver $configurationResolver,
        $fieldsMap = [],
        array $data = []
    ) {
        parent::__construct($context, $data);

        $this->fieldsMap = $fieldsMap;
        $this->configurationResolver = $configurationResolver;
    }

    /**
     * @return array
     */
    public function getFieldsMap()
    {
        return $this->fieldsMap;
    }

    /**
     * @return string
     */
    public function getApiKey()
    {
        return $this->configurationResolver->getApiKey();
    }

    /**
     * @return string
     */
    public function isEnabled()
    {
        return $this->configurationResolver->getIsEnabled();
    }
    
    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->configurationResolver->getUsername();
    }
}
