---
title:  "Monolith versus Microservices"
date:   2018-03-01 21:48:13 +0100
categories: architecture
author: petereijgermans
---

<img src="/assets/images/blog/2018/microservices-or-monolith/monolith-versus-microservices.jpeg" style="width: 75%;height: 75%;display: block;margin: 0 auto;"/>

This interview is published in 2018 in the JAX DevOps Magazine:

1. What are the differences that people might not be familiar with between a monolith and microservices?
2. What are the advantages and disadvantages for each approach?3. What is the correct way to use microservices? 
4. What kind of tools do you use when managing microservices?
5. What do most people or businesses get wrong about microservices?
6. What’s the most important lesson you’ve learned from implementing a microservice architecture?
7. What will participants be able to take away from your talk?



-------

**What are the differences that people might not be familiar with between a monolith and microservices?**

Microservices have a much more complex eco-system than monolithic applications, sometimes the complexity of the system as a whole is much larger than a monolithic application. Think, for example, of container management, distributed tooling such as rancher, mesos, etc ... Also testing and deployments to production are significantly more complex. The organization must be geared to making microservices. In other words, a monolith is often much simpler.
- Microservices communicate (preferably) asynchronously via a message bus instead of synchronous calls in a monolith. That makes debugging etc, much more complex.
- Monitoring is essential in a microservices architecture (which is often forgotten or not well set up).

-------
**What are the advantages and disadvantages for each approach?**

Compared to de monolithic model,
a microservice has the following pros and cons:
 

When you use the microservices architecture, you will have increased decoupling and separation of concerns. Since
you are litteraly splitting up your application in separate services.

A Service is a modular component only accessible via their own contract, and hence less prone to turn into a big ball of mud.

Code in a microservice is restricted to one function of the business and is thus easier to understand. IDEs can load the small code base very easily and
keep the developers productive. It doesn’t matter what language, framework or database is used as long as it is the best suited for the job.

You will have more agility to roll out new versions of a service due to shorter build, test and deploy cycles. This also means
little downtime during roll out.

But on the other hand, deploying multiple services
is also more complex (many more moving parts that need to be configured, deployed, scaled, and monitored).

Since the different services are small and deployed seperately, it's obvious easier
to scale them, with the advantage that you can scale specific services of your application.


But there are also a lot of drawbacks:

Testing a microservices application is also much more
complex. Example: a test class for a service would need to launch that service and any services that it depends upon (or at least configure stubs for those services).
And Implementing changes that span multiple services or updating multiple databases owned by different services is also very difficult. 

And finally, a service’s API invariably changes over
time. In a monolithic application, it is usually straightforward to change the API and update all the callers. 
In a microservices-based application it is a lot more difficult, even if all of the consumers of your API are other services in the same application.
You usually cannot force all clients to upgrade in lockstep with the service. Also, you will probably incrementally deploy new versions of a service such that both old and new versions of a service will be running simultaneously.

-------

**What is the correct way to use microservices?**

The question is: for what type of systems do you have to use microservices and when not?
- Competing websites that need to be adapted quickly to changes in the market are suitable (webshops, banks, newspapers, search engines, etc).
- Application in which a lot of data is processed.

-------

**What kind of tools do you use when managing microservices?**

Resilience:
Netflix OSS tools, Hystrix, Ribbon, etc…

Platform:
Kubernetes, Zookeeper,
Mesos, Marathon, Rancher, Puppet, Chef, Ansible, OpenStack, Netflix Eureka …

Delivery:
GITLab, Bamboo, TeamCity, GoCD, Jenkins,  Docker, rkt (Rocket), …

Logging.Metrics:
Prometheus, GrayLog, LogStash, Kibana, Grafana, ElasticSearch, ...…

Messaging:
Kafka, RabbitMQ, …

(Distributed) Databases:
MongoDb, CouchDb, Cassandra, MySQL, Postgress

-------

**What do most people or businesses get wrong about microservices?**

People are often unaware that microservices really need to be independent. 

For example, you often see that all kinds of services are being made but that 1 database is shared. 
Another problem is that people program what they were used to doing in a monolith, making the chain of synchronous calls between services (over the network !!!) much too long. 
Neither is attention paid to spagetti structure that can arise from all kinds of services that use each other and services are tightly coupled. 
The infrastructure for monitoring, automatic testing and deployments is often not fully set up but for 3/4 or 1/2, so the benefits of microservices can not be used, but the burden.

-------
**What’s the most important lesson you’ve learned from implementing a microservice architecture?**

See answer:  

What do most people or businesses get wrong about microservices?

-------
**What will participants be able to take away from your talk?**

My talk is focusing on the following topics:
- Microservice Design Patterns 
- Strategies to convert a monolith to microservices
- Answering the question: which is better, microservices or monolith? 
