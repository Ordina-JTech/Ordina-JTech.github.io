---
title:  "Microservices and Cloud-Driven Code Simplification"
date:   2017-10-03 09:25
categories:
- JavaOne2017
tags:
- OOW17
- java
author: ivonet
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

<img src="/assets/images/blog/CON5252__microservices-and-cloud-driven-code-simplification.jpg" style="width:50%;height:50%;"/>

* EARs have no use whatsoever anymore
* All Microservices are WARs
* WARs have no self developed dependencies 
* rebuilding logic is completely legal if you will be faster that way unless next bullet
* if you need to isolate (reuse) business logic you write a new service for it and call it over http
* black and white architecture 
* so WARs are completely decoupled from other wars

<img src="/assets/images/blog/CON5252__microservices-and-cloud-driven-code-simplification_1.jpg" style="width:50%;height:50%;"/>

* javadoc is not used!

<img src="/assets/images/blog/CON5252__microservices-and-cloud-driven-code-simplification_2.jpg" style="width:50%;height:50%;"/>

* start with concrete classes first and add abstractions  later if necessary 
* system testing done by new project and version it according to the corresponding Microservice. Now you can apply all older versions for backwards compatibility 

<img src="/assets/images/blog/CON5252__microservices-and-cloud-driven-code-simplification_3.jpg" style="width:50%;height:50%;"/>

* monitor the use cases
	* slowest method
	* how many times called
	* and stuff

# Conclusion 

👍

        
