---
layout: post
authors: [ivo_woltring]
title: 'Migrate From Java 6 To Java 8'
intro: Java 1.6 is almost at the end of the extended support period and will therefore be end of life soon.
image: /img/blogs/2018/migrate-from-java-6-to-java-8/migration.png
tags: [java, migrate, migration]
category: Programming
comments: true
---

> In April 2014 Oracle extended the support lifetime for Java SE 6. End of Premier Support on Dec 2015, and End of Extended Support on Dec 2018.  
> -- [Oracle](http://www.oracle.com/technetwork/java/javase/eol-135779.html)

This article will try to give pointers to make a transition to Java 8 go smoothly.
What to expect and what to be alert for.  
I will also try to explain why migration to java 9 or 10 is not advisable at the time writing this article.

# Migration

As java 1.6 (or java 6) is amost EOL (End Of Life) it becomes more and more important to migrate to a newer version.
At the time of writing this article Java 10 is the newest official release. Een though that is a fact it is not advisable
to migrate to that version, as Java 10 is not a so called LTS (Long Term Support) version. 
As soon as a new version is available support for version 10 will stop. Java has started on a half year release cycle, 
so support for version 10 wil stop in September this year.

Java 8 is an LTS version and also the version currently used by almost the whole world. It also is the closest to
Java 6 in architecture. It will also have Premium support until March 2022 and extended support until March 2025.
So the safest bet for now. 

Java 11 will be an LTS release, but migration to that version will probably have more impact than can now be safely be impacted.

# Java 8 language changes

* From Imperative to Functional
    * Modern constructs other newer language use
    * Enhance code readability
    * Strip out boilerplate code
    * stop telling the compiler what to do
* From Sequential to Parallel
    * execute code in parallel without extra effort
    * divide problems into subproblems, solving subproblems simultaniously and combining the results
    * aggregate operations iso Fork/Join
    
## Major new Features / Changes

* Virtual extension methods (interface evolution is now possible)
* Lambdas
* Method reference
* Streams
* Collections  
* DateTime API
* Functional Interfaces

There are more features but the goal of this article is migration and not a comprehensive feature list

## Compatibility guide

If you want to know the nitty-gritty of all the differences and the compatibility between the versions you can 
look [here](http://www.oracle.com/technetwork/java/javase/8-compatibility-guide-2156366.html)

## Migration

If you want to just have your code work on Java 8 as soon as possible with as little change as possible that is possible, 
because of the backwards compatibility, but when maintaining it is very advisable to refactor to the new features.
But first you need to have your code migrated... 

if you do want to migrate to java 10 you can find some guidelines [here](https://docs.oracle.com/javase/10/migrate/toc.htm#JSMIG-GUID-7744EF96-5899-4FB2-B34E-86D49B2E89B6)

# Plan of action

## Compile 

On a developer machine install Java 8 and try to compile (and unit test) the code against the newer Java version and see what happends.
Odds are that if you have no compile errors your code will function fine without any other changes.

> Java SE 8 is strongly compatible with previous versions of the Java platform. 
> Almost all existing programs should run on Java SE 8 without modification. 
> However, there are some minor potential incompatibilities in the 
> JRE and JDK that involve rare circumstances and "corner cases" 
> that are documented here for completeness.  
> -- [oracle](http://www.oracle.com/technetwork/java/javase/8-compatibility-guide-2156366.html#A999198) 

If you follow the link in the quote you can read more about these corner cases if they occur.

So if your application does nothing really weird chances are very good that all code will run fine on java 8.

You might also need to upgrade tools like maven and configure that specific environment to work with Java 8, but this is often one 
of the easiest tests.

Of course there is also chance your code won't compile even thought great care is taken to make versions backwards 
compatible. Version 9 is the first version breaking this tradition. In the case of not compiling code you will probably get 
stacktrace(s) giving you hints... Trouble shooting starts at this point :-)

Some of the more notable incompatibilities are found in the `sun.*` packages. These packages should have been "private" 
packages for a long time so if you use these you might run into trouble.

## SonarQube / PMD / Checkstyle

If your code compiles you might want to run it though the newest version of SonarQube and look at the results carefully.
This is a great way to learn about new features and pitfalls when migrating. It should be noted that this works best if your code 
was "clean" when still running under java 1.6. If your code has never been statically tested before by tools like SonarQube, you
might not want to look at what is found in either version 😂. You might not like what you see...

## Deploy your application 

During deployment you might find other issues, like version incompatibility between e.g. application server and newly compiled
java application.

During the migration process you need to know what the middleware like Websphere, Tomcat, Glassfish, Wildfly, Payara, 
JBoss and the like your application is running on and if they need to upgrade as well to stay compatible with the new version of java.

If all works fine and regression tests have not found anything, you have successfully done a migration. Finished though you are not!

# Migration done now lets migrate

Just because the base migration was successful does not mean that all the work is done. Not the real work begins.
Writing to the new features of the language and migrating to the new features. Luckily it does not have to be done all at once.

Every time a piece of code needs to change because of am rfc (request for change) you might want to use the boy-scout 
rule (leave the ground you play on cleaner than you found it). Cleaning a small piece of code by introducing Java 8 features.

## Using Java 8 features

### Lambdas

Lambdas enable the programmer to eliminate a lot of boilerplate code and make code much more readable. This article will 
not explain how Lambdas are to be used.

* Streams and filters

`java.util.Stream` provides a pipeline with filters with intermediate (map, filter, sorted, etc.) or terminal (forEach, 
sum, reduce, findFirst, etc) steps.

* Identify for loops and replace them with the Stream `forEach`. This notation makes it possible to introduce concurrency 
and focuses on the how not what should be done.

e.g. old versus new style

```java
    public long oldCountByZip(final String zip) {
        long count = 0;
        for (final Person person : persons) {
            if (person.getZip().equals(zip)) {
                count++;
            }
        }
        return count;
    }

    public long newCountByZip(final String zip) {
        return persons
                .stream()
                .parallel()
                .map(Person::getZip)
                .filter(s -> s.equals(zip))
                .count();
    }
```

* This is just a basic example but does demonstrate that you can map the the object you wanted by method reference 
  (the `Person::getZip` notation) and introduce concurrency (`.parallell()`) and filter on what you wanted and then count. 
  The beauty of this notation is that you can explain it easily to a non technical person without really having to explain 
  what but only the how.
* The more you start using the new notation the more you will get used to it and start to love it, unless you were already used
  to these features in another language, then it might still seem quite verbose 😄.
  
### DateTime API

The Date and Time API has had a major overhaul in Java 8 and makes e.g. Jodatime not necessary anymore as it is really good.
You might want to consider migration to the new API as it is the standard and you might be able to eliminate some converters.
  
# Listen to your IDE

Your IDE will be a lot of help to you during migration. If you use one of the better once (e.g. IntelliJ) it will tell you, 
when you can refactor to lambdas or method reference. Just listen and utilize 😂 and live long and prosper 🖖.
Some stuff like the diamond `<>` notation can be easily refactored over all classes by good IDE's.
Just run an inspection on your code and see what happens...

# Tests are your friends

If you have lots of good unit tests before migration you will gain confidence much easier than when you don't have them.

Test are your friends!

# More

Of course there is a lot more to think of during a migration like:

* Education of your employees
    * Only some of the new features are mentioned in this article.
    * are they already aware or not?
* Middleware -> is the middleware up to par?
* Hardware -> most hardware capable of running java 6 can also run java 8, but is it enough?
* OS Upgrades -> sometimes an OS upgrade is necessary in order to install java 8 (e.g. RedHat)
* Oh did I mention that tests are your friends?

# Discussion

If you have comments of more tips please let me know in the comments below...


           
