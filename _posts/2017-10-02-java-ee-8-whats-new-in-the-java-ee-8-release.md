---
layout: post
authors: [ivo_woltring]
title: "Java EE 8: What's New in the Java EE 8 Release"
image: /img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release.jpg
tags: [OOW17, Java, Java EE 8]
category: JavaOne2017
comments: true
---

# Session abstract

This session presents an overview of the recent release of the Java EE 8 platform. Topics covered include the new JSON Binding API, updates to the JSON Processing API, the JAX-RS reactive client API, JAX-RS support for server-sent events, HTTP/2 support in Servlet, the new Java EE Security API, and new features in Bean Validation and CDI.
<!--more-->
## Speaker(s)

|Name|Title|Company|
|:---|:---|:---|
|Linda Demichiel| |Oracle|


## Session Info

| Experience | Session type | Track  |
|:-----------|:-------------|:-------|
| Intermediate | Conference Session | Java, Cloud, and Server-Side Development |

# My Notes

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release.jpg)

## Brief history 

* 2014:
	* Work on EE 8 started

* 2016:
	* survey on what should be done. 

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_1.jpg)

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_2.jpg)

## JSR’s

### Web tier

#### JSON-P 1.1

* json pointer
* json patch
* json merge patch
* json pointer methods

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_3.jpg)

* JSON-patch

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_4.jpg)

* JSON queries using lambdas

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_5.jpg)

### JSON-B 1.0

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_6.jpg)

* JsonBuilder
* Jsonb 

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_7.jpg)

* With a rich set of customization options like property naming, ordering, etc

### JAX-RS 2.1

* Reactive API
* server-send events
* ...

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_8.jpg)
![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_9.jpg)

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_10.jpg)

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_11.jpg)

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_12.jpg)
![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_13.jpg)

### HTTP/2

* reduce latency 
* parallelism 
* ...

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_14.jpg)

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_15.jpg)

### JSF 2.3

* better CDI
* websockets
* ajax method invocation 
* class level bean validation
* new date time support

### CDI 2.0

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_16.jpg)

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_17.jpg)

### Bean validations 

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_17.jpg)

And much more 👏🏻

### Java EE Security API 1.0

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_18.jpg)

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_19.jpg)

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_20.jpg)

### Small improvements 

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_21.jpg)

### Where is it going...

![java-ee-8-what_s-new-in-the-java-ee-8-release](/img/blogs/2017/java-ee-8-what_s-new-in-the-java-ee-8-release/CON2661__java-ee-8-what_s-new-in-the-java-ee-8-release_22.jpg)

The details are still being worked out. But will probably go fast because Oracle is being aggressive about it. 

# Conclusion

Clear explanation on stuff 👍
        
