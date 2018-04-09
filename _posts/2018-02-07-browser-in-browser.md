---
layout: post
authors: [ivo_woltring]
title: 'Browser In Browser'
image: /img/blogs/2018/browser-in-browser/browser-in-browser_1.jpg
tags: [Web, Browser, Privacy, Internet, Docker, Apache guacamole, Justbecauseican]
category: Docker
comments: true
---


![browser-in-browser_1](/img/blogs/2018/browser-in-browser/browser-in-browser_1.jpg)

This project gives you a browser in a browser.

Yes its true :-)

<!-- more -->

# Why

Well sometimes you just want some privacy as you do not trust the network you are on.
An option is to use an isolated browser on another network of your choosing. 

And... well it was a kind of a challenge. A Colleague of mine asked me of I knew of a browser on the Synology NAS (DSM software).
I didn't, but it set me to thinking. Could I? Would I? Should I?

Hell yes, to all three questions 😂.

Challenge accepted....

# How

Read on...

## Whats needed

* A Synology NAS with docker enabled
* The [ivonet/chromium-browser:1.0.1](http://ivo2u.nl/Yt) docker image
* Your own domain you can manage
* An apache (or other) proxying Virtual host
* LetsEncrypt as the Certificate Authority (CA)

## Creating the docker image

As I wanted to have a gui based browser in my browser fully capable of the modern technology I thought of Firefox and Chrome.
But how to get them into Docker as gui applications?

Luckily I had already done something like that before with the [ivonet/robotframework-ride](http://ivo2u.nl/YY) docker image.
I used [Apache Guacamole](https://guacamole.apache.org/) as a clientless remote desktop gateway.

Dockerile:

```dockerfile
FROM hurricane/dockergui:x11rdp1.3
MAINTAINER IvoNet <webmaster@ivonet.nl>
# User/Group Id gui app will be executed as default are 99 and 100
ENV USER_ID=99
ENV GROUP_ID=100
# Default resolution, change if you like
ENV WIDTH=1280
ENV HEIGHT=720
# Use baseimage-docker's init system
CMD ["/sbin/my_init"]

RUN echo 'deb http://archive.ubuntu.com/ubuntu trusty main universe restricted' > /etc/apt/sources.list && \
    echo 'deb http://archive.ubuntu.com/ubuntu trusty-updates main universe restricted' >> /etc/apt/sources.list && \
    export DEBCONF_NONINTERACTIVE_SEEN=true DEBIAN_FRONTEND=noninteractive && \
    apt-get update && \
    apt-get install -y chromium-browser

WORKDIR /nobody
RUN mkdir -p /etc/my_init.d && \
    mkdir -p /nobody/.config/pulse && \
    echo 'admin ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
ADD firstrun.sh /etc/my_init.d/firstrun.sh
RUN chmod +x /etc/my_init.d/firstrun.sh

# Copy X app start script to right location
COPY startapp.sh /startapp.sh

ENV EDGE="0"
ENV APP_NAME="Chromium browser"
ENV START_URL="https://duckduckgo.com/"
ENV HOME /nobody
VOLUME ["/nobody"]
EXPOSE 3389 8080
```

firstrun.sh:

```bash
#!/bin/bash

[[ -f /tmp/.X1-lock ]] && rm /tmp/.X1-lock && echo "X1-lock found, deleting"

if [ ! "$EDGE" = "1" ]; then
  echo "EDGE not requested, keeping current version"
else
  echo "EDGE requested, updating to latest version"
  echo "This may take a couple of minutes..."
  apt-get install --only-upgrade -y chromium-browser
  echo "Upgrade finished."
fi

echo "Commencing boot..."

```

startapp.sh:
```bash
#!/bin/sh
while true
do
   /usr/bin/chromium-browser $START_URL
done
```

Build and push the image and then you can run it from the NAS or locally.

Example:

```bash
docker run -d \ 
           --rm \
           --privileged \
           --name chrome \
           -p 8080:8080 \
           ivonet/chromium-browser:1.0.1
```

## DNS entry

I have my own domain (in this example ivonet.nl) and have full access to configure it as I like. I added a new `CNAME` record for browser.ivonet.nl
pointing it at the `A` record (ip address) of my server. If you want to know more about this leave me a comment and I might expand on it.

## Router

I host my site at home so I have to tell my router to route all traffic on port 80 and 443 to my server so it can be picked up
by my apache server software

## Apache

I use Apache2 because I have been using it for many years and am to lazy to change all my configs. So if you want to do it with nginx or any other
server it is fully possible, but you have to find out for yourself.

I created two VirtualHost. 1 for the http and 1 for https.

/etc/apache2/sites-available/browser.ivonet.nl.conf:

```text
<VirtualHost *:80>
    ServerName browser.ivonet.nl

    RewriteEngine on
    RewriteCond %{SERVER_NAME} =browser.ivonet.nl
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
</VirtualHost>
```

/etc/apache2/sites-available/browser.ivonet.nl.ssl.conf:

```text
<VirtualHost *:443>
    ServerName browser.ivonet.nl

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/browser.ivonet.nl/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/browser.ivonet.nl/privkey.pem

    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    ProxyRequests Off
    ProxyPreserveHost On
    ProxyPass / http://YOUR_NAS_IP_HERE:THE_PORT_YOU_EXPOSED_IN_DOCKER/
    ProxyPassReverse / http://YOUR_NAS_IP_HERE:THE_PORT_YOU_EXPOSED_IN_DOCKER/
    RewriteEngine On

    <Location />
        AuthType Basic
        AuthName "Admin only!"
        AuthUserFile /etc/apache2/passwd/browser
        Require valid-user

        Satisfy any
        Order deny,allow
        Deny  from all

        SSLRequireSSL
    </Location>

    ErrorLog /var/log/apache2/browser-error.log
    LogLevel info
    CustomLog /var/log/apache2/access.log combined
</VirtualHost>
```

* Use `a2ensite` to enable the VirtualHost files and `service apache2 reload` to active them.

## LetsEncrypt certificates

I don't want to work with self signed certificates anymore as there is a completely free signed version available nowadays. 

These VirtualHost files are actually the end product as here you already have the basic authentication and LetsEncrypt enabled.
In the first version I created these files but disabled basic auth (giving LetsEncrypt the option to verify my ownership) and enabled
SSL but with the apache default certificates (unverified) I let LetsEncrypt change the config to make it work with LetsEncrypt.

If you want to read more about this you can read this article I co-wrote for the Dutch [Java Magazine](http://ivo2u.nl/Yg). Oh,
Sorry it is in Dutch... google translate 😂 or go to [letsencrypt.org](https://letsencrypt.org/). 

/opt/letsencrypt/configs/browser.ini:

```text
rsa-key-size = 4096
server = https://acme-v01.api.letsencrypt.org/directory
email = webmaster@example.nl
domains = browser.example.nl
text = True
authenticator = apache
```

And activate the certificate. I had some trouble making this work but this command made it work for me:

```bash
certbot --authenticator standalone \
        --installer apache \
        --pre-hook "service apache2 stop" \
        --post-hook "service apache2 start" \
        --config /opt/letsencrypt/configs/browser.ini \
        --agree-tos
```
 
Now enable the basic authentication again in the VirtualHost file and create a browser password file:

```bash
sudo htpasswd -c /etc/apache2/passwd/browser USERNAME
```

# Conclusion

I think I lost the challenge if it had to run as a window in the dsm dashboard (Synology software) alone. 
But I go for the spirit of the challenge (I am writing the rulez as I go so suck it up 😂).

It works fine! By going to the url I specified I now get a Browser in a Browser. Anything I do in that browser goes over my home network which is much better at protecting my privacy than other networks (read more [here](http://ivo2u.nl/5H)).

Oh and of course I have no sound in the B-in-B but... uch.

Nice challenge 🖖, had fun...


# Reference 

* The [github](http://ivo2u.nl/Y5) project for this docker image 


# Feedback

If you have other solutions or ideas just leave a comment...
Always appreciated.








        
