---
layout: post
authors: [ivo_woltring]
title: 'Make Your Own Docker Base Image'
intro: This blog is about how to create your own base image for docker.
image: /img/blogs/2018/make-your-own-docker-base-image/build.png
tags: [docker, containerization, image]
category: docker
comments: true
---

![build]()/img/blogs/2018/make-your-own-docker-base-image/build.png)

This blog is about how to create your own base image for docker.
From a security standpoint it might be a good idea to base all your images on your own base image.
I have been wanting to create my own base image for some time now and today I finally made it happen :-)

I am curious as to why you would want to have your own base image...

<!-- more -->

# First Method

In order to create a base image you need a root file system. After a lot of searching I found a script on the moby [github](https://github.com/moby/)
with some instructions on how to create your own image. 
I tried it out and immediately encountered a problem. I was trying to do this on a Macbook Pro.

A command (`apk.static` ) used in the script is not recognised by OSX. So I needed to hack a bit to get it to work on my mac.
Luckily Docker came to the rescue 😄! In order build my own root file system based on alpine I had to adjust the script to build the image with an image.
I just love docker 😂.

Below you can see the complete script (for the impatient) but here is the breakdown:

```bash
tmp() {
	rm -rf $(pwd)/tmp 2>/dev/null
	TMP=${TMP_DIR}/alpine-docker-${REL}-${ARCH}
	mkdir -p ${TMP}
	ROOTFS=${TMP_DIR}/alpine-docker-rootfs-${REL}-${ARCH}
	mkdir -p ${ROOTFS}
	trap "rm -rf $TMP_DIR" EXIT TERM INT
}
```

This method will create a temp folder and a rootfs folder which will be removed after the run has completed
the variables are provided in the script or through command-line parameters.


```bash

apkv() {
	curl -sSL $MAINREPO/$ARCH/APKINDEX.tar.gz | tar -Oxz |
		grep --text '^P:apk-tools-static$' -A1 | tail -n1 | cut -d: -f2
}

getapk() {
	curl -sSL $MAINREPO/$ARCH/apk-tools-static-$(apkv).apk | tar -xz -C $TMP sbin/apk.static
}
```

the `apkv` method will retrieve the apk version of the release you are trying to build and the `getapk` will download it to
the temp folder as `apk.static`


```bash
mkbase() {
    chmod 777 $ROOTFS
	docker run --privileged --rm -v ${TMP}:/apkstatic -v ${ROOTFS}:/rootfs alpine:3.7 \
	   /apkstatic/sbin/apk.static \
	   --repository $MAINREPO \
	   --update-cache \
	   --allow-untrusted \
	   --root /rootfs \
	   --initdb add alpine-base
}
```
This `mkbase` method builds the base image in the temporary root file system folder created in the `tmp` method with docker.
Docker is used to run `apk.static` on a macbook. Docker mounts the temp folders needed to build into the image as volumes and gives the
`apk.static` command all the parameters needed to build a base alpine file system. When finished the docker container is cleaned (`--rm`)

 
```bash
conf() {
	printf '%s\n' $MAINREPO > $ROOTFS/etc/apk/repositories
	printf '%s\n' $ADDITIONALREPO >> $ROOTFS/etc/apk/repositories
}

pack() {
	local id
	id=$(tar --numeric-owner -C $ROOTFS -c . | docker import - ivonet/alpine:$REL)

	docker tag $id ivonet/alpine:latest
	docker run -it --rm ivonet/alpine printf 'ivonet/alpine:%s with id=%s created!\n' $REL $id
}

```

the `conf` method makes sure that the repo is added to the repository list of apk in the temporary root filesystem
and the `pack` method gives docker the command to create an ivonet/alpine:VERSION image and to tag it as the latest and to test it
by letting the just created docker image print some status information.
 

```bash
save() {
	[ $SAVE -eq 1 ] || return 0

	tar --numeric-owner -C $ROOTFS -c . | xz > alpine-rootfs-${REL}-${ARCH}.tar.xz
}
```

the `save` method freezes the temporary root filesystem to a tarball for potential reuse.

## Complete script

```bash
#!/bin/sh

set -e

[ $(id -u) -eq 0 ] || {
	printf >&2 '%s requires root\n' "$0"
	exit 1
}

usage() {
	printf >&2 '%s: [-r release] [-m mirror] [-s] [-c additional repository] [-a arch]\n' "$0"
	exit 1
}

tmp() {
	rm -rf $(pwd)/tmp 2>/dev/null
	TMP=${TMP_DIR}/alpine-docker-${REL}-${ARCH}
	mkdir -p ${TMP}
	ROOTFS=${TMP_DIR}/alpine-docker-rootfs-${REL}-${ARCH}
	mkdir -p ${ROOTFS}
	trap "rm -rf $TMP_DIR" EXIT TERM INT
}

apkv() {
	curl -sSL $MAINREPO/$ARCH/APKINDEX.tar.gz | tar -Oxz |
		grep --text '^P:apk-tools-static$' -A1 | tail -n1 | cut -d: -f2
}

getapk() {
	curl -sSL $MAINREPO/$ARCH/apk-tools-static-$(apkv).apk | tar -xz -C $TMP sbin/apk.static
}

mkbase() {
    chmod 777 $ROOTFS
	docker run --privileged --rm -v ${TMP}:/apkstatic -v ${ROOTFS}:/rootfs alpine:3.7 \
	   /apkstatic/sbin/apk.static \
	   --repository $MAINREPO \
	   --update-cache \
	   --allow-untrusted \
	   --root /rootfs \
	   --initdb add alpine-base
}

conf() {
	printf '%s\n' $MAINREPO > $ROOTFS/etc/apk/repositories
	printf '%s\n' $ADDITIONALREPO >> $ROOTFS/etc/apk/repositories
}

pack() {
	local id
	id=$(tar --numeric-owner -C $ROOTFS -c . | docker import - ivonet/alpine:$REL)

	docker tag $id ivonet/alpine:latest
	docker run -it --rm ivonet/alpine printf 'ivonet/alpine:%s with id=%s created!\n' $REL $id
}

save() {
	[ $SAVE -eq 1 ] || return 0

	tar --numeric-owner -C $ROOTFS -c . | xz > alpine-rootfs-${REL}-${ARCH}.tar.xz
}

while getopts "hr:m:sc:a:" opt; do
	case $opt in
		r)
			REL=$OPTARG
			;;
		m)
			MIRROR=$OPTARG
			;;
		s)
			SAVE=1
			;;
		c)
			ADDITIONALREPO=$OPTARG
			;;
		a)
			ARCH=$OPTARG
			;;
		*)
			usage
			;;
	esac
done

REL=${REL:-edge}
MIRROR=${MIRROR:-http://nl.alpinelinux.org/alpine}
SAVE=${SAVE:-0}
MAINREPO=$MIRROR/$REL/main
ADDITIONALREPO=$MIRROR/$REL/${ADDITIONALREPO:-community}
ARCH=${ARCH:-$(uname -m)}
TMP_DIR=$(pwd)/tmp/

tmp
getapk
mkbase
conf
pack
save
```

The code can also be found on [github](http://ivo2u.nl/Ya) 
	   
# Second method

When I had the above completely figured out I also had read some more on docker.com itself and found out that there is actually also a simpler way.
If you can find a root filesystem om the internet you can add it like this:

Dockerfile:

```Dockerfile
FROM scratch
ADD rootfs.tar.xz /
CMD ["/bin/sh"]
```

and build it with this command: `build -t ivonet/alpine:3.7 .`

Alpine has such images [here](https://alpinelinux.org/downloads/) if you look for the 'mini root filesystem'.

This is also why I created the `save` method in the script of the first method because that tarball can also be used in this method.

The nice thing about this method is that you can give it a default CMD.


# Third method

This one is done with an ubuntu image and is very short.

```bash
curl -s https://partner-images.canonical.com/core/bionic/current/ubuntu-bionic-core-cloudimg-i386-root.tar.gz | docker import - ivonet/ubuntu:18.04
```

will pull the current 18.04 LTS ubuntu release from internet and pipe it directly into a docker image.


The [github](http://ivo2u.nl/Yq) project for this method and more

# Discussion

If you like the post (or have objections) please let me know in the comments below. 
If you have a better way please also let me know.

Cheerz,
Ivo.        
