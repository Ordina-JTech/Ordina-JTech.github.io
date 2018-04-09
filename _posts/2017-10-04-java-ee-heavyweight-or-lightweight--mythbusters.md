---
layout: post
authors: [ivo_woltring]
title: 'Java EE: Heavyweight or Lightweight--Mythbusters'
image: /img/blogs/default-blog.png
tags: [OOW17, Java]
category: JavaOne2017
comments: true
---


# Session abstract

How fast is a deployment? What is the minimum size of a Java EE thin WAR? What are the RAM requirements of application servers? What is the out-of-the-box performance? How many transactions per second are achievable? What is the performance penalty of EJB/CDI/JPA and so on? What is the overhead of a transaction? Is Java EE lightweight enough to run in clouds? How big (in terms of disk size) are application servers? This session asks as many heretical questions about Java EE &amp; Co. as possible. Come to answer them together, with plain numbers and code. Heretical questions are highly welcome!
<!--more-->
## Speaker(s)

|Name|Title|Company|
|:---|:---|:---|
|Adam Bien|Consultant / Contractor|Adam Bien|


## Session Info

| Experience | Session type | Track  |
|:-----------|:-------------|:-------|
| Intermediate | Conference Session | Java, Cloud, and Server-Side Development |

# My Notes

![java-ee-heavyweight-or-lightweight--mythbusters](/img/blogs/2017/java-ee-heavyweight-or-lightweight--mythbusters/CON5578__java-ee-heavyweight-or-lightweight--mythbusters.jpg)

![java-ee-heavyweight-or-lightweight--mythbusters](/img/blogs/2017/java-ee-heavyweight-or-lightweight--mythbusters/CON5578__java-ee-heavyweight-or-lightweight--mythbusters_1.jpg)
![java-ee-heavyweight-or-lightweight--mythbusters](/img/blogs/2017/java-ee-heavyweight-or-lightweight--mythbusters/CON5578__java-ee-heavyweight-or-lightweight--mythbusters_2.jpg)

![java-ee-heavyweight-or-lightweight--mythbusters](/img/blogs/2017/java-ee-heavyweight-or-lightweight--mythbusters/CON5578__java-ee-heavyweight-or-lightweight--mythbusters_3.jpg)

# Live demos

Al live demoes with the goal to see

* simple socket server (3 lines of java) took about 7 Mb
* Wildfly full profile took about 35 Mb
* Websphere liberty full took about 40 Mb

So trying to save money 💰 by reducing memory usage is totally useless. You will probably save about 600Mb in a project with 20 Microservices. The memory costs is almost nothing compared to the days / weeks of work on tuning this or making your own smaller server. 

Premature optimization is the root of all evil. 

By using application servers you get full monitoring for free. 

![java-ee-heavyweight-or-lightweight--mythbusters](/img/blogs/2017/java-ee-heavyweight-or-lightweight--mythbusters/CON5578__java-ee-heavyweight-or-lightweight--mythbusters_4.jpg)

* Payara micro
![java-ee-heavyweight-or-lightweight--mythbusters](/img/blogs/2017/java-ee-heavyweight-or-lightweight--mythbusters/CON5578__java-ee-heavyweight-or-lightweight--mythbusters_5.jpg)

Is only 10 megs smallet the the full version.  The sane goes for Wildfly swarm. 

So the while small thing looks like a political thing. 

# docker

Use the base image of a full profile and only add your own stuff to it. Push the base image to the cloud once and nexe iterations only push the few Kb of the new build and not the whole server again and again. 

* docker history image_here

# Conclusion
Very convincing story for just using Java EE. 

👍👍
        
