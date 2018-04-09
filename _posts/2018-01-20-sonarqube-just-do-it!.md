---
layout: post
authors: [ivo_woltring]
title: 'SonarQube Just Do It!'
image: /img/blogs/default-blog.png
tags: [Java, Sonarqube, Docker, Docker-compose, Pmd, Checkstyle, Howto, Guide, Tutorial, Setup]
category: Programming
comments: true
---

![Docker Maven Sonarqube](/img/blogs/2018/sonarqube-just-do-it/docker_maven_sonarqube.png)
# Code transparency ... Yes please...

Recently I gave a small seminar for my current client about Clean Code and Craftsmanship. The group I was talking to
consisted of developers of all levels from junior to senior. 

To my complete consternation, when I started talking about tools like PMD / CheckStyle and SonarQube, I found out that
_none_ of them had ever heard of these tools. Not even the Senior developers. 

Well this is bad and needs to be fixed!
<!-- more -->
  
This article will give a short explanation about what SonarQube is.   
It is also a quick guide on how to start working with it.  
This will be done with the use of docker because I want to :-)  

Prerequisites:
* docker(-compose)
* maven
* java


# What is SonarQube?

This is what SonarQube has to say about it.

> *_Continues Inspection_*  
> SonarQube provides the capability to not only show health of an application but also to highlight issues newly
> introduced. With a Quality Gate in place, you can fix the leak and therefore improve code quality systematically.

## How?

SonarQube will analyse your code by analysing it statically. Without knowing the inner workings of your application it will
"look" at your code and search for code constructions that are known to be fragile or just wrong. After the scan
it will generate a report in the form of a browseable website. All issues are explained and you are probably also provided
a possible solution for it.

Example:

Noncompliant code: "for" loop increment clauses should modify the loops' counters

```java
for (i = 0; i < 10; j++) {  // Noncompliant
  // ...
  i++; 
}
```

Lots of these language constructions can be tested statically and at the point of this writing there are 423 checks done.

![Sonarqube just do it](/img/blogs/2018/sonarqube-just-do-it/sonarqube-just-do-it.md_1.png)

## Use it yourself

With docker it is very easy to start your own SonarQube service:

```bash
docker run --rm --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube:alpine
```
The command provided above will erase all history when stopped, but for learning purposes and demo's that is fine.
Farther below I will give some more permanent solutions for local use and some hints for enterprise use.

now go to your maven project and run:

```bash
mvn sonar:sonar -Dsonar.host.url=http://localhost:9000
```

If maven the tells you that the build was successful, you can go look on [localhost:9000](http://localhost:9000) and
be amazed at how good or bad your code is. 

# Take time

If you are willing to take the time to really look into the found issues (yes even the 'info' ones) and willing to
go and fix these issues, you are on the way to becoming a better developer.

## Positive effect on a team

The beauty of using a tool like Sonar is that it will also keep history when configured correctly and therefore provide
you with a way of monitoring improvement. If you see improvements and also demonstrate this during sprint reviews, you
will start to notice a marked positive effect on your team. Team members will be more proud of the code they are writing
and become better as a group. Reviews will start to take code quality into account.

## Quality Gate

When you have a level of quality reached where you are comfortable you don't want to loose it. This is the moment you
can introduce the use of a quality gate. This is a level of quality you can define for your project and if the code does 
not meet the requirements set by the Quality Gate the build will fail. So that is the moment that Code quality might 
fail the build. A very powerful thing and one that raises the maturity level of the team significantly.

# More advanced examples

## Local with database
If you are done with the above provided commands and you want a more permanent solution for your local projects but don't
want to have to create a complete pipeline just for your hobby projects...

We need a database image and the sonar image.

Here the `docker-compose.yml` file containing the two images and their connections

```yaml
version: "3"

services:
  sonarqube:
    image: sonarqube
    ports:
      - "9000:9000"
    networks:
      - sonarnet
    environment:
      - SONARQUBE_JDBC_URL=jdbc:postgresql://database:5432/sonar
    volumes:
      - sonarqube_conf:/opt/sonarqube/conf
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_bundled-plugins:/opt/sonarqube/lib/bundled-plugins

  database:
    image: postgres
    networks:
      - sonarnet
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
    volumes:
      - postgresql:/var/lib/postgresql
      # This needs explicit mapping due to https://github.com/docker-library/postgres/blob/4e48e3228a30763913ece952c611e5e9b95c8759/Dockerfile.template#L52
      - postgresql_data:/var/lib/postgresql/data

networks:
  sonarnet:
    driver: bridge

volumes:
  sonarqube_conf:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_bundled-plugins:
  postgresql:
  postgresql_data:
```

This image creates volumes for all stuff needed to be saved.

Lets start it up. 

```bash
docker-compose up -d
```

You can leave of the `-d` if you want to see what's happening. It will start in the foreground and not in 'detached' mode.

Now if you stop the containers it will preserve the state of your database in the volumes defined.

To stop the containers go back to your `docker-compose.yml` file and do:

```bash
docker-compose down
```

And if you want to loose all your data (volumes) too:

```bash
docker-compose down -v
```

## Pipeline

If you use tools like Jenkins to control your pipeline it is very useful to add SonarQube as part of the pipeline setup.
If you do not have control over the pipeline environment, you should ask the Ops guys to install Sonar for you. If you do have 
control over the pipeline, it is a very good idea to make it part of it. It will make code quality something as part of your 
daily life. Jenkins has good integration for tools like sonar and configuring it is not the obstacle it might seem.

## Just maven

You don't have to do anything to have sonar working for maven. It is one of the default plugins (it is that important yes!) and always available
for all projects. You just have to tell it where sonar 'lives' and this can be done through the command line (see above). 
If you want to just be able to do `mvn sonar:sonar` you can tell maven where sonar lives by editing the `$HOME/.m2/settings.xml` file
by adding the following piece of code to it:

```xml
<profiles>
    <profile>
        <id>sonar</id>
        <properties>
            <!--<sonar.jdbc.url>jdbc:postres://localhost:3306/sonar</sonar.jdbc.url>-->
            <!--<sonar.jdbc.driver>com.mysql.jdbc.Driver</sonar.jdbc.driver>-->
            <!--<sonar.jdbc.username>sonar</sonar.jdbc.username>-->
            <!--<sonar.jdbc.password>xxxxx</sonar.jdbc.password>-->
            <!-- SERVER ON A REMOTE HOST -->
            <sonar.host.url>http://localhost:9000</sonar.host.url>
        </properties>
    </profile>
</profiles>
<activeProfiles>
<activeProfile>sonar</activeProfile>
</activeProfiles>
```
some lines have been commented out. This is because in the form I provided above (docker-compose.yml) you don't need to tell maven
where the database is because it already knows. If you choose to install a database native on your machine and sonar to (without docker)
you can enable these lines and adjust them to conform to your needed settings.

# Conclusion

Not doing these kinds of code checks as a developer is robbing you of a learning experience and the opportunity of an extra
review. The static code checker does not get tired or is under pressure. It will just check your code and help you become 
better and your code too.

So SonarQube ... Just do it! 
        
