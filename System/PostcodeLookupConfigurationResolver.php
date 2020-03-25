<?php
/**
 * @package  ThreeXSoftware\Postcodes4uAddressLookup
 */

namespace ThreeXSoftware\Postcodes4uAddressLookup\System;

use Magento\Framework\App\Config\ScopeConfigInterface;

/**
 * Class ConfigResolver
 */
class PostcodeLookupConfigurationResolver
{
    const PATH_IS_ENABLED = 'threexsoftware_sales/autocomplete/enable';
    const PATH_API_KEY = 'threexsoftware_sales/autocomplete/api_key';
    const USERNAME = 'threexsoftware_sales/autocomplete/username';
    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * ConfigResolver constructor.
     *
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(ScopeConfigInterface $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * @return bool
     */
    public function getIsEnabled(): bool
    {
        return $this->scopeConfig->getValue(self::PATH_IS_ENABLED) === '1';
    }

    /**
     * @return string
     */
    public function getApiKey(): string
    {
        return $this->scopeConfig->getValue(self::PATH_API_KEY);
    }
    
    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->scopeConfig->getValue(self::USERNAME);
    }
}
