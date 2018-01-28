---
title:  "Create your own mobile monitor - Part 1"
date:   2018-01-28 18:56:54
categories:
- DIY
- IoT
tags:
- iot
- diy
- driver board
- monitor
author: ivonet
---


<img src="/assets/images/blog/2018/create-your-own-mobile-monitor---Part-1/old_monitor.jpg" style="width: 50%;height: 50%;display: block;margin: 0 auto;"/>

This will be a multi-part blog about a hobby project I embarked upon.

The idea is to create my own portable monitor from an old laptop screen. I have an old Sony Vaio laptop with a 15" 1280x800 monitor.
The laptop does not work anymore but I know that the screen was fully functional.

So just for a fun project I decided to see if I can make it into a mobile monitor. It is still
an ongoing project and I will make it into a sequel as I go. It will be a journey for me as I have 
never done something like this before. Actually when I started I didn't even know if it could be done...

<!-- more -->

# Goal

I this first part I will explain my specific goal for this project and what progress I have already made.

The goal is to create a mobile monitor from my old laptop screen (for cheap). The screen is quite good even though it is not an HD.
I think it is worth saving for a few bucks. It also seemed like a fun project to do :-)  
I need and love fun projects!
With mobile I actually mean that it should be portable in the sense that it should have it's own power supply and possibly even 'streaming' video?!
As it is a laptop screen it should be possible to power it on batteries. It should of course also be possible to power it with a socket plug.
I want HDMI / VGA / Composite / DVI connections as it should be multi purpose. When connected to HDMI it should also produce sound.
Well that's it I think... for now :-)

## What's needed?

* Old laptop screen
* Driver board for the screen 
* Step up converter
* Speakers
* Spacer screws
* Batteries
* Battery holders
* Battery charger boards 
* HDMI Cable
* MDF wood board
* Vinyl sticker
* Epoxy glue
* Monitor stand
* DIY Tools

### Old laptop screen

If you save something you have something to play with or it might make you a hoarder :-) I hope to stay shy of the hoarder part, but in this case 
I'm happy that I saved the old laptop. As I was cleaning the attic I came across it and got the idea... 

Before I actually started disassembling the laptop I did a google search to find out if it was possible have the monitor working independent of the laptop.
I is possible! and the project got a 👍.

So to get the monitor out of its casing and get the information needed.


In order to get the monitor to work as it's own screen you need a so called 'driver board'. On the back of the screen you find part number(s) and if you google that
in combination with the 'driver board' search terms you will find what you need on sites like aliexpress or ebay.

In my case I found mine [here](https://nl.aliexpress.com/item/T-VST59-03-LCD-LED-Controller-Driver-Board-For-TX39D80VC1GAA-TV-HDMI-VGA-CVBS-USB-LVDS/32811383487.html) 
for about 26 dollars. I ordered it and in about two weeks it arrived...

<iframe width="560" height="315" src="https://www.youtube.com/embed/e4xdZ4oV9lQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

As you can see in the short video it works! Yeah!!! 
Here the journey really started because it was not as straight forward as Internet made me believe. In all the video's I saw all the screens only had 1
inverter cable. I had two but was scared to connect them. After almost an hour of not having a backlight (I did see something on the screen but very dark) I 
made an educated guess and tried both cables on my screen in the driver board. It made all the difference, but it could also have been the end of this project.

<img src="/assets/images/blog/2018/create-your-own-mobile-monitor---Part-1/create-your-own-mobile-monitor---Part-1_03.JPG" style="width: 50%;height: 50%;display: block;margin: 0 auto;"/>

Now I have a working screen, which is the most important part of the project 😄, but all the other parts were still in transit. The waiting game has started...

<img src="/assets/images/blog/2018/create-your-own-mobile-monitor---Part-1/create-your-own-mobile-monitor---Part-1_06.JPG" style="width: 50%;height: 50%;display: block;margin: 0 auto;"/>

There are cheaper driver boards available for this model screen, but as I wanted audio out and all the connectors I went for the one mentioned.
Be careful to make sure the driver board is for your monitor!

### Step up converter

A step up converter or also called a [boost converter](https://en.wikipedia.org/wiki/Boost_converter) is a DC-to-DC power converter that steps up voltage from its input (supply) to its output (load).
This is needed for the mobile power supply. I have 18650 batteries at my disposal and they provide 4.2 Volt fully charged and 3.7 Volt nominally. These
batteries have been revived from old laptop batteries.

<img src="/assets/images/blog/2018/create-your-own-mobile-monitor---Part-1/create-your-own-mobile-monitor---Part-1_1.jpg" style="width:50%;height:50%;display: block;margin: 0 auto;"/>

This driver board requires DC 12V 3.3A input power for LCD size under 17inch. I'm a bit concerned about the 3.3A because that is quite a lot for batteries.
I hope the boost converter will take care if this.

<img src="/assets/images/blog/2018/create-your-own-mobile-monitor---Part-1/create-your-own-mobile-monitor---Part-1_2.jpg" style="width:50%;height:50%;display: block;margin: 0 auto;"/>

I bought [XL6009](https://www.aliexpress.com/item/1pcs-DC-DC-Adjustable-Step-up-boost-Power-Converter-Module-XL6009-Replace-LM2577/32355892507.html) for € 3,39 for 5 pieces.

I received them yesterday and of course tried them out immediately. I have more research to do. I can get the monitor to function on batteries, 
with the converter, but I'm not happy with the results. I was hoping to use a standard USB power-pack created from the revived 18650 batteries,
but that was not the success I was hoping for.
I can convert the USB output (5V) to the required 12v with the converter but the screen would only flicker for a second and turn off again. So I guess not enough juce.
The power-bank I used can provide 5v at 2 Amps, but as it seems it is not enough.
When on my power supply you can see (video) that at 12V the monitor pulls about 1.6 Amps. I am not a electrician and most of what I'm saying here 
I don't understand fully and I have to learn this stuff as I go.
So after lots of fiddling I could get the monitor to function on the 18650 batteries if I put three in series and turned the boost converter back
to about 8 volts. The trouble is that, when I connected a speaker to the audio out it would not produce audio. Again lots of playing around and 
to my dismay I could not get it to work. Either the sound worked or the display on battery power but not both. When plugged in it was no problem and
both worked fine.

So I need more research or your [help...](http://ivo2u.nl/5x) Please do if you can help me in the comments below.

Luckily I have the time to do the research as I have not received all the components yet (like the speakers)

### Other components

* I have bought some 6 mm and 3 mm MDF wood board at my local DIY store. I want to have a sturdy screen. (about € 6,=)
* I bought vinyl wrap [here](https://www.bol.com/nl/p/3d-carbon-car-wrap-folie-vinyl-auto-car-wrapping-carbonfolie-300-x-30-cm-zwart/9200000064224366/) which looks like carbon. It was actually quite expensive and I hope to be able to use it for more than 1 project, otherwise I'm building an expensive screen 😂. (€ 24,95)
* I bought some [spacer screws](https://www.aliexpress.com/item/MTGATHER-160Pcs-M3-Nylon-Black-M-F-Hex-Spacers-Screw-Nut-Assortment-Kit-Stand-off-Set/32802369082.html) to get the board attached to the MDF board and give it a bit of breathing room and for the back plate. (€ € 2,94)
<img src="/assets/images/blog/2018/create-your-own-mobile-monitor---Part-1/create-your-own-mobile-monitor---Part-1.jpg" style="width: 50%;height: 50%;display: block;margin: 0 auto;"/>
* The TP4065 charger board for 18650 batteries I already had from other projects (about a $1,50 a piece)
<img src="/assets/images/blog/2018/create-your-own-mobile-monitor---Part-1/tp4065.jpg" style="width: 50%;height: 50%;display: block;margin: 0 auto;"/>
* The speakers come from [here](https://www.aliexpress.com/item/2pcs-for-V29-V59-V56-3070-4-Ohm-5W-Passive-Speaker-Small-Loudspeaker-Universal-LCD-Driver/32830708912.html) but have not yet arrived. (€ 3,09)
* Stuff like solder and epoxy I have available

# Status

The monitor works and that gives me the confidence to say that creating the monitor will probably succeed, but
that I have a challenge getting it to have it's own power supply. 
Most of the parts I ordered have been very cheap except for the vinyl wrap. I hope that it is not a wasted investment and that I can do more projects with it. 
That would make it less expensive on this project.

All in all I'm happy with what I have at the moment and when the speakers are in I will start on the second part of this project.
In the mean time I will do some research and hope on your help.

Your help is appreciated if you know more about electronics and give me some pointers on how to get the monitor working on just 18650 batteries.
I also want them to be chargeable with the TP4065 modules so if I need to have my batteries in series I would also like the help on how to charge them then?!

[Feedback is very welcome...](http://ivo2u.nl/5x)

To be continued... (hopefully very soon)

