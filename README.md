# Yarnscape

**Yarnscape** is a website that serves as a platform for users to browse through all the different types of yarns available, as well as contribute their own experiences with the yarn to allow others to make more informed decisions while choosing what yarn to use for their next project.

As a crocheter/crochetier myself, I often struggle to find affordable and good quality yarn for the various items that I want to make. With the different factors that you have to consider while shopping for yarn, this process can be quite tedious as it requires some research and planning to make sure you choose suitable yarn.

Therefore, I wanted to create a platform to collect data on the best yarns to choose for different kinds of projects, and the most liked yarns among the community. The platform will make the process of choosing yarn easier for my fellow hobbyists interested in yarn craft, and will also serve as a space for creative discussion and community building. The data collected from analyzing user reviews can also be used for monetization, if we want to open an online shop for users to buy the top rated yarns for their projects.

Live Website: https://yarnscape.netlify.app

## 1. UI/UX

This section will dive deeper into the strategies and thought processes while designing the UI/UX for the website.

### User Stories

[Click here to view user stories Google Doc](https://docs.google.com/document/d/1yOHypQABOq7tdAAkWjRj3wQ_N3t-oayXPK7v9hBOPCk/edit?usp=sharing)

### Related Documents/Diagrams

[Mobile & Desktop layout Figma](https://www.figma.com/file/TirCjnyOM7wp6AkEUEKAGc/yarnscape?node-id=0%3A1&t=UHLQME6A4gCQkhPd-3)

[Mood Board & Wireframe Figma](https://www.figma.com/file/WuZyMa9XHDQgnUicjnNdby/yarnscape-wireframes?node-id=0%3A1&t=Nc3HB9fqKoYOKZuA-3)

### 5 Planes of UI/UX

For the Strategy plane, I wanted to address the issue for my target audience - people who craft using yarn, who struggle with having to do multiple research and heading down to stores in order to test or feel the yarn that they wish to use. The objective of the website is to accumulate various reviews of different types of yarns which will assist the users by removing the need to browse multiple sites in order to get real, first-hand reviews on the yarn.

Thus for the scope, I decided to include features that allow users to filter or sort yarn types such that it is easier for them to identify the type of yarn they wish to see, saving them time so they don't have to keep scrolling to find what they want. Meanwhile, in the content requirements I will list information like images of each yarn, its name, recommended hook or needle size, weight, color, brand, and material.

For the structure on the interaction design side, users will be able to interact with the site easily with the organization strategy I am using as each ‘Card’ will lead them to Details and Reviews of each Yarn. If errors are made, users can edit the review they have posted. On the information architecture side, I will be structuring the content the product offers in a way that makes it easy for users to find what they’re looking for. This can be conveyed through documents like the site map, which outlines the hierarchy and pattern of each part of the product. This could include a home page where users can enter a color of yarn they wish to look for in the search bar. This would then lead to a cluster of cards each with a link that takes users to pages for the individual yarns.

For the skeleton, I have decided to go with Sans-Serif fonts in the wireframes including the buttons, links, images and text. There will be Navigation buttons on the top of the Home Page and these will be laid out in such a way that ensures that users can quickly move through each page to find the information they need, while also understanding which elements of each page are interactive and which are not. I have decided to go for a dark background such that each element is highlighted and it is easier for the user to read, and emphasis on the image of each yarn. The Sans-Serif fonts is user-friendly and makes the website feel more welcoming to users.

For the surface and visual design, I used a consistent colour palette and layout throughout the website, where the logo appears at the top left of the page, and the most important information appears in a wide column in the middle of the page. This layout anchors users with its consistent visual style while enabling them to easily find the information they’re seeking. This is the final ‘look-and-feel’ of the website and is what triggers feelings and emotions that will lead them to choose my review website over another.

### Considerations for different devices

My strategy to design across different devices is to adapt the experience for each group for each context of use. I will have to identify the different scenarios in which my website will be used across the different devices, and design an experience suitable for each of those scenarios. Different screens also allow for different input methods. Touch inputs - tap targets like CTA buttons have to be adequately sized and spaced well to give my user interface breathing room. For large screens, I have to ensure that images do not lose quality as they scale up. Providing a consistent experience is crucial across different devices.

## 2. Features

The main features of the website are as listed below:

1. Browse through different yarns easily
2. Sorting system (sort by alphabetical order, average rating, number of reviews)
3. Filter and search system to narrow down yarns displayed
   - Search by yarn name
   - Filter by color, brand, weight, material
4. Contribute yarn reviews, and ability to edit or delete a review
5. View your past reviews to keep track of your progress
6. Contribute yarn listings
7. Create account and login with JWT Authentication
8. Ability to change username/password

Known bugs:

Future features:

1.  Ability to report a user or flag a review for spam, inappropriate content, etc.
1.  Ability to upvote or downvote reviews
1.  Ability to react to user reviews with emojis
1.  Ability to reply to user reviews to facilitate discussion
1.  Ability to view other users' profile to see the date they joined, reviews posted, etc.
1.  Ability to add yarn to cart and purchase yarns
1.  Ability to save/favorite/like a yarn
1.  Retrieve username/password if user forgets
1.  Ability to view yarns contributed
1.  Add user profile picture
1.  Better security measures for user password

## 3. Technologies Used

Provide an overview of the languages, frameworks, libraries and any other tools that you have used to produce the project. Be sure to provide a short description of where in the project the technology is used, and a URL to its Github repository

1. ReactJS for frontend
2. ExpressJS for backend REST API
3. MongoDB for storing data

### Libraries used

1. react-router-dom: https://github.com/remix-run/react-router (for routing different pages & redirecting user)
2. axios: https://github.com/axios/axios (to call apis)
3. react-icons: https://github.com/react-icons/react-icons (various icons throughout the app)
4. dayjs: https://github.com/iamkun/dayjs (display date time)
5. react-toastify: https://github.com/fkhadra/react-toastify (toasters)
6. react-tippy: https://github.com/tvkhoa/react-tippy (tooltips)

## 4. Sample Mongo Documents

[Please refer to the Express repository for sample documents](https://github.com/nauxray/yarnscape-express/tree/main/samples)

## 5. Testing

Assumptions:

1. User will upload images as image urls instead of image files.

Test cases: [Please click here to view the test cases document](https://docs.google.com/document/d/1p75UCj_MAYMAR78FY0Zu2zIKAy6xb3Z-quQLTdeojdc/edit?usp=sharing)

## Credits

- [Decode JWT token without library](https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library)
- [How to use react-router-dom useNavigate hook in class components](https://stackoverflow.com/questions/70143135/how-to-use-react-router-dom-v6-navigate-in-class-component)
- [CSS Loader](https://www.w3schools.com/howto/howto_css_loader.asp)
- [Custom hook for reusable Modal component](https://upmostly.com/tutorials/modal-components-react-custom-hooks)
- [Scroll to top on page change](https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition)
- [Fix react-router-dom page not found error after netlify deployment](https://www.freecodecamp.org/news/how-to-deploy-react-router-based-app-to-netlify/)
- [Regex for checking valid image url](https://bobbyhadz.com/blog/javascript-check-if-url-is-image)
- [Leo Tolstoy portrait image](https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4Njg0ODUyOTU0NDQx/fb-tolstoy-2.jpg)
- [Logo created using Canva, cat vector images from Canva](https://www.canva.com/design/DAFSqBjsPpI/X1CWMmWEWr0p_fyfaEkY1g/view?utm_content=DAFSqBjsPpI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
- [Favicon generator](https://favicon.io/)
