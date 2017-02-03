---
title:  "REST-assured!"
date:   2017-02-02 21:48:13 +0100
categories: integration-testing
author: ivo_woltring
---

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
