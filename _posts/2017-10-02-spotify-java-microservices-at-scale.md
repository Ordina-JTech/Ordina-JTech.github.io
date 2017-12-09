---
title:  "Spotify: Java Microservices at Scale"
date:   2017-10-02 17:26
categories:
- JavaOne2017
tags:
- OOW17
- java
author: ivonet
---


# Session abstract

Spotify has a long history of using a microservice architecture and has gone through multiple iterations of programming languages and service frameworks. This session explores how Java finally allowed it a stable and scalable runtime and how its Apollo service framework is leveraged for ease of development and consistency over its more than 1,000 production services.
<!--more-->
## Speaker(s)

|Name|Title|Company|
|:---|:---|:---|
|Sharat Chander|Director of Product Management|Oracle|
|Niklas Gustavsson|Principal Architect|Spotify|


## Session Info

| Experience | Session type | Track  |
|:-----------|:-------------|:-------|
| Introductory | Conference Session | Java, Cloud, and Server-Side Development |

# My Notes
<img src="/assets/images/blog/CON7953__spotify-java-microservices-at-scale.jpg" style="width:50%;height:50%;"/>
* Conway’s Law is embraced
* Teams design their own services

## Microservices

* simplicity easy to understand 
* scope is limited 
* robustness. If it fails the impact is probably minimal
* scalability

# What is a service

* highly cohesive
* API is important
	* much more important then the implementation at first
	* switching out services should be easy. Rhat means stable API
* More than 1700 services
	* cross cutting concerns should be kinda uniform
	* Appollo

<img src="/assets/images/blog/CON7953__spotify-java-microservices-at-scale_1.jpg" style="width:50%;height:50%;"/>

<img src="/assets/images/blog/CON7953__spotify-java-microservices-at-scale_2.jpg" style="width:50%;height:50%;"/>

* testing is very easy on this kind of code

## Deployment

* docker
* helios but moving to kubernetes
* continues deployment to production
* canery testing to see if stuff works or not
* new services are really easy to create
* jenkins for the build

## Composing services

* Clients
* Access Points (AP)
* Hermes. Because http gave problems. Problems with having multiple connections on sockets in stead of connection pools
* messaging system based on CRMQ (hermes)
	* hermes is not open source because HTTP 2 solves all the problems
* Service Discovery
	* DNS with SRV records
	* DNS lookup to get the list of hostnames used
	* containers register thenselves
	* DNS is scalable to a ridiculous degree

<img src="/assets/images/blog/CON7953__spotify-java-microservices-at-scale_3.jpg" style="width:50%;height:50%;"/>

The index is immutable in Lucene and sometimes the index is switched out wit a new index and the old one discarded this makes it linearly scalable 

<img src="/assets/images/blog/CON7953__spotify-java-microservices-at-scale_4.jpg" style="width:50%;height:50%;"/>

## Scaling out

* deploy into multiple data centers complete clones
* replication at the storage layer not the service layer
* Casandra will replicate all to all data centers. 
* failover can also be done

<img src="/assets/images/blog/CON7953__spotify-java-microservices-at-scale_5.jpg" style="width:50%;height:50%;"/>

# Ownership

Each team owns multiple services ans services are always owned by 1 team. 

# Operations

<img src="/assets/images/blog/CON7953__spotify-java-microservices-at-scale_6.jpg" style="width:50%;height:50%;"/>

## Conclusion 

👍




        
