Reactive HTML with Meteor
========================

* Speaker   : David Greenspan
* Available : All
* Duration  : 30 mins

Description
-----------

Meteor is a full-stack web framework that brings new principles to
application development.  Using pure JavaScript on the client and
server, apps define both a rich client and a server-side data endpoint
that work together so that database updates stream in realtime all the
way from the backend to the DOM.  Meanwhile, client-side database
mutations are simulated locally but are still securely validated on
the server.  Unlike previous reactive web frameworks, Meteor lets you
use your favorite database, template language, and JS/CSS
preprocessors, while making it all realtime.

Spark is Meteor's library for live-updating HTML.  Normally, web apps
must both *declare* their views and then *update* them with separate
logic.  For example, a chat view is rendered to HTML as a series of
DIVs, and then, when a new chat message comes in, there is update code
to append a new DIV.  Or, a button might have certain properties, like
its class and whether it's disabled, that depend on some local state
or even database state.  This button must both occur in some original
form in HTML and be updated from JavaScript.  To make matters worse,
often the original HTML is declared on the server, while the update
logic happens on the client!

Spark gets rid of the update step by automatically re-rendering parts
of the DOM when their HTML needs to change.  It can even "match and
patch" your templates to apply arbitrary changes to the HTML without
disturbing form fields and other sensitive elements.  Spark supports
browsers going back to IE 7 and takes care of the browser hacks for
you.  Code that uses Spark can also run in a server environment with
no DOM to generate static HTML.

Speaker Bio
-----------

Before coming to Meteor, David Greenspan created EtherPad, a web-based
collaborative document editor, which was acquired by Google and
open-sourced in 2009.  Before that he founded AppJet, an early
server-side JavaScript platform.  David holds two SBs from MIT in
Computer Science and Physics.


Links
-----

* Company: http://meteor.com/
* Github: http://github.com/meteor/meteor
