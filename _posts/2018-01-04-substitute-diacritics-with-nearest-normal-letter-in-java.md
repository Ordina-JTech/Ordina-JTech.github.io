---
title:  "Substitute Diacritics With Nearest Normal Letter In Java"
date:   2018-01-04 09:15
categories:
- Programming
tags:
- java
- text
- diacritics
- special characters
- accents
author: ivonet
---


# Challenge

You have a file with lots of diacritics but need to have them as "normal" text.

<!-- more -->

# Solution

Here it is.  
Simple if you know it, but hell to find out if you don't. 

```java
import java.io.IOException;
import java.nio.file.Files;
import java.text.Normalizer;

import static java.nio.file.Files.readAllBytes;
import static java.nio.file.Paths.get;

public abstract class Diacritics {
    public static String removeAccents(final String text) {
        return (text == null) ? null : Normalizer.normalize(text, Normalizer.Form.NFD)
                                                 .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
    }

    public static void main(final String[] args) throws IOException {
        final String in = "<path to file with diacritics>";
        final String out = "<path to file without diacritics>";
        final String words = removeAccents(new String(readAllBytes(get(in))));
        Files.write(get(out), words.getBytes());
    }
}
```


        
