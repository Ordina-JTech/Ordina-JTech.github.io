---
layout: post
authors: [ivo_woltring]
title: 'Microservices and Cloud-Driven Code Simplification'
image: /img/blogs/default-blog.png
tags: [OOW17, Java]
category: JavaOne2017
comments: true
---


# Session abstract

Microservices enforce self-containment and platform neutrality. Clouds and containers come with additional constraints regarding configuration, monitoring, logging, and load balancing. In this session, the presenter codes an application with stock Java EE and presents approaches for code and bloat removal. Questions are highly welcome.
<!--more-->
## Speaker(s)

|Name|Title|Company|
|:---|:---|:---|
|Adam Bien|Consultant / Contractor|Adam Bien|


## Session Info

| Experience | Session type | Track  |
|:-----------|:-------------|:-------|
| Intermediate | Conference Session | Oracle Code: Containers, Microservices, DevOps, Databases, APIs, and more |

# My Notes

Only at a 🤓 conference can a speaker ask the audience: "does anyone have a USB-C to HDMI converter" and get one  😂 

![microservices-and-cloud-driven-code-simplification](/img/blogs/2017/microservices-and-cloud-driven-code-simplification/CON5252__microservices-and-cloud-driven-code-simplification.jpg)

* EARs have no use whatsoever anymore
* All Microservices are WARs
* WARs have no self developed dependencies 
* rebuilding logic is completely legal if you will be faster that way unless next bullet
* if you need to isolate (reuse) business logic you write a new service for it and call it over http
* black and white architecture 
* so WARs are completely decoupled from other wars

![microservices-and-cloud-driven-code-simplification](/img/blogs/2017/microservices-and-cloud-driven-code-simplification/CON5252__microservices-and-cloud-driven-code-simplification_1.jpg)

* javadoc is not used!

![microservices-and-cloud-driven-code-simplification](/img/blogs/2017/microservices-and-cloud-driven-code-simplification/CON5252__microservices-and-cloud-driven-code-simplification_2.jpg)

* start with concrete classes first and add abstractions  later if necessary 
* system testing done by new project and version it according to the corresponding Microservice. Now you can apply all older versions for backwards compatibility 

![microservices-and-cloud-driven-code-simplification](/img/blogs/2017/microservices-and-cloud-driven-code-simplification/CON5252__microservices-and-cloud-driven-code-simplification_3.jpg)

* monitor the use cases
	* slowest method
	* how many times called
	* and stuff

# Conclusion 

👍

        
