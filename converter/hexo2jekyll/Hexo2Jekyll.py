#!/usr/bin/env python
#  -*- coding: utf-8 -*-

import os
import re
from os import listdir
from os.path import isfile, join


def listfiles(path):
    return [f for f in listdir(path) if isfile(join(path, f)) and f.endswith(".md")]


def filename_adapter(name):
    return name.replace('"', "") \
        .replace(" ", "-") \
        .replace("=", "") \
        .replace(":", "") \
        .replace("'", "") \
        .replace(",", "") \
        .replace("(", "") \
        .replace(")", "") \
        .replace("?", "") \
        .replace(".", "_") \
        .lower()


class Metadata(object):
    def __init__(self):
        self.title = ""
        self.layout = ""
        self.date = ""
        self.comments = ""
        self.published = ""
        self.categories = []
        self.tags = []
        self.author = "ivo_woltring"
        self.dict = {"title": self.set_title, "layout": self.set_layout, "date": self.set_date,
                     "comments": self.set_comments, "published": self.set_published, "author": self.set_author}
        self.blog = []

    def set_title(self, value):
        self.title = value.strip()

    def set_layout(self, value):
        self.layout = value.strip()

    def set_date(self, value):
        self.date = value.strip()

    def set_comments(self, value):
        self.comments = value.strip()

    def set_published(self, value):
        self.published = value.strip()

    def set_author(self, value):
        self.author = value.strip()

    def get_blog(self):
        return "".join(self.blog).replace("/images/", "/img/blogs/")

    def year(self):
        if self.date:
            return self.date.split(" ")[0]
        return "YYYY-MM-DDDD"

    def filename(self):
        return "%s-%s.md" % (self.year(), filename_adapter(self.title))

    def __str__(self):
        image = "TODO"
        print image
        if self.get_blog():
            image = re.findall("/img/blogs/*.jpg", self.get_blog())
            print image
            if image:
                print image
                image = image[0]
        return """---
layout: post
title: %s
image: %s
date: %s
category: %s
tags: [%s]
authors: [%s]
comments: true
---

%s        
""" % (self.title.replace('"', "'"), image, self.date, self.categories[0], ",".join(self.tags), self.author,
       self.get_blog())


# ---
# title: "Refactoring to Functional Style"
# layout: post
# date:  2017-10-02 12:42
# comments: true
# published: true
# categories:
# - JavaOne2017
# tags:
# - OOW17
# - java
# ---
def main(out_path):
    files = listfiles(".")
    for f in files:
        with open(f) as fi:
            lines = fi.readlines()
            metastart = False
            categories = False
            tags = False
            meta = Metadata()
            for line in lines:
                # print line
                if line.startswith("---"):
                    metastart = not metastart
                    continue
                if metastart:
                    if line.startswith("- "):
                        line = line.replace("- ", "")
                        if categories:
                            meta.categories.append(line.strip())
                            continue
                        if tags:
                            meta.tags.append(line.strip())
                            continue
                    strings = line.split(": ")
                    if len(strings) > 1:
                        key = strings[0]
                        value = ": ".join(strings[1:])
                        print key, value
                        if meta.dict.has_key(key):
                            meta.dict[key](value)
                            continue
                        if key == "categories":
                            tags = False
                            categories = True
                            continue
                        if key == "tags":
                            categories = False
                            tags = True
                            continue
                    else:
                        print "[ERROR parsing] %s" % line
                else:
                    meta.blog.append(line)
            print meta.filename()
            print str(meta)
            with open(os.path.join(out_path, meta.filename()), "w") as blog_post:
                blog_post.write(str(meta))


if __name__ == '__main__':
    main("/Users/ivonet/dev/ordina/Ordina-JTech.github.io/_posts")
