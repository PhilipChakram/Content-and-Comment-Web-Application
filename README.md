# Project Readable
Project Redable is a content and comment web application. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

There are three categories (react, redux and udacity) into which users can post. Users can add, delete and edit posts and comments. Users can also vote for a patricular post or comment.

Users can navigate to a particular category using the URL http://localhost:3000/:category. Post details are available at http://localhost:3000/category/:post_id.


# Running and setup
The setup for the project is straight-forward. Navigate to the 'front-end' folder in your terminal use ```npm``` to install the application.
```sh
$ npm install
``` 
After the installing the application, use ```npm``` to start the application.
```sh
$ npm start
``` 

The server can be run by navigating to the api-server folder and by using the ```node``` command to start the server.
```sh
$ node server
```