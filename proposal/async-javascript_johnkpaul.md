Asynchronous Javascript - callbacks are so old school
========================

* Speaker   : John K. Paul
* Available : Nov 8 and 9
* Duration  : 45-60 mins based on need

Description
-----------

Javascript developers can't get enough of callbacks.  It's been our tried and true workhorse when dealing with asynchronous code since the dawn of ajax. With the advent of nodejs, we've taken things to the extreme. Now, if we want to make a database query, respond to a web server request, or make a rest call to a web service, we need deeply nested callbacks in order to achieve what we need. In time, this phenomenon becomes the pyramid of doom, where we need 500 character of horizontal screen width to read all of our code.

The issue here isn't that we are using asynchronous code, but rather that we aren't using the best design pattern for the job. I'd like to talk through a relatively new paradigm for control flow in javascript, the promise. Using this technique, you can develop an much more straightforward asynchronous javascript application. Not only is it a way to remove the need for callbacks, but it opens a door to new design possibilities, without the complexity of continuation passing style. Rather than passing all of our callbacks as arguments, we will take a higher level, and more functional approach, by creating a system that expects promise objects to eventually produce data, and we manipulate that data expecting that it will exist in the future.

Note to organizers:
This will be an evolution of a talk at the 2012 Pittsburgh Tech Fest which you can view here:
https://vimeo.com/49946885

Speaker Bio
-----------

![johnkpaul](https://secure.gravatar.com/avatar/eee585a10c1d7c4f1f30e28077ffa720?size=256)

John K. Paul is the VP of Engineering at Avagen Ventures and former lead front end software engineer at TheLadders.com.  He is a contributor to numerous open source projects including learn.jquery.com.  He has spoken to various startups around NYC about front end development, and scalable engineering practices, in particular, unit testing javascript. Additionally, he has taught Javascript and jQuery fundamentals to teams throughout the NYC area.

Links
-----

* Blog: http://johnkpaul.tumblr.com
* Github: http://github.com/johnkpaul
* Twitter: http://twitter.com/johnkpaul
* Vimeo: http://vimeo.com/johnkpaul
* SpeakerRate: http://speakerrate.com/speakers/110621-john-k-paul
