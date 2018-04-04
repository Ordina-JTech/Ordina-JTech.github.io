---
title:  "Presentation Mode On Your Mac"
date:   2018-04-04 09:37:28
categories:
- Programming
tags:
- Apple script
- presentation
- automation
- personal effectiveness
- efficiency
- do not disturb
author: ivonet
---


<img src="/assets/images/blog/2018/presentation-mode-on-your-mac/presentation-mode-on-your-mac.png" style="width:50%;height:50%;display: block;margin: 0 auto;"/>

When giving a presentation you do not want to have distractions like notifications and Dropbox syncs etc.

So why not automate this...

<!-- more -->

# Why

Computers nowadays are much more than glorified calculators. In my case they quite literally organize my life. The computer tells me when I have an appointment or when to 
start driving to miss traffic jams on my route, but also when someone wants to talk to me it just barges right in and gives me notifications.

Most of the time I find these intrusions in what I am doing fine and wanted, but not when giving a presentation. What if it is a really dirty joke...

Could get embarrassing.

# Checklist

So I have this checklist of things to do before giving a presentation.

- Disable automatic updates
- Put on "Do not disturb"
- Set LittleSnitch to "Silent Mode > Allow connection attempts"
- Turn off:
	- Dropbox
	- Google drive
	- other cloud services (unless needed)
	- chat(s)
	- Franz
	- etc
- Close all non essential applications
- Start all essential applications
- Make sure all is initializes for the start of a talk
	- Todo lists again on not done
	- revert repositories
- All on one desktop
- Turn on caffeine (no screensavers for us)
- Check internet connectivity
- Check beamer connectivity 

Not all of these items can be automated but some of them can.

So I have created a list of things I can automate because I want them done always.

It consists of not being disturbed with notifications an killing all the cloud apps I have running.

So I automated it :-)

# Automation

I used apple script to automate what I want because I can save such a script as an Application making it readily available anywhere on my mac (Spotlight).

## Presentation Mode

To create the `PresentationMode.app` just open the `Script Editor.app` on your mac and create a new script and paste the following text into the editor.

```
tell application "Dropbox"
	quit
end tell
tell application "SynologyDrive"
	quit
end tell
tell application "CloudStation"
	quit
end tell

 
set tDate to do shell script "date -u \"+%Y-%m-%dT%TZ\"" -- the current date in UTC time. --> "2016-04-04T17:03:04Z"

do shell script "defaults -currentHost write com.apple.notificationcenterui doNotDisturb -bool TRUE; defaults -currentHost write com.apple.notificationcenterui doNotDisturbDate -date " & tDate & "; osascript -e 'quit application \"NotificationCenter\" ' && killall usernoted" --this set 'Do not disturb' to true in the pref
```

<img src="/assets/images/blog/2018/presentation-mode-on-your-mac/presentation-mode-on-your-mac_2.png" style="width: 50%;height: 50%;display: block;margin: 0 auto;"/>

Of course you need to remove the could services you do not use or add the once you do use and then save it like te picture below shows.

<img src="/assets/images/blog/2018/presentation-mode-on-your-mac/presentation-mode-on-your-mac_3.png" style="width: 50%;height: 50%;display: block;margin: 0 auto;"/>

Just sure you save it as an Application and then you are set.
Just run the `PresentationMode.app` and you will see the cloud services disappear and the do not disturb being turned on.


## Normal Mode

To turn the stuff back on just do the same exercise again but no with the text below (adjusted to your needs of course) and save it as `NormalMode.app` and have fun 😄

```
launch application "Dropbox"
launch application "SynologyDrive"
launch application "CloudStation"

do shell script "defaults -currentHost write com.apple.notificationcenterui doNotDisturb -bool FALSE; defaults -currentHost delete com.apple.notificationcenterui doNotDisturbDate; osascript -e 'quit application \"NotificationCenter\" ' && killall usernoted" -- this set 'Do not disturb' to false in the pref
```

# Extra

Because it took me a while to figure out how to enable/disable the Do Not Disturb sign I also created an app to only set that button by just using the last lines of the above scripts.


# Discussion

If you have a better solution to this challenge or a completely different approach, please let me know in the comments below.        
