---
title:  "Spring property placeholders and default values"
date:   2017-02-03 14:02:13 +0100
categories: spring
author: michel_schudel
---

I’ve seen quite a lot of Spring projects over the years that use multiple `PropertyPlaceholderConfigurer` instances in the same bean factory.
Consider a project where maven module A depends on maven module B in the same maven project. The idea is that module A is self-sustaining and loads its own property files, and module B does as well. This philosophy is good, but can lead to a horrible mess when used in combination with default values.

#### The problem setup
You have a Spring project with two `PropertyPlaceholderConfigurer` instances, each loading their own property file, and one Spring Bean that has a `@Value` injection with a default value.

```java
@Configuration
@ComponentScan
class AppConfiguration {

    @Bean
    PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer() {
        PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        propertyPlaceholderConfigurer.setLocation(new ClassPathResource("application.properties"));
        return propertyPlaceholderConfigurer;
    }

    @Bean
    PropertySourcesPlaceholderConfigurer anotherPropertyPlaceholderConfigurer() {
        PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        propertyPlaceholderConfigurer.setLocation(new ClassPathResource("application1.properties"));
        return propertyPlaceholderConfigurer;
    }

}
```

```java
@Component
public class MyBean {

    private String myKey;

    @Autowired
    public MyBean(@Value("${myKey:defaultValue}") String myKey) {
        this.myKey = myKey;
    }

    public String getMyKey() {
        return myKey;
    }
}
```
Furthermore, you have the two property files where the first property file is missing the property and the second property file actually has it.

#### application.properties

`#mykey=value1`

#### application1.properties

`mykey=value2`

#### The symptoms
The bean receives the default value "defaultValue", although property placeholder 2 actually has a value “value2” for this property.

#### The cause
`PropertyPlaceholderConfigurer` instances *don’t know about each others' existence*. What happened here is:

1. Property placeholder 1 tries to resolve the value of `myKey`. It doesn’t have a value for that, but “fortunately” the bean specifies a default value, so it uses that.
2. Property placeholder 2 sees that the bean already has received a value (set by Property placeholder 1), so it ignores it.

#### The solution alternatives

1. Only use one `PropertyPlaceholderConfigurer` for your deployable unit (a WAR, for example), at the top level. I would recommend this solution first.
2. Do not use defaults in your @Value statements. Instead, explicitly define all property values once and use this in combination with `ignoreUnresovablePlaceholders` on all property placeholder configurers. I consider this a brittle solution at best.
