---
layout: post
authors: [ivo_woltring]
title: 'Spring-Boot with flyway and how to get your tests working' 
image: /img/blogs/spring-boot.jpg
tags: [Unit Test, Test, Spring, Spring Boot]
category: Testing
comments: true
---
__Problem:__ you have a spring boot application with flyway migration scripts for a MySQL database. Now your tests are failing because you don't have the database available during unit testing and flyway is complaining.

## Solution
Use an in memory H2 database in MySql mode.

## How
*   Create a file called `flyway_init.sql` in `src/test/resources` with the following content

```sql
CREATE SCHEMA IF NOT EXISTS "public";
```

*   create an `application.yml` file in `src/test/resources` with the following flyway config:

```xml
spring:
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
```

*   Add a test dependency on h2 to the `pom.xml`

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>1.4.183</version>
    <scope>test</scope>
</dependency>
```
*   Have fun.

Ivo.