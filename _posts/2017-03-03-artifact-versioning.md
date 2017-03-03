---
title: "Artifact Versioning"
date: 2017-03-03 13:25:00 +0100
categories: ci cd
author: bertkoor
---

A common problem in CI/CD (Continuous Integration / Continuous Delivery) build pipelines using Maven is to keep the artifact version unique. 
It’s usually hard-coded in the `pom.xml` and many times developers forget to increment it before triggering a new build. 
And before you know it you have to ask a tester whether she tested the version 1.2.3 built yesterday or v1.2.3 built last week.

Maven does have some facilities for that (e.g. the [maven-release-plugin](http://maven.apache.org/maven-release/maven-release-plugin/)) 
but imho it’s more complicated to implement that than to simply adjust the version in the `pom.xml` yourself. Just edit it, commit & push, done!

One approach I’ve used for small projects is to use the build ID already handed out by Jenkins as a component of your artifact version. 
Maven does not like property values in the `<version>` element, but I found out 
[since Maven v3.2.1](https://maven.apache.org/docs/3.2.1/release-notes.html) there are some exceptions.

Allowed property expressions in a version are `${revision}`, `${changelist}`, and `${sha1}`.

So if you define your artifact with `<version>${revision}</version>` you’re free to set the revision property elsewhere, 
and let that include the Jenkins build id which is available as `${env.BUILD_NUMBER}`:

```
<project>
   <artifactId>foobar</artifactId>
   <version>1.2.${revision}</version>
   <properties>
      <revision>${env.BUILD_NUMBER}</revision>
   </properties>
```

But what if you’re ready for the next major or minor version? You’d want the build number to reset also. No easy way to trick Jenkins you’d think? 

You can clone the build item in Jenkins, then it will start with a fresh build number. 
After that delete the original item and rename the clone back to the original name of your build item.

The approach described above is not usable in all scenarios. 
What I have also encountered as a good solution is that the Nexus repository to which the artifact is published is configured to reject updates of already existing artifacts. 
Then your build will fail at the very end.

Failing at the last ‘deploy’ step is a bit late when you have a build that takes several minutes or maybe even hours to finish, 
while it would be trivial to make that the first thing to check. 
To do just that I have written a Maven plugin which already at the ‘validate’ stage fetches the `maven-metadata.xml` of the artifact from the remote repository, 
and look up whether the current version is already listed in there. 
Then the build will fail immediately and won’t give you any false hope it’s all going well.
