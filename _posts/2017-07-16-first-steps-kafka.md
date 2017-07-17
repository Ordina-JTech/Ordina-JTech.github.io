---
title:  "First steps Kafka"
date:   2017-02-01 21:48:13 +0100
categories: tools
author: etmuller
---

#Waarom

Mede ingegeven door de ontwikkelingen bij verschillende banken heb ik de laatste dagen naar apache kafka gekeken. Kafka is bijzonder geschikt om events af te handelen en werkt met een publish-subscribe mechanisme. Verder kunnen streams efficient worden geprocessed en wordt alle data veilig opgeslagen in een gerepliceerd cluster.

#Architecture

Een architectuur kan er als volgt uit zien:

![Architectuur](/assets/images/blog/kafka.png)

#Gebruik

Het installeert gemakkelijk, tenminste op de macbook. En vervolgens is de eerste activiteit een topic maken wat kan met het volgende commando.
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test

Zodra dit is gedaan zijn er meteen berichten op te plaatsen en uit te lezen. Dit kan door de commandline maar ook met een Java Api.
Bij gebruik van de java api is er een extra maven dependency nodig:

```
 <dependency>

    <groupId>org.apache.kafka</groupId>

    <artifactId>kafka-clients</artifactId>

    <version>0.11.0.0</version>

</dependency>
```

Berichten kunnen gepubliceerd worden op de volgende manier:

```java
 		KafkaProducer<String, String> producer= new KafkaProducer<String, String>(props)

 		producer.send(new ProducerRecord<String, String>("topic-name", message, message));
 
 		producer.close();
```
  
 Nu staat er een bericht op het topic en de subscribers kunnen dit nu van de het topic verkrijgen.


```java

 kafkaConsumer.subscribe(topics );
 
 	while (true) {
 	
            	
     ConsumerRecords<String, String> records = kafkaConsumer.poll(1000);
                
                for (ConsumerRecord<String, String> record : records)
                   
  }
```



