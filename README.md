# Yarnscape

**Yarnscape** is a website that serves as a platform for users to browse through all the different types of yarns available, as well as contribute their own experiences with the yarn to allow others to make more informed decisions while choosing what yarn to use for their next project.

As a crocheter/crochetier myself, I often struggle to find affordable and good quality yarn for the various items that I want to make. With the different factors that you have to consider while shopping for yarn, this process can be quite tedious as it requires some research and planning to make sure you choose suitable yarn.

Therefore, I wanted to create a platform to collect data on the best yarns to choose for different kinds of projects, and the most liked yarns among the community. The platform will make the process of choosing yarn easier for my fellow hobbyists interested in yarn craft, and will also serve as a space for creative discussion and community building. The data collected from analyzing user reviews can also be used for monetization, if we want to open an online shop for users to buy the top rated yarns for their projects.

Live Website: [Yarnscape](https://youtube.com)

**assume that images are uploaded as url (imgur)**

## 1. UI/UX

This section will dive deeper into the strategies and thought processes while designing the UI/UX for the website.

### User Stories

[Click here to view user stories Google Doc](https://docs.google.com/document/d/1yOHypQABOq7tdAAkWjRj3wQ_N3t-oayXPK7v9hBOPCk/edit?usp=sharing)

### Related Documents/Diagrams

> Share links to wireframes, mockups, diagrams that are used in the
> UI/UX processes. Those files can be pushed to the Github repository,
> or be placed in a separate PDF file as part of the repository.

### 5 Planes of UI/UX

For the Strategy plane, I wanted to address the issue for my target audience - people who craft using yarn, who struggle with having to do multiple research and heading down to stores in order to test or feel the yarn that they wish to use. The objective of the website is to accumulate various reviews of different types of yarns which will assist the users by removing the need to browse multiple sites in order to get real, first-hand reviews on the yarn.

Thus for the scope, I decided to include features that allow users to filter or sort yarn types such that it is easier for them to identify the type of yarn they wish to see, saving them time so they don't have to keep scrolling to find what they want. **On the functions specifications side, I also wanted to include a feature to save previously discovered yarns in the functional specifications.** (need rephrasing) Meanwhile, in the content requirements I will list information like images of each yarn, its name, recommended hook or needle size, weight, color, brand, and material.

For the structure on the interaction design side, users will be able to interact with the site easily with the organization strategy I am using as each ‘Card’ will lead them to Details and Reviews of each Yarn. If errors are made, users can edit the review they have posted. On the information architecture side, I will be structuring the content the product offers in a way that makes it easy for users to find what they’re looking for. This can be conveyed through documents like the site map, which outlines the hierarchy and pattern of each part of the product. This could include a home page where users can enter a color of yarn they wish to look for in the search bar. This would then lead to a cluster of cards each with a link that takes users to pages for the individual yarns.

For the skeleton, I have decided to go with Sans-Serif fonts in the wireframes including the buttons, links, images and text. There will be Navigation buttons on the top of the Home Page and these will be laid out in such a way that ensures that users can quickly move through each page to find the information they need, while also understanding which elements of each page are interactive and which are not. I have decided to go for a dark background such that each element is highlighted and it is easier for the user to read, and emphasis on the image of each yarn. The Sans-Serif fonts is user-friendly and makes the website feel more welcoming to users.

For the surface and visual design, I used a consistent colour palette and layout throughout the website, where the logo appears at the top left of the page, and the most important information appears in a wide column in the middle of the page. This layout anchors users with its consistent visual style while enabling them to easily find the information they’re seeking. This is the final ‘look-and-feel’ of the website and is what triggers feelings and emotions that will lead them to choose my review website over another.

### Considerations for different devices

My strategy to design across different devices is to adapt the experience for each group for each context of use. I will have to identify the different scenarios in which my website will be used across the different devices, and design an experience suitable for each of those scenarios. Different screens also allow for different input methods. Touch inputs - tap targets like CTA buttons have to be adequately sized and spaced well which gives my user interface breathing room. For large screens, I have to ensure that images do not lose quality as they scale up. Providing a consistent experience is crucial through multiple devices.

## 2. Features

> List down the major features of your application, and also the
> algorithms or techniques that you have used to implement those
> features. If there are any limitations or bugs, please describe them
> as well. If you have any features pending implementation , you can
> also take the opportunity to discuss them here.

The main features of the website are as listed below:

1. Browse through different yarns easily
2. Sorting system (sort by average rating, number of reviews)
3. Filter and search system to narrow down yarns displayed
   - Search by yarn name
   - Filter by brand, material, average rating, weight,color
4. Contribute yarn reviews, and ability to edit or delete a review
5. View your past reviews to keep track of your progress
6. Contribute yarn listings
7. Create account and login with JWT Authentication
8. Ability to change username/password

Known bugs:
Future features:

1.  Ability to report a user or flag a review for spam, inappropriate content, etc.
2.  Ability to upvote or downvote reviews
3.  Ability to react to user reviews with emojis
4.  Ability to reply to user reviews to facilitate discussion
5.  Ability to view other users' profile to see the date they joined, reviews posted, etc.
6.  Ability to add yarn to cart and purchase yarns
7.  Ability to save/favorite/like a yarn
8.  Retrieve username/password if user forgets
9.  Ability to view yarns contributed
10. Add user profile picture
11. More secure encryption for user password

## 3. Technologies Used

Provide an overview of the languages, frameworks, libraries and any other tools that you have used to produce the project. Be sure to provide a short description of where in the project the technology is used, and a URL to its Github repository

1. ReactJS for frontend
2. ExpressJS for backend REST API
3. MongoDB for storing data

### Libraries used

1. react-menu: https://www.npmjs.com/package/@szhsin/react-menu (filter/sort menu)
2. tailwindcss: https://www.npmjs.com/package/tailwindcss (easy css)
3. react-icons: https://www.npmjs.com/package/react-icons (various icons)
4. moment: https://www.npmjs.com/package/moment (display date time)
5. react-toastify: https://www.npmjs.com/package/react-toastify (when user has uploaded yarn listing or review successfully)
6. tippyjs: https://www.npmjs.com/package/@tippyjs/react (tooltips)

## 4. Sample Mongo Documents

Add in a sample document from each collection you have in your MongoDB. You might save them as json files in a folder on your Express/Mongo repository.

## 5. Testing

Provide proof that you have done testing on your project. You can provide step by step instructions for the examiner to test the project. Use your user stories and their acceptance criteria as a starting point. Do note that any unhandled exceptions, console errors etc will be considered as failing the testing criteria.

### If we decide to write manual test cases

You may want to provide manual test cases. An example of a manual test case could be:

```
1.  Test that user can sign in
	a.  From the home page, click on the 'Login' button
	b.  Fill in a valid username and password and click on the 'Login' button
	c.  The user should be redirected to the profile page

2.  Test user entering an invalid password
	a.  From the home page, click on the 'Login' button
	b.  FIll in a valid username but an invalid password, and click on the 'Login' button
	c.  The user should be informed that the login has failed.
```

Need to provide:

- A description of the test case
- The steps for performing the test
- The expected results
- Any assumptions or prerequisites

## Credits
