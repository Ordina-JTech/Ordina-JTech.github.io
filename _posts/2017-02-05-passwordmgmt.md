---
layout: post
authors: [casmarrav]
title: 'Using a password manager'
image: /img/blogs/password-manager.jpg
tags: [Security]
category: Security
comments: true
---
## The why
You only have to [google once](https://www.google.nl/search?q=stolen+password+OR+identity+news) to read about multiple instances of identity theft in the past few months. Even Edward Snowden had some wise remarks about password safety: [video](https://www.youtube.com/watch?v=yzGzB-yYKcc). In short: just like [xkcd](https://xkcd.com/936/) said, it's better to have a long, memorable, password of one character set, than it is to have a short (especially less than eight characters) one consisting of all colors in the `ASCII` rainbow. For those who read xkcd every once in a while: Correct Horse Battery Staple, *wink wink*.
Until about a year and a half ago, my workflow surrounding passwords was pretty much as follows:
- Have two to three 'default' passwords - of no more than 8 characters
- Change 'default' passwords about once every 4 years
- Only ever use the new default password when I forgot the old one, or when I'm subscribing to a new service
- Never write any password down anywhere.

Only the not writing passwords down was a good thing about this evolved strategy. I would call this a password *remembrance* strategy (a faulty one at that, seeing how often I had to click on "forgot password" links). This might not be your password strategy.. but it's probably your grandma's, your little brother's, your girlfriend's, in short, the strategy employed by everyone you care about.

## The how

At some point I needed to manage a platitude of servers remotely, all set up with a variation of the same password. I was given an encrypted file to open with a password management program. Now if your current password strategy is like mine was in the above story, you'll be glad to know there is a better way. For the server maintenance and deployment management I started using this free tool, [KeePass2](http://keepass.info/download.html). Later, I learned that on Mac there is no free replacement, but the paid [KyPass](http://www.kyuran.be/software/kypass4mac/) serves the same purpose, and almost exactly as well. My new workflow, using what is now an actual password *management* strategy, goes somewhat like this:

- Have one (absurdly long) master password for the password management program that I write down for about a week until I've fully memorized it
- Have one password for gmail that I can remember
- Change above passwords at least once every year
- For everything else, use generated passwords of some length, consisting of random characters, that I never have to remember or even type
- Once every so often I will make an effort to change these generated passwords on all sites and accounts inside the password management database.

A security-wise developer might frown at the third point. How do you get the password into the site you are using? You copy and paste. Both KeePass and KyPass have a copy mode where the password only stays on the clipboard for about 15 seconds, before it vanishes. Altogether no solution is airtight, but this one is most definitely better than the old/default one.

## The now (and forever)

It's really easy for a developer to switch to a safer future, but it might not be as easy for others. After you free your own mind from password *forgetting* strategy worries, you might contemplate helping your close ones protect themselves from identity theft.

----

### BertKoor commented on 07-FEB-2017:

> In case you need a 'classic' generated password, [here](http://www.bertkoor.nl/GeneratePassword.html)'s a little html/javascript thingamabob I created for that.
