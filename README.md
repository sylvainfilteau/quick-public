Introduction
-------------

quick-public is a tool aiming to facilitate the creation of a HTTP server with the content of a directory.

The primary use is when you want to test quickly an html page doing some ajax stuff, you need to run the page over HTTP. In the past, I created a Vhost on Apache and setup permissions to let the webserver see files on my home directory. But no more ! All I have to do is :

node path/to/quick-public

and browse to localhost:3000.

Requirements
-------------

You need to install [node.js](http://www.nodejs.org), [express](http://www.expressjs.com) and [jade](http://jade-lang.com/).

History
--------
The history of the project is almost inexistant... but I can explain how it started.

I wanted to learn nodejs since I really like coding in javascript. I installed nodejs and expressjs and started to read documentation over the internet.

Then, I copied a sample code from the expressjs documentation and started the project with that.
