FROM alpine:3.16.4

ARG JWT_PASSPHRASE
ARG JWT_SECRET_KEY
ARG JWT_PUBLIC_KEY


RUN apk add --update --no-cache \
    coreutils \
    php8 \
    php8-fpm \
    php8-apcu \
    php8-ctype \
    php8-curl \
    php8-dom \
    php8-gd \
    php8-iconv \
    php8-json \
    php8-phar \
    php8-sodium \
    php8-intl \
    php8-fileinfo\
    php8-mbstring \
    php8-opcache \
    php8-openssl \
    php8-pdo \
    php8-pdo_mysql \
    php8-mysqli \
    php8-xml \
    php8-zlib \
    php8-phar \
    php8-tokenizer \
    php8-session \
    php8-simplexml \
    php8-xdebug \
    php8-zip \
    php8-xmlwriter \
    make \
    curl \
    openssl

RUN mkdir /keys
RUN openssl genrsa -passout pass:${JWT_PASSPHRASE} -out ${JWT_SECRET_KEY} -aes256 4096
RUN openssl rsa -passin pass:${JWT_PASSPHRASE} -pubout -in ${JWT_SECRET_KEY} -out ${JWT_PUBLIC_KEY}
RUN chmod 644 $JWT_PUBLIC_KEY ${JWT_SECRET_KEY}

RUN echo "$(curl -sS https://composer.github.io/installer.sig) -" > composer-setup.php.sig \
        && curl -sS https://getcomposer.org/installer | tee composer-setup.php | sha384sum -c composer-setup.php.sig \
        && php composer-setup.php && rm composer-setup.php* \
        && chmod +x composer.phar && mv composer.phar /usr/bin/composer

COPY symfony.ini /etc/php8/conf.d/
COPY symfony.ini /etc/php8/cli/conf.d/
COPY xdebug.ini  /etc/php8/conf.d/

COPY symfony.pool.conf /etc/php8/php-fpm.d/

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

WORKDIR /var/www/api

ENTRYPOINT ["sh", "/entrypoint.sh"]

CMD ["php-fpm8", "-F"]

EXPOSE 9001
