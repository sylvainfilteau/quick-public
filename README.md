quick-public is a tool aiming to facilitate the creation of a HTTP server with the content of a directory.

The primary use is when you want to test quickly an html page doing some ajax stuff, you need to run the page over HTTP. In the past, I created a Vhost on Apache and setup permissions to let the webserver see files on my home directory. But no more ! All I have to do is :

node path/to/quick-public/app.js

and browse to localhost:3000.
