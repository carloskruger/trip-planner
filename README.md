# Trip Planner

Trip Planner is an app that runs on a Express server on the back end and React on the front end. It uses also a Postgres database to hold data.

Its purpose is to assist people with their travel planning and also to store their notes about previous travels. It allows you to save trip information, and add notes and pictures as well.

To install the app, just fork it and install with the
npm install command. You can run it using both:

npm start

nodemon server/index.js

## Register/Login

This is the first page that you will see. If using it for the first time, you should register. It will prompt for an username, a useremail and a password.

To login you use your username and the password. After you login, the Navigation Bar will appear.

## Navigation Bar

It shows:

Trip Planning

Upcoming Trips

Completed Trips

Logout

## Trip planning

This will show you a box where you can enter a trip with a destination, ad departure date and a return date. You can save this trip by clicking the save trip button. It is hosted at:

[Travel App](http://tripplanneronline.com:3950/)

## Upcoming Trips

This will show you your list of upcoming trips. Each trip is clickable and it will show you the list of saved notes and pictures. Here you can also mark a trip as conmpleted.

You can also save pictures and notes. The pictures location has to be an URL

## Completed Trips

Here, you will see a list of completed trips and you can still click on each trip and add pictures and notes.

## Logout

This will take you back to the Login/Register screen
