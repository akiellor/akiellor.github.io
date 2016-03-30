<meta name="tags" content="electronics" />

# Building a keyboard

I've been wanting to get into building a physical hardware something. A keyboard seemed like a pretty good place to start.

I started searching the internet for people that have done such a thing, and it turns out there are a lot and people have done it different ways.

* Complete DIY - [My First Keyboard Build](http://www.davecooper.org/blog/2014/10/15/i-built-a-keyboard/)
* In days gone by there were [Group Buys](https://geekhack.org/index.php?topic=23572.0)
* And kits like [ErgoDox](https://www.massdrop.com/buy/ergodox) and [Atreus](http://atreus.technomancy.us)

I started down the complete DIY path, and found some good suppliers for parts. But it was turning out to be a lot of work in something that I was confident would work at the end. So instead I went for the [Atreus](http://atreus.technomancy.us) kit.

The website has an ordering form and I received a personal email from [@technomancy](https://twitter.com/technomancy) giving some options for payment. I paid and within a week or so I received the kit.

## Unboxing

The kit includes all the parts required to build the keyboard as well as the instructions. Definitely read the instructions, they were super helpful and went to the level of complete beginner by explaining things step by step. Which is great for someone who is [science dogging](https://thesciencedog.files.wordpress.com/2013/09/golden-retriever-and-science1.jpg) it.

![Unboxed](./posts/12-building-a-keyboard/01-unboxed.jpg)

## Diodes

Since I had decided not to apply the finish to the keyboard, I jumped straight into soldering the diodes. This was the first time I had ever soldered something, so this was nerve-racking. The instructions did include some good links to soldering tutorials which did give some confidence.

![First Diodes](./posts/12-building-a-keyboard/02-first-diodes.jpg)

## Microcontroller

The Atreus Keyboard uses a A-Star microcontroller to handle all the switch signals. Soldering it to the board was a little more tricky than the diodes as the contact points were much closer together and any slag could at best make the keyboard behave unpredictably and at worst be completely broken. I took a lot of time here, but maybe should not have, as I ended up scorching the microcontroller in a few places.

![Microcontroller](./posts/12-building-a-keyboard/03-microcontroller.jpg)

## Switches

With the controller in, next up are the switches. The instructions recommended starting with the corner four switches, then the lowest row and the right most column. With a complete row and column it is possible to debug all the pins connected to the controller.

![Debug Switches](./posts/12-building-a-keyboard/04-debug-switches.jpg)

At this point, with multiple attempts and some fiddling, I was able to load the [firmware](https://github.com/technomancy/atreus-firmware). I was pleasantly surprised to find that the firmware uses a pretty standard Arduino tool-chain and is implemented in C. When I get some more time I'll be sure to tinker with it some more.

With the firmware loaded and the keyboard into my computer, I was able to test some keys. I found that one of the columns was not behaving, my heart sank. I started thinking of all the parts I had soldered in that keys circuit and started getting really nervous at the thought of having to desolder a whole boatload of things. To debug this I checked all the diodes in the column and then tracked everything to the pins on the microcontroller, it all seemed fine. I doubled back to the switch and noticed I had missed one of the pins. It was an amateur mistake, but easily fixed.

Now the board passes the preliminary checks, I put in the rest of the switches.

![All Switches](./posts/12-building-a-keyboard/05-all-switches.jpg)

## Finishing Touches

The last few steps of screwing the keyboard case together and pressing on the keycaps were all pretty trivial, although I did find I had to apply more force than I expected to get the keycaps on.

## Complete

This project taught me a lot about electronics especially soldering and microcontroller firmware, but more importantly it has given me a lot more confidence to try some more hardware projects.

It is all stuff that can be learned.

![Complete](./posts/12-building-a-keyboard/06-complete.jpg)
