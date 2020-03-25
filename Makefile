# Ensure that SSH keys are in place, and added to bitbucket before using these commands

publish: build commit push deploy

build:
	cd view && gulp js && cd ../

commit:
	git commit -am "stuff"

push:
	git push

deploy:
	ssh -t m2 'cd /opt/bitnami/apps/magento/htdocs/ && sudo composer update && \
	rm -rf /opt/bitnami/apps/magento/htdocs/generated/code/Magento && sudo ./bin/magento-cli setup:upgrade && \
	sudo ./bin/magento-cli cache:flush'

# This may be useful if we move towards production deployments, but this process isn't really for that...
# && \
#	sudo ./bin/magento-cli setup:static-content:deploy

install:
	ssh -t m2 'sudo /opt/bitnami/php/bin/composer.phar self-update && \
	cd /opt/bitnami/apps/magento/htdocs/ && \
	sudo composer config repositories.m2 vcs git@bitbucket.org:ThomasRedstone/m2-postcodes.git && \
	sudo composer require thomasredstone/m2-postcodes:dev-feature/rename-module && \
	sudo ./bin/magento-cli module:enable ThreeXSoftware_Postcodes4uAddressLookup && \
	sudo ./bin/magento-cli setup:upgrade && \
	sudo ./bin/magento-cli cache:flush'
