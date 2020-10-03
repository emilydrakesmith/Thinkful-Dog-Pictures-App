# Introduction

This project is an assignment for my Thinkful curriculum, *Module 12.5: Asynchronous web apps / Simple GET requests*.  The purpose is to practice making a successful GET request and using the returned data productively.

The essential goals as enumerated in the assignment are:

1. Create an app that lets users display up to 50 random dog images from the [Dog API](https://dog.ceo/dog-api/) and print the results to the console.
2. Expand the app to display the returned images in the DOM.
3. Create an additional app to allow users to retrieve a single image of a dog of a chosen breed.

I chose to modify the assignment in a few ways to, in my mind, better follow the spirit of the assignment while achieving a more streamlined and visually appealing product.  I created one single app which accomplishes both core functions; the mechanisms to switch between functions is intuitive and doing so is very easy.  All results are printed to the console.

The app utilizes a mobile-first design which is responsive to accomodate larger screens.

No templates were provided as part of the assignment.  This product fully represents my own original work, with outside support and consultation detailed in the *Special Thanks* section.

This app is also my first project to include a fully-detailed README in its initial commit.

See *Appendix A: Assignment from Thinkful Module 12.5* for more information.

# Version Notes

The version of this app currently uploaded is 1.0.0.  I do not track updates to this README file if there were not associated changes to any other part of the app.

* v1.0.0

Initial commit.

# Instructions for Use

The page will initially load two buttons: *Mix it Up!* and *Let me choose!*.  The user clicks either button which will expose its respective input fields.

If the user clicks *Mix it Up!*:

1. A prompt will appear entering the user to enter a number from 1 to 50.
2. Once the user has provided a valid input, a submission button reading *Show me the dogs!* will appear.  If the user deletes their input the submission button will disappear.
3. When the user clicks *Show me the dogs!*, a results field will appear and display pictures of dogs in the number requested (maximum of 50).

If the user clicks *Let me Choose!*:

1. A drop-down menu will appear asking the user their favorite breed of dog. By default the first item in the list 'affenpinscher' is selected.
2. After choosing a breed, the user clicks the *Show me the dogs!* button to submit the query.  A results field will appear and show a picture of the selected breed.

Notes:

* The user may click either of the *Mix it Up!* or *Let me choose!* buttons at any time to change which functionality they're in.  The page will re-render the input prompt as necessary.
* The types of input fields were chosen to eliminate the possibility of invalid user inputs.  Even if the user inputs characters into the numerical search field the app will convert the string to an integer.
* Details of the search query results can be viewed in the console.

# Tech Framework

This app uses:

* HTML5 and CSS
* JavaScript ES6
* jQuery 3.4.1 slim

I built this app using:

* VSCode 1.49.2
* Chrome 85 (for display and DevTools)
* Postman v7.33.1
* Git-Bash 2.28.0.1
* GitHub (online portal, not desktop)
* Windows 10 Pro v1909

For an easy time reading the code files I recommend using a code viewer that wraps at no less than 160 characters.

# API Documentation

Complete documenation for the [Dog API](https://dog.ceo/dog-api/) can be found [here](https://dog.ceo/dog-api/documentation/).

# Future Plans

In the future I intend to publish this product to my portfolio.  Prior to doing so I would like to accomplish a few more things:

* Clean up the code in general and possibly create nested functions to slim down the larger functions and reduce code duplications.
* Alter the size of returned images so that the largest ones are not grossly large compared to the smallest ones.
* Make the brown background for the results resize smaller when pictures don't occupy a full row.
* Provide user feedback when the user requests > 50 pictures. The API's will not return more than 50 images even if more are requested.
* Generate alt-text for images returned in the query to increase accessibility.

# Contribute

Although I'm always interested in meeting new collaborators I prefer to keep this an individual project as a skills demonstrator.

# Special Thanks

* My mentor with Thinkful, Vincent Ramdhanie, gave me ample assistance troubleshooting my code where I had issues.
* Colors were found through use of the [Coolors Color Scheme Generator](https://coolors.co/).
* Generating a mobile-first responsive web app was much easier using the [Multi-Screen Test Tool](http://whatismyscreenresolution.net/multi-screen-test) at [WhatIsMyScreenResolution](http://whatismyscreenresolution.net/).
* The [Dog API](https://dog.ceo/dog-api/) provided a very nice set of pictures for this app/assignment.
* I found the [Gorditas](https://fonts.google.com/specimen/Gorditas) font via Google Fonts.  It was created by Gustavo Dipre and Brenda Gallo and made available under the [Open Fonts License](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL).
* I found the [Open Sans](https://fonts.google.com/specimen/Open+Sans) font via Google Fonts.  It was created by [Steve Matteson](https://twitter.com/@SteveMatteson1) and made available under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
* Jennifer and Natalie Smith (the programmer's wife and mother, respectively) provided moral support and beta testing.

# Appendix A: Assignment from Thinkful Module 12.5

1. Create an app that lets users choose to display between 1 and 50 random dog images, then prints the results to the console. The app should feature a form with a required input where users indicate the number of images to retrieve, and the input should default to `3`. Use the endpoint described in the "DISPLAY MULTIPLE RANDOM IMAGES FROM ALL DOGS COLLECTION" section of [this page of the DogAPI docs](https://dog.ceo/dog-api/documentation/random).

2. Building on the previous app, create an app that lets users choose to display between 1 and 50 random dog images, then loads the images in the DOM. This app should adhere to all of the requirements from the first one, in addition to displaying the images in the DOM.

3. Create an app that loads a single random image for a specific breed, based on a user input. This app should account for the happy case when the breed is found, as well as the unhappy case when it is not. Use the endpoint described in the "RANDOM IMAGE FROM A BREED COLLECTION" section of [this page of the DogAPI docs](https://dog.ceo/dog-api/documentation/breed). Note that the API will return an HTTP status code of 404 along with a JSON object with info about the error if a request is made for a breed that can't be found.

The above text was copied from Thinkful's materials which are proprietary and being republished with permission in this README file.  All original formatting was preserved insofar as it can be reproduced with the technical limitations of a `.md` file.