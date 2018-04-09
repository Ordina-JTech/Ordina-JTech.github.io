---
layout: post
authors: [ivo_woltring]
title: 'Testing Containers with TestContainers: There and Back Again'
image: /img/blogs/default-blog.png
tags: [OOW17, Java]
category: JavaOne2017
comments: true
---


# Session abstract

You never know how your application will perform once deployed to production. Sure, you have unit tests and your test coverage is sky-high. However, you might depend on external resources such as databases, web services, and distributed caches. Moreover, without proper integration testing, you cannot be confident about the stability of your production environment. This session's speaker would like to spread the word about the awesome project TestContainers, an open source Java library that exposes APIs for JUnit tests. It provides lightweight, disposable instances of shared databases, distributed caches or grids, and anything else that can run in a Docker container, all securely and reliably downloaded from your Docker Hub.
<!--more-->
## Speaker(s)

|Name|Title|Company|
|:---|:---|:---|
|Viktor Gamov|Solutions Architect|Confluent|


## Session Info

| Experience | Session type | Track  |
|:-----------|:-------------|:-------|
| Intermediate | Conference Session | Java Development Tools |

# My Notes

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_1.jpg)
The braindump of the talk

## How

* one thing should do in thing

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_2.jpg)

## maven

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_3.jpg)

Or the Spotify maven plugin

## why not mutiple things in one container

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_4.jpg)

## Production 

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_5.jpg)

## Monitoring

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_6.jpg)

## testing

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_7.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_8.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_9.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_10.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_14.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_15.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_16.jpg)

* confluenceinc on dockerhub

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_17.jpg)



* remove the database 😃

## Test containers

* he demos it. Here some code snippets...

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_11.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_12.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_13.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_18.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_19.jpg)

## what to expect

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_20.jpg)

![testing-containers-with-testcontainers-there-and-back-again](/img/blogs/2017/testing-containers-with-testcontainers-there-and-back-again/CON3034__testing-containers-with-testcontainers-there-and-back-again_21.jpg)


## Conclusion 
Nice 👍 talk. 


        
