keg.io
======
_arduino- and node.js-enabled kegerator_

* Speaker: Chris Castle
* Available: any time 11/8-11/9, 2012
* Duration: 30 or 60 minutes
* Ideal audience: node.js practitioners, arduino/hardware hobbyists, beer drinkers

keg.io is a technology-laden kegerator project originally developed by Vivaki Nerve Center employees to satisfy their nerdiest beer-drinking needs. It's built on node.js and utilizes an arduino microcontroller to interface with the keg's hardware and sensors.

Come learn how we built it -- from learning about hardware (never soldered _anything_ before this project), to learning Arduino, to the trials and tribulations of debugging hardware and software… at the same time (fml).  Also I'll talk about how you can get one in your office!

Check out [http://keg.io](http://keg.io) for more details.

Talk Outline
-------------
1. What is it
	- Picture of system, diagram of components
2. Why we built it
	- wanted to learn node, wanted to tinker with hardware, like to play with data, and like drinking beer
3. How we built it
	- v1: node.js talks serial
		- node.js runs on server beside kegerator, serial connection to arduino (i.e. kegerator)
	- v2: node.js goes to the cloud! (persistent, grey Seattle-style)
		- node.js server is an HTTP endpoint at AWS that arduino (i.e. kegerator) talks to
		- server also provides public web-based dashbaord ([keg.io](http://keg.io)) and beer consumption stats API
4. Demo!
	- Hopefully I can bring a built-out kegerator with me.  If not, I can shoot a video for the demo, but it won't be as exciting.  If I do bring one, I can have it setup throughout the conference for people to pour themselves a tasty beer.
5. What's next?
	- Post-pour hooks? (node.js server makes a POST request to custom endpoint when you do a pour)
	- More stats and data visualization
	- Too many ideas!  Really we just want to get to the point where anyone can contribute a small piece to the project.  AND get one setup in every nerdy, developer-filled office we can.
	- We also realize there could be a business opportunity here but haven't explored that too much.
6. Audience Q&A

_Talk length is flexible. I could use 60 minutes (including Q&A) or 30 minutes or, less ideally, could squeeze the talk in to a 10-minute lightning session._


Personal Bio
------------
Crude and cynical observer of the world.  Incurable optimist day-to-day.  Tinkers with APIs while consuming IPAs.

![Chris Castle](https://raw.github.com/crcastle/cascadiajs.github.com/master/proposal/images/crcastle.png)

* I'm Chris Castle [crcastle@gmail.com](mailto:crcastle@gmail.com)
* I twitter [@crc](http://twitter.com/crc)
* I'm [crcastle](https://github.com/crcastle) on the githubs
* I dwell in the [Central District](http://en.wikipedia.org/wiki/Central_District,_Seattle) of Seattle
* Most of my waking hours I'm thinking about code and keeping the [amazing group of people](http://simplymeasured.com/about/our-team/) at [Simply Measured](http://simplymeasured.com) happy and making an awesome product (p.s. [we're hiring](http://simplymeasured.com/about/careers/))
