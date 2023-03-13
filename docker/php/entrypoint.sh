#!/bin/bash
set -e

# Install / update dependencies
composer install
composer update

# Migrate / update database
#php bin/console make:migration
#php bin/console doctrine:migrations:migrate

exec "$@"
