---
title:  "REST-assured, wees gerust!"
date:   2017-02-02 21:48:13 +0100
categories: integration-testing
author: naipath
---

Bij het realiseren van een microservices architectuur is een van de uitdagingen het doortesten van een of meerdere services. 
Zoals menig developer weleens ervaren heeft is het opzetten van integratie testen niet triviaal. 
Dergelijke testen vergen vaak complexe mocking, veel setup en boilerplate code wat ten koste gaat van executie snelheid en simpliciteit. 
Vele frameworks hebben in het verleden vereenvoudigingen geboden, maar nu is er REST-assured! 
En in combinatie met WireMock wordt in dit artikel getoond dat het schrijven van integratie testen weer fun kan zijn!


## Situatie

Bij het project Hypotheekdossier van de Rabobank realiseren we een aantal services die gezamenlijk functionaliteit aanbieden in een mobiele app. 
De app zelf wordt gerealiseerd met het React/Redux framework en voor de backend hanteren we primair Spring Boot services die gedeployed worden op Mesos/Marathon. 
Indien services een database vereisen integreren ze met een ElasticSearch database. 
Ook vereisen een aantal services connecties met zogenaamde services die buiten de Rabobank leven.
Zie figuur 1 voor deze architectuur.

![Architectuur](/assets/images/blog/rest-assured-architectuur.png)


Binnen deze architectuur hanteren we veel services, waardoor het belang van het testen van deze services onderling nog belangrijker wordt. 
Om toch de kwaliteit van elke service te garanderen hebben we ervoor gekozen om veel integratie testen te maken. 
Aangezien elk endpoint van een service een duidelijk gekaderd functioneel doel dient helpt dit bij het bedenken van correcte test-cases.


Initieel is gestart met Cucumber feature files die de test case beschrijft. 
Middels zogenaamde Glue code wordt vervolgens een rest service aangeroepen met de juiste parameters.

Bijvoorbeeld:
```java
// RestService.feature
Gegeven de restservice Aanvragingen
Als de restservice wordt aangeroepen met de volgende parameters:
  | parameter                     | value  |
  | aanvragerBedr                 | 45000  |
Dan wordt de volgende output teruggegeven:
  | maxInkomenBedr                | 188600 |
```
```java
// RestServiceDefs.java
@Als("^de restservice wordt aangeroepen met de volgende parameters:$")
public void de_restservice_wordt_aangeroepen_met_de_volgende_parameters(List<ParameterValues> input) {
    restInterface.setUriParameters(input);
}

@Dan("^wordt de volgende output teruggegeven:$")
public void wordt_de_volgende_output_teruggegeven(Map<String, String> expectedResult) {
    restInterface.callRestService();
    assertThat(restInterface.getStatusCode(), is(200));

    Response actual = new ObjectMapper().readValue(restInterface.getJSON(), Response.class);
    Integer expected = mapper.readValue(CreateExpected.result(expectedResult), Integer.class);

    assertThat(actual.maxInkomenBedr, is(expected));
}
```
```java
// RestInterface.java
interface RestInterface {
    void callRestService();
    void setUriParameters(List<ParameterValues> uriParameters);
    String getJSON();
    int getStatusCode();
}
```

Dit werd snel verbose en lastig onderhoudbaar over alle services heen. 
Dit komt mede door de driestap sprong: Feature file, Glue code, generic HTTP class. 
Om toch grip te houden op de integratie testen is er gekozen voor REST-assured. 
REST-assured is niet meer dan een HTTP client dat aan voelt als een DSL (Domein Specific Language). 
Middels deze aanpak was het mogelijk om dezelfde integratie test vele malen eenvoudiger op te zetten.

Een opzet met REST-assured lijkt op Unit-Test met 5 regels code.
```java
@Test
public void given_one_income_then_correct_output_is_returned() {
    given()
      .param("aanvragerBedr", 45000).
    when()
      .get("/aanvragingen").
    then()
      .body("maxInkomenBedr", is(188600));
}
```

Dit artikel zal aan de hand van een aantal voorbeelden de kracht van de REST-assured DSL laten zien.

#Requests opstellen

Om op te starten met REST-assured dien je de maven dependency io.rest-assured:rest-assured:3.0.1 toe te voegen.en eventueel een aantal star-imports.
```xml
<dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>rest-assured</artifactId>
    <version>3.0.1</version>
    <scope>test</scope>
</dependency>
```

```java
import static io.restassured.RestAssured.*;
import static io.restassured.matcher.RestAssuredMatchers.*;
import static org.hamcrest.Matchers.*;
```

Vervolgens is het mogelijk in je test file Rest-assured requests te maken.
Hierin hanteert REST-assured twee smaken. Een rechtdoorzee one-liner en een vorm van BDD.
Beide bieden ze dezelfde mogelijkheden welke beschreven zijn in code.
```java
get("https://holidayapi.com/v1/holidays?key=SOME_KEY&country=NL&year=2015").then().log().all();

given()
    .queryParam("key", "SOME_KEY")
.when()
    .get("https://holidayapi.com/v1/holidays?country=NL&year=2015")
.then()
    .log().all();
```

De eerste smaak is fijn om te hanteren bij het opzetten van je test. 
Bijvoorbeeld een standaard request te sturen om een account aan te maken. 
Deze roep je dan in een `@Before` aan. 
Vervolgens zou je in de daadwerkelijke test middels de BDD smaak de daadwerkelijke test uitvoeren.

Dit helpt om op een gestructureerde wijze het request op te vragen. Een aantal keer gebruik maken van de IDE auto completion en de ervaring is dat er hiermee voldoende op weg wordt geholpen.
Een uitgebreider voorbeeld zou er bijvoorbeeld er zo uit kunnen zien als is beschreven in code listing 3. In dit voorbeeld wordt gevraagd aan het spel League of Legends om de data omtrent de champion “Aurelion Sol: The Star Forger”. 
```java
given()
    .pathParam("championId", "136")
    .pathParam("region", "euw")

    .and()
    .param("champData", "all")
    .queryParam("api_key", "MY_API_KEY")
        
    .and()
    .header("Accept-Language", "en-US")
.when()
    .get("https://global.api.pvp.net/api/lol/static-data/{region}/v1.2/champion/{championId}")
.then()
    .log().all();    
// https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/136?champData=all&api_key=MY_API_KEY
```
![Aurelion Sol: The Star Forger](/assets/images/blog/rest-assured-Aurelion.png)

Wat opvalt is dat je erg vrij wordt gelaten in de stijl die je wilt hanteren. de `.and()` is niets meer dan syntactic sugar en voegt alleen maar leesbaarheid toe. Alhoewel ik zelf merk dat ik dit nooit toepas is het fijn om in deze keuze vrij te worden gelaten.
De `.param("", "")` en `.queryParam("", "")` zijn hetzelfde. Ze voegen beide een query parameter toe aan het request. Dit biedt als extra voordeel dat het niet alleen voor een developer leesbaar is, maar ook voor een tester die bekend is met HTTP. Naast de `GET` ondersteunt REST-assured alle andere HTTP methodes ook, je dient simpelweg de `.get(url)` vervangen voor de gewenste methode. Bij code listing 4 zie je hiervan een aantal voorbeelden.
```java
head("https://www.google.nl");
post("SOME_URL", new Object());
request("CUSTOM_HTTP_METHOD", "some_url");
patch(); delete(); options();
```

Nu begint het al vervelend te worden dat in iedere test de hele url dienen op te geven. 
Hiervoor biedt REST-assured een aantal static properties om altijd de juiste waardes te pakken.
Deze zijn te vinden op het RestAssured object. Logischerwijze is het handig om deze in te stellen in de `@BeforeClass` methode zoals is aangeduid in code listing 5.

```java
@BeforeClass public static void setup() {
    RestAssured.port = 443;
    RestAssured.baseURI = "https://global.api.pvp.net";
    RestAssured.basePath = "/api/lol/static-data";
}
get("/euw/v1.2/champion/136?champData=all&api_key=MY_API_KEY").then().log().all();
```

In het opbouwen van het request kunnen we nu REST-assured aanvullen met configuratie, meerdere smaken gebruiken, parameters toevoegen en deze loggen met `.then().log().all()`.

Nu blijft er echter nog een hekelpunt over. Hoe kunnen we een object als text e.d. sturen in een post als JSON, XML en FormData. REST-assured biedt hiervoor de `.body()` en de `.formParam()` methodes. Om het object te serializeren hanteert REST-assured standaard Jackson. Mocht deze niet op het classpath aanwezig zijn dan valt REST-assured terug op Gson en als laatste optie kiest REST-assured JAXB. Op basis van het gegeven content-type zal het object worden geserialiseerd naar JSON dan wel XML. Voorbeelden hiervan zijn te zien in code listing 6.
```java
given()
    .body(new Message())
.when()
    .post("/chat/endpoint")
.then().log().status();

given()
    .formParam("title", "Question")
    .formParam("message", new Message(), "date", LocalDate.now())
.when()
    .post("/chat/endpoint")
.then().log().body();
```

Dezelfde toegankelijkheid biedt REST-assured ook voor het opgeven van cookies en toevoegen van autorisatie. Namelijk door het toevoegen van `.cookie("yummie", "cookies")` of de `.auth().basic("username", "password")` na het declareren van de given stap. Een voorbeeld hiervan is te zien in code listing 7.
```java
given()
    .auth().basic("teemo", "the-Swift-Scout")
    .cookie("status", "I'll scout ahead!")
.when()
    .post("/chat/endpoint")
.then().log().body();
```

# Validatie

Cool, we hebben mooie requests die het flitsend goed doen, maar we hebben eigenlijk nog niets gevalideerd. Ook doen we nog niet met het terug komen de resultaat van het verstuurde request. Om het resultaat terug te krijgen van het uitgevoerde request kan je de `.extract()` methode aanvullen. Het is dan mogelijk om te kiezen om meerdere delen van het request lost te peuteren zoals de body van het HTTP response. In code listing 8 staat hier een voorbeeld van.
```java
given()
    /* some build up here */
.when()
    .get("/{region}/v1.2/champion/{championId}")
.then()
    .extract().body().asString()

get("/{region}/v1.2/champion/{championId}")
.then()
    .extract().body().as(Champion.class);
```

Bij het deserializeren wordt dezelfde werkwijze gehanteerd als bij het serializeren van een object in een POST bericht. Veelal is het niet gewenst om het antwoord op deze manier te valideren. Beter is om de standaard ingebouwde GsonPath te gebruiken in combinatie met Hamcrest. Dit is een soort van CSS selector/XPath wat het mogelijk maakt om specifieke waardes uit een bericht te halen en deze te controleren. Dit zorgt voor korte code waarbij je beter specifieke cases kan testen.
Om hier een beter beeld bij te schetsen is er een voorbeeld gegeven in code listing 9. Hierin pakken we het antwoord van League of Legends en controlleren we een aantal waardes van onze champion.
```json
{
    "id": 136,
    "key": "AurelionSol",
    "name": "Aurelion Sol",
    "title": "The Star Forger",
    "image": {
        "full": "AurelionSol.png",
        "sprite": "champion0.png",
        "group": "champion",
        "x": 384, "y": 0,
        "w": 48, "h": 48
    },
    "skins": [{
        "id": 136000,
        "name": "default"
    }, {
        "id": 136001,
        "name": "Ashen Lord Aurelion Sol"
    }]
}
```

```java
given()
    /* some build up here */
.when()
    .get("/{region}/v1.2/champion/{championId}")
.then()
    .statusCode(200)
    .body("id", is(136))
    .body("title", containsString("Star"))
    .body("image.x", greaterThan(380))
    .body("skins[1].name", not(isEmptyOrNullString()));
```

Met andere woorden: doodeenvoudig! Je vertelt in welke json key je bent geïnteresseerd en welke hamcrest matcher hierop moet worden aangeroepen. Deze syntax voorkomt een hoop boiler-plate zoals het deserialiseren.

Dit kan je op precies dezelfde manier toepassen als het antwoord een XML-document was geweest. Mocht je toch dringende behoefte hebben om op het XML bericht een XPath los te laten, dan kan je dat doen middels `.body(hasXPath(""))`.

Naast het valideren van specifieke waardes in een bericht kan je er ook voor opteren om te valideren middels een schema. Voor Json wordt de Json Schema vocabular gebruikt. Hierbij hoort de dependency `io.rest-assured:json-schema-validator`. Hierna kan je ergens op het classpath een JSON-bestand  toevoegen die voldoet aan Json Schema. Het is dan mogelijk om het request te valideren middels REST-assured door de volgende regel: `.body(matchesJsonSchemaInClasspath(“lol-champion-schema.json")`.

# A note on mocking: WireMock

Let’s recap: We kunnen nu eenvoudige HTTP requests opstellen en het antwoord hiervan valideren. Hierbij wordt aangenomen dat de service die wordt getest al staat te pruttelen en goed benaderbaar is. Veelal is dit niet zo eenvoudig. De applicatie moet ergens werken en als de applicatie gebruik maakt van koppelingen zal daar ook een oplossing voor moeten zijn. Om dit makkelijker te maken kies ik voor de tool WireMock. WireMock is namelijk een mock HTTP-server.

Met WireMock is het mogelijk om een request te definiëren en een bijbehorend response. Vervolgens start WireMock een Netty instantie. Als de applicatie nu een vraag stelt aan WireMock zal hij het correcte response ontvangen. Om WireMock te gebruiken dien je de dependency `com.github.tomakehurst: wiremock` op te nemen. Nu is het mogelijk om WireMock te gebruiken in een test. Zie code listing 10 voor een voorbeeld.
```java
@Test
public void testIAmATeapot() {
  WireMockServer wireMock = new WireMockServer();
  wireMock.start();
  
  wireMock.stubFor(get(anyUrl()).willReturn(aResponse().withStatus(418)));
  
  //Actual test
  RestAssured.get("http://localhost:8080/is-a-teapot").then().statusCode(418);
  
  wireMock.stop();
}
```

Aan dit voorbeeld vallen een aantal dingen op: Start WireMock, mock request met WireMock, voer test uit, stop WireMock. Om dit wat te vereenvoudigen kan je gebruik maken van de `WireMockRule` in combinatie met de `@Rule` annotatie van JUnit. Zie code listing 11. 
```java
@Rule
public WireMockRule wireMock = new WireMockRule();
```

Nu zal er aan het begin van alle testen WireMock worden gestart, na alle testen wordt WireMock gestopt en per test worden alle gemockte testen op WireMock gereset.
Dit zorgt ervoor dat je service testen geïsoleerd zijn en niet toevallig de vorige WireMock configuratie kan raken.

Om een gemockt request op te bouwen dien je eerst aan te geven op welke url WireMock iets dient terug te geven, vervolgens definieer je wat voor response WireMock geeft.
Zie code listing 12 voor een simpel voorbeeld.
```java
wireMock.stubFor(
    delete(urlMatching("/remove/")).withQueryParam("id", ABSENT)
        .willReturn(aResponse().withFixedDelay(200).withStatus(404))
);
```

# To Conclude

Het schrijven van integratie testen is veelal niet triviaal. Het vergt vaak complexere mocking, veel setup en Glue code om de daadwerkelijke test uit te kunnen voeren. In dit artikel heb ik laten zien dat REST-assured veel Glue code overbodig maakt. Dat een developer beschikt over een krachtige, natuurlijke DSL waarmee snel functionele testen geautomatiseerd kunnen worden. Dit in combinatie met WireMock zorgt voor een krachtige combinatie voor het goed door testen van een rest service.


















