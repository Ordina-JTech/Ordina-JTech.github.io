---
title: "spring-boot with flyway and how to get your tests working"
date: 2017-07-12 17:57:00 +0100
categories: unit-testing, test, spring
author: ivonet
---

# Problem

You have a spring boot application with flyway migration scripts for a MySQL database. Now your tests are failing because you don't have the database available during unit testing and flyway is complaining.

# Solution

Use an in memory H2 database in MySql mode.

# How

*   Create a file called `flyway_init.sql` in `src/test/resources` with the following content

<pre class="lang:sql decode:true">CREATE SCHEMA IF NOT EXISTS "public";
</pre>

*   create an `application.yml` file in `src/test/resources` with the following flyway config:

<pre class="lang:yml decode:true">spring:
  datasource:
    url: jdbc:h2:mem:DBNAME;MODE=MySQL
    username: sa
    password:
    driver-class-name: org.h2.Driver

flyway:
  url: "jdbc:h2:mem:DBNAME;MODE=MySQL;INIT=RUNSCRIPT FROM 'classpath:flyway_init.sql'"
  user: sa
  password:
  baseline-on-migrate: true
</pre>

*   Add a test dependency on h2 to the `pom.xml`

<pre class="lang:xml decode:true">&lt;dependency>
    &lt;groupId>com.h2database&lt;/groupId>
    &lt;artifactId>h2&lt;/artifactId>
    &lt;version>1.4.183&lt;/version>
    &lt;scope>test&lt;/scope>
&lt;/dependency>
</pre>

*   Have fun.

Ivo.