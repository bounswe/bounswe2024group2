# CMPE451 Group 2 Milestone 2 Report

## Contributors

* **Cem Güngör**
* **Rukiye Aslan**
* **Furkan Şenkal**
* **Rafet Oğuz Pançuk**
* **Mahmut Buğra Mert**
* **Kamil Deniz Coşkuner**
* **Halil İbrahim Kasapoğlu**
* **Muhammed Erkam Gökcepınar**


## Table of contents

   * 1 **Requirements Addressed**

   * 2 **Deliverables**
     
      * 2.1 List and Status of Deliverables
      * 2.2 UX Design Choices
      * 2.3 Description of the Standard Being Utilized
      * 2.4 API documentation

   * 3 **Testing**

      * 3.1 The General Test Plan
      * 3.2 Generated Unit Test Reports

   * 4 **Planning and Team Process**

   * 5 **Evaluations**
      
      * 5.1 Customer Feedback Summary
      * 5.2 Evaluation of the Status of Deliverables
      * 5.3 Evaluation of Tools
      * 5.4 Evaluation of Processes

                
   * 6 **Individual Contributions**


### Executive Summary

## 1 **Requirements Addressed**

The addressed requirements in second milestone are listed below:

* **User Requirements**
    * 1.1.1.1 Users shall be able to register with a unique username, e-mail address, and password.
    * 1.1.1.2 User shall be registered with a secure password.
    * 1.1.1.3 Users shall be able to log in using their registered credentials.
    * 1.1.1.5 Users shall be able to log out from the system.
    * 1.1.2.1.1 Guest user shall be able to view posts.
    * 1.1.2.1.2 Guest user shall be able to view stocks.
    * 1.1.2.1.6 Guest user shall be able to view recent news about financial markets.
    * 1.1.2.2.1 Registered users shall be able to create and edit posts.
    * 1.1.2.2.2 Registered users shall be able to write comments to posts.
    * 1.1.3.1 Users shall be able to view profile information.


* **System Requirements**
    * 1.2.2.1 Portfolios should be created by the users by entering purchase price and quantity of stock. 
    * 1.2.2.2 Portfolios shall include one or more stock.
    * 1.2.3.1 The system shall include news about stocks.
    * 1.2.4.1 The system shall require registered users to add title to posts.
    * 1.2.4.2 The system shall allow registered users to add tags to posts.
    * 1.2.4.4 The system shall allow registered users to add news to posts.
    * 1.2.4.5 The system shall allow registered users to add ideas in the form of text to posts.
    * 1.2.4.6 The system shall allow registered users to add line charts of stocks to posts.
    * 1.2.4.11 The system shall be able to list comments related to a post.
    * 1.2.5.1 The system shall include badges which gain new abilities to users.
    * 1.2.5.2 The system shall have a badge type called "High-liked".
    * 1.2.5.3 The system shall have a badge type called "Cretager".
    * 1.2.6.1 The system shall limit tag lenght to 40 chars.
    * 1.2.6.2 The system shall limit the tags to be lowercase and unique

* **Non Functional Requirements**
    * 2.1.1 The application shall be available for Web and Mobile platforms.
    * 2.1.2 The web application shall be available for web browsers supporting ES6.
    * 2.1.3. The web application shall support FHD (1920x1080) or higher resolutions, ensuring that all charts and graphs are rendered at a minimum resolution of 1080p for clarity and detail.
    * 2.1.4 The mobile application shall be available for Android(API 33 or higher) operating systems.
    * 2.1.5 The mobile application shall support portrait orientation on mobile devices.
    * 2.1.6 The mobile application shall support FHD or higher resolutions, with charts and graphs rendered at a minimum resolution of 720p for clear visibility.
    * 2.1.1 Application shall be available in English Language.
    * 2.3.1 User authorization credentials shall be encrypted to ensure the confidentiality of user data.
    * 2.3.2 User login sessions shall expire after 12 hours of inactivity, requiring re-authentication to enhance security.
    * 2.3.3 User shall verify their email addresses after signing up to ensure the validity of accounts before logging into the system.
    * 2.6.1 The application shall load within 3 seconds under normal network conditions.
    * 2.6.2 The application shall not be unresponsive at a maximum of 10 seconds.
    * 2.6.3 The application shall stay responsive for up to 5000 users concurrently.


For the complete list of requirements, refer [here](https://github.com/bounswe/bounswe2024group2/wiki/Requirements-%E2%80%90-Cmpe-451) please.


## 2 **Deliverables**

### 2.1 List and Status of Deliverables

| Deliverable/Work | Status | Related Link | 
| ------------------------- | ------------- | ------------- | 
| Github Code Repository        | In Progress | [Repository](https://github.com/bounswe/bounswe2024group2)        |
| URL to the Deployed Application    | In Progress | [Bull&Bear](http://159.223.28.163:30001/home)        |
| Instruction to build Deployed Application     | Done | [Quickstart](https://github.com/bounswe/bounswe2024group2/wiki/Quickstart-451)     |
| Release Tag    | Done | [0.2.0-alpha](https://github.com/bounswe/bounswe2024group2/releases/tag/0.2.0-alpha)       |
| User Group Scenarios    | Done | [User Group Scenarios](https://github.com/bounswe/bounswe2024group2/wiki/User-Scenario-Groups) |
| UX Design Choices    | In Progress | [UX Design Choices](https://github.com/bounswe/bounswe2024group2/wiki/Milestone-2-Report-%E2%80%90-CMPE451#22-ux-design-choices) |
| W3C Standard Decision & Implementation   | In Progress | [W3C Standard](https://github.com/bounswe/bounswe2024group2/wiki/W3C%E2%80%90Annotation) |
| Lab 5 | Done | [Lab 5 PR](https://github.com/bounswe/bounswe2024group2/pull/372), [Lab 5 Meeting Notes](https://github.com/bounswe/bounswe2024group2/wiki/5th-Lab-Meeting-Report,-06.11.2024) |
| Lab 6 | Done | [Lab 6 PR](https://github.com/bounswe/bounswe2024group2/pull/385) |
| Lab 7 | Done | [Lab 7 PR](https://github.com/bounswe/bounswe2024group2/pull/399) |




### 2.2 UX Design Choices

While making the UX design choices for our app, we prioritized that our app should be easily usable for different purposes by people of different knowledge levels and ages at any time of the day, either on the phone or on the web. To achieve this, we have made many pages for different purposes easily accessible from the homepage, for example the news and community pages. We have also added a night mode for users with sensitive eyes, a loading indicator to inform impatient users about pages and processes that take time to load. Furthermore, in addition to meeting the fundamental requirements for privacy and security, we have added the requirement of two-step verification by email when registering.

As for domain-specific UX design elements, we've also planned features such as adding tags to posts, linking news and personal portfolios, and adding charts and implemented some of them like adding tags, so that people who don't know enough about these topics can more easily understand posts on the community page. We decided to make posts searchable based on the news or portfolio they are linked to, or the tags added. In addition, users can already create their personal portfolios on the web side, and we plan to develop this and make it searchable and traceable by other users when they make their portfolios public. Finally, stocks and their prices can already be viewed on the markets page, but we also planned to add charts of stocks for users who want to study the charts of stocks. For farther information, you can take a look at what we have done for this topic in the lab [here](https://github.com/bounswe/bounswe2024group2/pull/385).


### 2.3 Description of the Standard Being Utilized

The Web Annotation Data Model is a World Wide Web Consortium (W3C) standard that specifies a structured format for creating and sharing annotations on digital resources. In our app, we will use this model to allow users to view and interact with news articles, portfolios, and stock information directly within posts using annotations. This integration aims to increase user engagement and facilitate a more comprehensive exchange of information. For more information, see [W3C‐Annotation](https://github.com/bounswe/bounswe2024group2/wiki/W3C%E2%80%90Annotation).

### 2.4 API documentation

#### **Register**
* Will be used to register to the application
* Requires email verification to login
###### Request body
`
{
  "username": "roketatar", 
  "password": "roket123", 
  "email": borsakaplani@hotmail.com"
}
`

#### **Login**
##### Login
* Verified accounts can login via login endpoint
* **Returns** refresh and access tokens on success
###### Request body
`
{
  "username": "roketatar", 
  "password": "roket123", 
}
`
##### Login refresh
* Used to refresh access tokens
* **Returns** refresh and access tokens on success
###### Request body
`
{
  "refresh": "token"
}
`

#### **Logout**
* Will be used to logout from the application
###### Request body
`
{
   "refresh": "token"
}
`

#### **Profiles**
##### Get All
* Returns all profiles
###### Return body
`
{
  "count": int,
  "next": "http://api/accounts/?page=4",
  "previous": "http://api/accounts/?page=2",
  "results": [
    {
      "user": 0,
      "profile_picture": "string",
      "followers": [
        0
      ],
      "following": [
        0
      ],
      "bio": "string",
      "location": "string"
    }, ...
  ]
}
`
#### Post
* Used to create a profile
###### Request body
`
{
  "profile_picture": "string",
  "followers": [
    0
  ],
  "following": [
    0
  ],
  "bio": "string",
  "location": "string"
}
`
##### Get
* Returns profile of given id
###### Return body
`
{
  "user": 0,
  "profile_picture": "string",
  "followers": [
    0
  ],
  "following": [
    0
  ],
  "bio": "string",
  "location": "string"
}
`
##### Put
* Used to replace existing profile
* Requires id
###### Request body
`
{
  "profile_picture": "string",
  "followers": [
    0
  ],
  "following": [
    0
  ],
  "bio": "string",
  "location": "string"
}
`
##### Patch
* Used to update existing profile
* Requires id
###### Request body
`
{
  "profile_picture": "string",
  "followers": [
    0
  ],
  "following": [
    0
  ],
  "bio": "string",
  "location": "string"
}
`
##### Delete
* Used to delete a profile. 
* Requires id


#### **Posts**
##### Get All
* Returns all posts
###### Return body
`
{
  "count": 123,
  "next": "http://api/posts/?page=4",
  "previous": "http://api/posts/?page=2",
  "results": [
    {
      "id": 0,
      "title": "string",
      "content": "string",
      "author": 0,
      "created_at": "2024-11-29T11:35:24.670Z",
      "updated_at": "2024-11-29T11:35:24.670Z",
      "liked_by": [
        0
      ],
      "tags": [
        0
      ],
      "portfolios": [
        0
      ]
    }, ...
  ]
}
`
##### Post
* Used to create a post
###### Request body
`
{
  "title": "string",
  "content": "string",
  "author": 0,
  "liked_by": [
    0
  ],
  "tags": [
    0
  ],
  "portfolios": [
    0
  ]
}
`
##### Get
* Returns post of given id
###### Return body
`
{
  "id": 0,
  "title": "string",
  "content": "string",
  "author": 0,
  "created_at": "2024-11-29T11:36:35.452Z",
  "updated_at": "2024-11-29T11:36:35.452Z",
  "liked_by": [
    0
  ],
  "tags": [
    0
  ],
  "portfolios": [
    0
  ]
}
`
##### Put
* Used to replace existing post
* Requires id
###### Request body
`
{
  "title": "string",
  "content": "string",
  "author": 0,
  "liked_by": [
    0
  ],
  "tags": [
    0
  ],
  "portfolios": [
    0
  ]
}
`
##### Patch
* Used to update existing post
* Requires id
###### Request body
`
{
  "title": "string",
  "content": "string",
  "author": 0,
  "liked_by": [
    0
  ],
  "tags": [
    0
  ],
  "portfolios": [
    0
  ]
}
`
##### Delete
* Used to delete a post. 
* Requires id





#### **Comments**
##### Get All
* Returns all comments
###### Return body
`
{
  "count": 123,
  "next": "http://api/comments/?page=4",
  "previous": "http://api/comments/?page=2",
  "results": [
    {
      "id": 0,
      "post_id": 0,
      "user_id": 0,
      "content": "string"
    }, ...
  ]
}
`
##### Post
* Used to create a comment
###### Request body
`
{
  "post_id": 0,
  "user_id": 0,
  "content": "string"
}
`
##### Get
* Returns comment of given id
###### Return body
`
{
  "id": 0,
  "post_id": 0,
  "user_id": 0,
  "content": "string"
}
`
##### Put
* Used to replace existing comment
* Requires id
###### Request body
`
{
  "post_id": 0,
  "user_id": 0,
  "content": "string"
}
`
##### Patch
* Used to update existing post
* Requires id
###### Request body
`
{
  "post_id": 0,
  "user_id": 0,
  "content": "string"
}
`
##### Delete
* Used to delete a post. 
* Requires id




#### **Currencies**
##### Get All
* Returns all currencies
###### Return body
`
{
  "count": 123,
  "next": "http://api/currency/?page=4",
  "previous": "http://api/currency/?page=2",
  "results": [
    {
      "id": 0,
      "name": "string",
      "code": "string"
    }, ...
  ]
}
`
##### Post
* Used to create a currency
###### Request body
`
{
  "name": "string",
  "code": "string"
}
`
##### Get
* Returns currency of given id
###### Return body
`
{
  "id": 0,
  "name": "string",
  "code": "string"
}
`
##### Put
* Used to replace existing currency
* Requires id
###### Request body
`
{
  "name": "string",
  "code": "string"
}
`
##### Patch
* Used to update existing currency
* Requires id
###### Request body
`
{
  "name": "string",
  "code": "string"
}
`
##### Delete
* Used to delete a currency. 
* Requires id



#### **News**
* Used to get financial/crypto/stock news from various RSS feeds.
##### News
* Returns news
* Require a feed name: cryptocurrency or financial times
###### Request body
`
{
  "feed_name": "string"
}
`
###### Return body
`
[
 {
     "title": "string",
     "published": "date",
     "description": "string",
     "image": "image"
     }, ...
]
`


#### **Tags**
##### Get All
* Returns all tags
###### Return body
`
{
  "count": 123,
  "next": "http://api/tags/?page=4",
  "previous": "http://api/tags/?page=2",
  "results": [
    {
      "id": 0,
      "name": "string",
      "user_id": 0
    }
  ]
}
`
##### Post
* Used to create a tag
###### Request body
`
{
  "name": "string",
  "user_id": 0
}
`
##### Get
* Returns tag of given id
###### Return body
`
{
  "id": 0,
  "name": "string",
  "user_id": 0
}
`
##### Put
* Used to replace existing tag
* Requires id
###### Request body
`
{
  "name": "string",
  "user_id": 0
}
`
##### Patch
* Used to update existing tag
* Requires id
###### Request body
`
{
  "name": "string",
  "user_id": 0
}
`
##### Delete
* Used to delete a tag. 
* Requires id


#### **Token**
##### Post
* Used to create token
###### Request body
`
{
  "username": "string",
  "password": "string"
}
`
###### Return body
`
{
  "refresh": "string",
  "access": "string"
}
`
##### Post
* Used to refresh token
###### Request body
`
{
  "username": "string",
  "password": "string"
}
`
###### Return body
`
{
  "refresh": "string",
  "access": "string"
}
`

#### **Stocks**
* 
##### Get All
* Returns all stocks
###### Return body
`
{
  "count": 123,
  "next": "http://api/stocks/?page=4",
  "previous": "http://api/stocks/?page=2",
  "results": [
    {
      "id": 0,
      "name": "string",
      "symbol": "string",
      "currency": 0,
      "price": "string"
    }, ...
  ]
}
`
##### Post
* Used to create a stock
* Stocks will be automatically created.
###### Request body
`
{
  "name": "string",
  "symbol": "string",
  "currency": 0
}
`
##### Get
* Returns stock of given id, price is up-to-date
###### Return body
`
{
  "id": 0,
  "name": "string",
  "symbol": "string",
  "currency": 0,
  "price": "string"
}
`
##### Put
* Used to replace existing stock
* Requires id
###### Request body
`
{
  "name": "string",
  "symbol": "string",
  "currency": 0
}
`
##### Patch
* Used to update existing stock
* Requires id
###### Request body
`
{
  "name": "string",
  "symbol": "string",
  "currency": 0
}
`
##### Delete
* Used to delete a stock. 
* Requires id


## 3 **Testing**


### 3.1 The General Test Plan

#### Frontend Testing
- Testing will utilize the **Jest** library for comprehensive coverage.  
- **Unit Tests**: Focus on individual React components to validate their functionality in isolation.  
- **Integration Tests**: Simulate user interactions and workflows across multiple components, such as login, profile, and portfolio features.  

##### Plan:
1. Define critical UI components and their expected behavior.
2. Write test cases for various user actions (e.g., form submission, navigation).
3. Use Jest to measure test coverage and address any gaps.


#### Mobile Testing
- **Jest** will also be used for testing the React Native application.  
- **Unit Tests**: Ensure proper rendering of components for different states and properties.  
- **Integration Tests**: Validate navigation flows and end-to-end functionalities across mobile screens.

##### Plan:
1. Identify core features to test (e.g., login, profile navigation).  
2. Write test cases to ensure consistent behavior on various devices.  
3. Use Jest with React Native Testing Library for efficient test execution.


#### Mock Data Strategy
- **Faker** library will be used to generate realistic mock data for testing purposes.  
- Ensure data relationships and constraints are handled for backend models and frontend views.

### 3.2 Generated Unit Test Reports

- Utilize Jest’s reporting capabilities to monitor test results for frontend and mobile.
- Backend test results will include coverage for all implemented endpoints and key functionalities.
- Ensure a balanced focus on unit and integration testing across all layers.


## 4 **Planning and Team Process** 
### 4.1 Changes Made Since Milestone 1
Since Milestone 1, our team composition has remained the same, allowing us to maintain continuity in our collaboration. However, we observed the critical importance of closely following our project plan and maintaining constant communication between the backend and frontend teams.

Previously, a lack of coordination occasionally led to delays in feature integration and debugging. To address this, we have adopted a more integrated development process. Specifically, we now prioritize real-time communication through regular meetings and joint debugging sessions. By doing so, we aim to improve the synchronization between backend and frontend tasks, ensuring seamless integration of features.

Additionally, we plan to introduce collaborative coding sessions where team members from different roles work together on interconnected features. We believe this proactive approach will increase our efficiency and reduce the turnaround time for resolving issues. Ultimately, these changes will enhance our overall productivity, helping us achieve more within the given timeframe.

### 4.2 Plan for Completing the Project
Our project completion plan consists of two main phases:

* Phase 1: Completion of Core Features
Our immediate focus is to complete any pending components of our application. The highest priority is to implement annotation functionality in accordance with W3C standards, which will enable users to interact with news articles, stock data, and portfolios directly within posts.

   Tasks in Progress:
    * Finalizing backend endpoints for annotations and community interactions.
Integrating annotation features with the frontend to ensure a seamless user experience.
    * Enhancing community mechanics to encourage user engagement.
    * By prioritizing these critical components, we aim to deliver a functional application that meets core user requirements.

* Phase 2: Enhancements and Refinements
Once the essential features are completed, we will focus on implementing additional functionalities in order of importance. Some key areas include:

   * Improving CRUD operations for user-generated content, such as posts and portfolios.
   * Enhancing search capabilities, although feedback from our demo session suggested implementing tag-based news search, we have decided not to pursue this feature in the current scope.
   * Conducting comprehensive testing and resolving any identified bugs to ensure stability and reliability.

We recognize that unforeseen challenges may arise, so we remain flexible and prepared to adjust our priorities as needed. Our goal is to deliver a robust, user-friendly application by the final milestone.
### 4.3 Project Plan
For our project management, we utilized Project Libre to create and track our project plan. Initially, we focused on planning up until Milestone 2. After reaching the Milestone 2 deadline, we conducted a thorough review of the plan and adjusted it to better align with the project’s actual progress. 

In addition, we extended our planning to cover the third milestone . This approach ensures that our team remains aligned on key deliverables and deadlines, while also providing us with the flexibility to adapt to any unforeseen obstacles or changes in scope as we continue to progress.

Here is the [link](https://github.com/bounswe/bounswe2024group2/wiki/Project-Plan-CmpE451) to our Project Plan.

## 5 Evaluations

### 5.1 Customer Feedbacks & Reflections
We presented our work for milestone 2 to the customer on November 26th, 2024. Here are the feedbacks and our reflections on the customer presentation:

* **Link between tags and news:** Our application has tags that can be created by some users and they are used to specify the posts according to the mentioned topics .
    * The customer recommend that as well as the posts, the news can be specified using these tags.
    * The news is received from RSS feeds of some news sources like Financial Times, hence it is classified with respect to their sources. 
    * **Action Plan:** We will consider ways of linking the news with tags and analyze the effects the change on the development complexity.
    * **Impact:** Since the news is retreived directly from RSS feeds, adding tags to it will create extra proccessing time and effort during the retreival of news.




### 5.2 Evaluation of Status of Deliverables

#### 5.2.1 Progress of Requirements  
We have made good progress on many of the requirements we set at the beginning of the project. Features like showing stock prices and information, retrieving news from RSS feeds, creating posts, and linking graphics and news to posts have been implemented. Most of the API endpoints are also ready. The remaining work involves connecting these features to the backend, which we believe will not cause significant delays to our project plan.  

#### 5.2.2 Domain-Specific UX Design Decisions  
Since our app focuses on finance, we discussed early on how to best display prices and other data. We decided to use visual graphs to make the information easy to understand. We also added a dark mode because financial apps can be used at any time of the day, and this improves usability in low-light conditions. To make the app more user-friendly, we included loading indicators to show when data is being processed. These decisions were made to enhance the overall experience for our users.  

#### 5.2.3 Use of W3C Standard - Annotation  
Although we have not fully implemented this yet, we have decided to use the **W3C Web Annotation Data Model** for connecting posts, news, and graphics. This choice will help ensure consistency and flexibility in our app's data management. However, integrating this standard will require additional work, which could slightly affect our project timeline. We plan to manage this carefully to minimize any delays while ensuring the standard is properly applied.  

#### 5.2.4 API Documentation  
The API documentation is complete, with detailed explanations of endpoints, request parameters, and expected responses. This will make it easier for us to connect the front-end and back-end features. Since the documentation is ready, it will not delay our project and will help keep the development process smooth and on track.  

#### 5.2.4 Weekly Reports and Meetings
We regularly documented all lab reports and meetings. We have three different meeting notes as lab meeting notes, weekly meeting notes, and sub-group meeting notes like backend meeting notes.

Each kind of these meeting notes and reports can be found on our wiki page [here](https://github.com/bounswe/bounswe2024group2/wiki).


### 5.3 Evaluation of Tools  

#### 5.3.1 VSCode  
VSCode has been a great tool for both front-end and back-end development, providing a stable and consistent environment for writing, testing, and debugging code. Its ability to run on different operating systems has been especially helpful since our team uses a mix of platforms.  

#### 5.3.2 GitHub Desktop  
At the beginning of the project, GitHub Desktop made it easier for some of us to manage branches and commits, especially those less familiar with command-line tools.  

#### 5.3.3 React  
React was a natural choice for our front-end development because of its popularity and our prior experience with it in a course. Its strong ecosystem and the availability of tutorials and resources made it easier for us to get started. Using NPM for packages also allowed us to enable hot reloads locally, which sped up development.  

#### 5.3.4 React Native  
We chose React Native for mobile development due to its simplicity and efficiency. Although the installation and cleanup processes were challenging, the language's ease of use helped us develop faster. We decided not to use Expo to ensure compatibility with some graph-related packages.  

#### 5.3.5 Jest Framework  
We used the Jest framework for unit testing our JavaScript code. Jest’s easy setup and extensive documentation made it simple to test components and functions. Its built-in mocking and snapshot testing features were particularly helpful in ensuring code reliability during development.  

#### 5.3.6 Android Studio  
For debugging and testing our React Native application, we used Android Studio. It allowed us to test the app on virtual devices and debug native-level issues. Though it required significant system resources, its comprehensive tools were invaluable during mobile app development.  

#### 5.3.7 Django  
Django was used for our back-end development because of its clear architecture and built-in features like ORM. These made it easier to integrate with MySQL and maintain readable code. Django’s rich documentation and community support also provided solutions when we faced challenges. However, dealing with migration dependencies sometimes required manual fixes, which slowed us down.  

#### 5.3.8 Mermaid  
We used Mermaid to create use case and class diagrams. The free live editor was very practical since it allowed us to see the effects of our code instantly without needing to download anything.  

#### 5.3.9 PlantUML  
PlantUML was used to create sequence diagrams. As programmers, we found it convenient to write code instead of drawing diagrams manually.  

#### 5.3.10 Docker  
Docker played an important role in our deployment strategy. It allowed us to create consistent environments for development and production, avoiding compatibility issues. By dockerizing our app, we could test it easily across different systems.  

#### 5.3.11 Digital Ocean  
Digital Ocean was our hosting platform. We benefited from the $200 free credits from the GitHub Student Developer Pack, which allowed us to use Digital Ocean's scalable infrastructure. The SSH connection gave us full control to manage logs and configurations.  

#### 5.3.12 Loglevel  
We integrated the `loglevel` package into our application for managing logs. It allowed us to create detailed logs during development and production while keeping them organized by log levels. This was especially helpful for debugging and monitoring issues efficiently.  

#### 5.3.13 Discord  
In the initial weeks, Discord was our primary tool for weekly meetings. We created separate channels for front-end, back-end, and mobile teams, which made communication more organized and efficient.  

#### 5.3.14 WhatsApp  
We used WhatsApp for urgent communications and meeting reminders. After Discord became unavailable, we also created sub-groups on WhatsApp for each development team, which helped keep our communication structured.  

#### 5.3.15 Jitsi  
When Discord was blocked in Turkey, we switched to Jitsi for weekly meetings. Its unlimited meeting time feature allowed us to continue collaborating without interruptions.  

#### 5.3.16 Kubernetes  
We used Kubernetes for container orchestration on our deployment virtual machines. It made monitoring easier with its dashboard and provided benefits like resource distribution, DNS through service names, and ensuring pods were always running.  

#### 5.3.17 GitHub Actions  
GitHub Actions was an essential part of our CI/CD pipeline. It enabled us to automatically deploy the development environment, which accelerated our workflow and saved time during development.  

#### 5.3.18 Docker Hub  
We pushed our images to Docker Hub, which helped us quickly update dev servers, roll back when needed, and automate deployment workflows.  

### 5.4 Evaluation of Processes  

#### 5.4.1 Pull-Requests and Naming  
We followed strict conventions for branch names, commit messages, and pull-request titles. Each pull request was reviewed by a team member to ensure code quality. This process improved the maintainability of our codebase.  

#### 5.4.2 Teaming  
To balance workloads and ensure quality, we divided the team into groups (front-end, back-end, and mobile) and assigned reviewers for all tasks. This helped us maintain consistent progress across all parts of the project.  

#### 5.4.3 Notes  
During meetings, we assigned roles like moderators, note-takers, and wiki editors. This created a built-in review process for recording and organizing our discussions.  

#### 5.4.4 Issues  
We tracked our tasks using GitHub Issues, which allowed us to document and review all work efficiently. By creating templates for issues, we standardized the process, making it easier to stay organized.  

#### 5.4.5 Presentation  
For our second milestone, we presented the current progress and plans for the project. We divided presentation tasks among team members, which helped us cover all aspects of the project. However, we realized that structuring the presentation around user scenarios could have made it easier for the customer to understand the features and their impact on the user experience. We plan to improve this approach in future presentations.  



## 6 Individual Contribution Report


### **Cem Güngör**

---

#### Responsibilities:
- Backend development for the finance app **BULL & BEAR**, with a primary focus on implementing and optimizing the **Stocks API**.



#### Main Contributions:
1. **Stocks Endpoints**:
   - Developed endpoints for:
     - Fetching current stock values.
     - Updating and caching stock values to optimize data handling.
     - Calculating price ranges for graph representation.
   - Structured the application to initialize and generate all stocks on app startup (in progress).

2. **Stock Details Feature**:
   - Implemented a dynamic stock price fetching mechanism:
     - Fetched stock prices at 15-minute intervals, aligning with free application standards.
     - Cached results in the database for one minute to efficiently handle multiple requests for the same stock.
     - Updated the database after cache expiration with new data from external APIs.
   - [Issue #410](https://github.com/bounswe/bounswe2024group2/issues/410)  
   - [Pull Request #413](https://github.com/bounswe/bounswe2024group2/pull/413)

3. **Documentation**:
   - Authored **User Group Stories**, documenting specific user needs and use cases for the project.  
     [Issue #370](https://github.com/bounswe/bounswe2024group2/issues/370)

4. **Demo Scenarios**:
   - Created and detailed demo scenarios to showcase application features during presentations.  
     [Issue #400](https://github.com/bounswe/bounswe2024group2/issues/400)



#### Code-Related Significant Issues:
1. [Issue #410](https://github.com/bounswe/bounswe2024group2/issues/410): Implementation of dynamic stock fetching and caching logic.
2. [Issue #400](https://github.com/bounswe/bounswe2024group2/issues/400): Creation of demo scenarios for project presentations.



#### Management-Related Significant Issues:
1. [Issue #370](https://github.com/bounswe/bounswe2024group2/issues/370): Documenting **User Group Stories** to align development goals with user needs.


#### Pull Requests:
1. **[PR #413](https://github.com/bounswe/bounswe2024group2/pull/413)**:
   - Implemented the dynamic stock details feature and database caching.
   - **Conflict**: Resolved overlapping changes in the database schema with another feature branch.
   - **Resolution**: Reconciled migration scripts and updated schemas to integrate seamlessly.



#### Additional Information:
- Assisted with backend architectural design for stock data handling and caching mechanisms.
- Supported the team with debugging and troubleshooting during API integration.


### Rukiye Aslan

* **Responsibilities:** I was in the backend team and mainly responsible for implementing the endpoints for our market feed, news pages and refactoring existing backend implementations. Also, usually organizing meetings.
* **Main contributions:**
    * Developed and implemented the backend API endpoints for post creation.
    * Designed and implemented the database schema for all post, comment, profile, tags, and stocks
    * Conducted research on how to implement web annotation data model in the backend and presented my findings with the team.
    * Contributed creating a testing strategy for backend implementations and implemented an example testing strategy for backend team.
    
* **API Contributions:**
    * Implemented `news` API endpoint to fetch and process financial news from RSS feeds based on user input. For example, when a user sends a `POST` request with the `feed_name` as `"financial times"`, the endpoint returns a JSON array of news articles including fields like `title`, `link`, `author`, and `description`. Here's an example of the request and response:
        * Request:
        ```json
          {
            "feed_name": "financial times"
          }
        ```
          
        * Response:
        ```json
            [
              {
                "title": "Global Markets Update",
                "link": "https://www.ft.com/global-markets-update",
                "author": "Financial Times",
                "published": "2024-11-29T12:00:00Z",
                "description": "An update on global markets today.",
                "image": "https://www.ft.com/images/global-markets-thumbnail.jpg"
              }
            ]
        ```
            
    * Implemented `portfolio` endpoints to handle CRUD operations for user investment portfolios. Users can create a new portfolio by sending a `POST` request with portfolio details. Here's an example:
        * Request:
        ```json
        {
          "name": "Green Energy",
          "description": "Investments in renewable energy."
        }
        ```
        * Response:
        ```json
        {
          "id": 2,
          "name": "Green Energy",
          "description": "Investments in renewable energy.",
          "created_at": "2024-11-29T12:30:00Z"
        }
        ```

    * Implemented `post` endpoints to enrich posts with metadata such as tags, portfolios, and user interactions (e.g., likes). For example, when retrieving a post, the response includes detailed information:
        * Response:
        ```json
        {
          "id": 10,
          "title": "Stock Market Analysis",
          "content": "In-depth analysis of the S&P 500 trends.",
          "author": 3,
          "liked_by": [5, 6, 7],
          "tags": [
            {"id": 1, "name": "Stocks"},
            {"id": 2, "name": "Analysis"}
          ],
          "portfolios": [
            {"id": 1, "name": "Tech Stocks"},
            {"id": 2, "name": "Dividend Growth"}
          ]
        }
        ```


    * Implemented `comment` endpoints for adding and managing user comments. Users can post comments on various entities (e.g., posts, portfolios). Here's an example of a `POST` request:
        * Request:
        ```json
        {
          "content": "This analysis is very insightful!",
          "post_id": 10
        }
        ```
        * Response:
        ```json
        {
          "id": 15,
          "content": "This analysis is very insightful!",
          "post_id": 10,
          "user_id": 3,
          "created_at": "2024-11-29T14:15:00Z"
        }
        ```

    * Implemented `tag` endpoints for tagging functionality, enabling users with required badge to create, update, or delete tags. For instance, users can create a new tag with a `POST` request:
        * Request:
        ```json
        {
          "name": "Stock Analysis"
        }
        ```
        * Response:
        ```json
        {
          "id": 5,
          "name": "Stock Analysis",
          "created_at": "2024-11-29T14:30:00Z"
        }
        ```
* **Code-related significant issues:**
    * Resolved Issues:
        * Implemented post endpoints - [#364](https://github.com/bounswe/bounswe2024group2/issues/364)
        * Implemented portfolio endpoints - [#365](https://github.com/bounswe/bounswe2024group2/issues/365)
        * Implemented tag endpoints - [#366](https://github.com/bounswe/bounswe2024group2/issues/366)
        * Implement profile endpoints - [#367](https://github.com/bounswe/bounswe2024group2/issues/367)
        * Implement news endpoints - [#379](https://github.com/bounswe/bounswe2024group2/issues/379)
        * Implement tests for news - [#381](https://github.com/bounswe/bounswe2024group2/issues/381)
    * Reviewed Issues
        * Dynamic stock pricing - [#410](https://github.com/bounswe/bounswe2024group2/issues/410)
        
* **Pull Requests:**
    * Implemented market feed endpoints (post, portfolio, tag, comment, etc) - [#368](https://github.com/bounswe/bounswe2024group2/issues/410)
    * Implemented fetching news from RSS feeds mechanism - [#380](https://github.com/bounswe/bounswe2024group2/pull/380)
    * Implemented user REST endpoints - [#414](https://github.com/bounswe/bounswe2024group2/pull/414)
 

* **Additional information:** In addition to the tasks I have provided above, I also presented a part of our customer presentation.

### Furkan Şenkal
* **Responsibilities:** I was a member of the mobile team, I was responsible for improving authorization by creating user context for the mobile app and creating news page with backend connectivity. I also added loading indicator as a UX feature to the app and created Jest tests for the mobile app with my teammate @m-erkam.
* **Main contributions:**
   
  * Created news page for the mobile app and connected it to backend.
  * Improved authorization by creating user context for the mobile app.
  * Added UX design features to the mobile app such as loading indicators.
  * Created Jest tests for the mobile app with my teammate @m-erkam.
  * Researched how to implement the web annotation data model in the mobile application with my teammate @m-erkam.

* **Code-related significant issues:**

  * Issue [#407](https://github.com/bounswe/bounswe2024group2/issues/407) : Create news page of the mobile app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/417))
  * Issue [#409](https://github.com/bounswe/bounswe2024group2/issues/409) : Create user context for the mobile app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/317))
  * Issue [#387](https://github.com/bounswe/bounswe2024group2/issues/387) : Added loading indicator to the mobile app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/385))


* **Non-code-related significant issues:**

  * I planned testing strategy for the mobile app with @m-erkam. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/403))
  * I made research about and discuss the use of selected W3C standard in the mobile app with @m-erkam. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/373))


* **Pull requests:** PRs apart from above

  * [#399](https://github.com/bounswe/bounswe2024group2/pull/399): Created Jest tests for the mobile app with @m-erkam.

* **Additional information:**
  * I presented a part of the milestone 2 demo. I also significantly contributed to the preparation of the milestone 2 report and created related wiki page for it, and I prepared and documented the [meeting notes 9](https://github.com/bounswe/bounswe2024group2/wiki/General-Meeting-%239-(28.11.2024)).

### Mahmut Buğra Mert

* **Responsibilities:**
I was a member of the frontend team for web development. I was responsible for creating Create Post Page, connecting Create Post Page, Post View Page, and Community Page to backend. Also, I was responsible for displaying posts from database. I enhanced Markets page UI a little bit. Added a spinner to login page. Created a unit test for Community Page. Upgraded Project Plan. Attended Lab sessions regularly and actively.  


* **Main contributions:**
  * Created Creat Post Page. Connected it with backend.
  * Connected Community Page with backend.
  * Connected Post View with backend.
  * Created unit test for Community Page.
  * Upgraded Project Plan
#### API Contributions

- **API Endpoint**: `POST /posts/`
  
    - **Implementation**
   ```javascript
    const handleCreation = async () => {
   const postData = {
       title: postTitle,
       content: postContent,
       liked_by:[],
       tags:tags,
       portfolios:[]
   };

   const postURL = baseURL + '/posts/';

   try {
       const response = await fetch(postURL, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${accessToken}`,
               'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN',
           },
           body: JSON.stringify(postData)
       });

       if (response.ok) {
           const jsonResponse = await response.json();
           //console.log('Response:', jsonResponse);
           navigation.navigate("CommunityPage");
          
       } else {
         const errorResponse = await response.json();
         console.log('Error Response:', errorResponse);
         
         throw new Error('Network response was not ok.');
           
       }
   } catch (error) {
     
       console.error('Error:', error);
   }

- **Example Call**:
    ```javascript
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/posts/`,
        postData,
        { headers }
      );

- **Example Response**:
     ```json
    [
      {
        "id": 1,
        "title": "Exploring Global Market Opportunities",
        "content": "As the world becomes increasingly interconnected, investors have more opportunities than ever to explore markets beyond their borders. This post delves into emerging markets and potential areas for investment that could yield significant returns.",
        "author": 6,
        "created_at": "2024-11-24T14:02:52.464136Z",
        "updated_at": "2024-11-24T14:02:52.464227Z",
        "liked_by": [],
        "tags": [],
        "portfolios": []
      }
    ]

 

* **Code-related significant issues:**
  * Issue [#392](https://github.com/bounswe/bounswe2024group2/issues/392), [#391](https://github.com/bounswe/bounswe2024group2/issues/391). Create Post Page and its connection.
  * Issue [#393](https://github.com/bounswe/bounswe2024group2/issues/393). Post retrieval for Community Page.
  * Issue [#433](https://github.com/bounswe/bounswe2024group2/issues/433). Post View connection.
  * Issue [#384](https://github.com/bounswe/bounswe2024group2/issues/384). Spinner for login page.


* **Non-code-related significant issues:**
  * Issue [#432](https://github.com/bounswe/bounswe2024group2/issues/432). Update Project Plan.
  * Issue [#374](https://github.com/bounswe/bounswe2024group2/issues/374). Annotation standards planning.
  * Issue [#377](https://github.com/bounswe/bounswe2024group2/issues/377). Document Lab Meeting Notes 4

* **Pull Requests:**
  * PR [#411](https://github.com/bounswe/bounswe2024group2/pull/411). Create Post Page, Post retrieval for Community Page, Post View connection
  * PR [#428](https://github.com/bounswe/bounswe2024group2/pull/428). Creating test for Community Page and inital comment box.
  * PR [#385](https://github.com/bounswe/bounswe2024group2/pull/385). Lab 6. Spinner for login page.
  * PR [#372](https://github.com/bounswe/bounswe2024group2/pull/372). Lab 5. Annotation Planning.

* **Additional information:**
Attended weekly lab sessions and team meetings regularly and actively. Tried to attend lectures. Tried my best to help my teammates.
### Kamil Deniz Coşkuner
* **Responsibilities:** I am a member of the frontend team. My duties involve developing and configuring the frontend part of our project repository.
* **Main contributions:**
   
  * Created login, register and forgot password mockups for web.
  * Implemented login, register and forgot password pages of web application.
  * Implemented backend connection of login and register pages in the web application.
  * Implemented the access token storing and refreshing logic in the web application.
  * Initialized the git environment for the frontend project.

* **Code-related significant issues:**

  * Issue [#265](https://github.com/bounswe/bounswe2024group2/issues/265) : Initialize git environment for web development
  * Issue [#314](https://github.com/bounswe/bounswe2024group2/issues/314) : Create the layout of login, register and forgot password pages of the web app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/315))
  * Issue [#322](https://github.com/bounswe/bounswe2024group2/issues/322) : Implement login, register and token refresh functionalities (related [PR](https://github.com/bounswe/bounswe2024group2/pull/323))

* **Non-code-related significant issues:**

  * I made a research about W3C standarts. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/259))
  * I made a research about possible graph libraries we can use to show stock data, and created demos for them and shared the demos with other team members. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/252)
  * I created the login, register, forgot password mockups for the web application. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/283))
  
* **Pull requests:** PRs apart from above

  * [#324](https://github.com/bounswe/bounswe2024group2/pull/324): Bug fix about axios library missing from package.json file.
  * [#327](https://github.com/bounswe/bounswe2024group2/pull/327): Adds success and errors toast messages for login and register.

* **Additional information:**
  * I have created the wiki documentation of the lab report 2: (related [issue](https://github.com/bounswe/bounswe2024group2/issues/226)

### Halil İbrahim Kasapoğlu


#### Responsibilities

 I was in the frontend team and also managed DevOps/deployment-related issues. I was mainly responsible for managing news (implementing rss api connections) and dashboard section for the frontend, creating jest test for the respective section, refining color schemes and making the app dark theme for UX feature.


#### Main Contributions
- Created service implementations for news section
- Configured jest library and created tests for news and dashboard related components.
- Refined UI color scheme and added dark mode
- Added logger with different log levels to enhance 
- Created API client class for frontend

#### API Contributions

- **API Endpoint**: `POST /news/`
  - **Description**: As a frontend developer, I integrated the `POST /news/` API endpoint to fetch news articles from the backend based on a specific feed name. This API call is used to retrieve dynamic news content for the application, which is displayed on the user interface.
  
  - **Scenario**: This endpoint is used when a user selects a specific news feed (e.g., "Cryptocurrency" or "Technology"). The feed name is sent to the backend, which returns relevant news articles. These articles are then processed, transformed, and rendered in the frontend. This feature is part of the news section in the application.
    - **Implementation**
   ```javascript
    export const fetchNews = async (feedName) => {
        try {
            const response = await apiClient.post('/news/', { feed_name: feedName });
            const rawNews = response.data;

            const transformedNews = rawNews.map(transformNewsItem);
            return transformedNews;
        } catch (error) {
            log.error('Error fetching news:', error);
            throw error;
        }
    };       
   ```
  - **Example Call**:
    ```javascript
    const data = await fetchNews('cryptocurrency'); 
    ```

  - **Example Response**:
    ```json
    [
      {
        "title": "Bitcoin price ‘thrives in conflict’ as regional wars escalate",
        "link": "https://cointelegraph.com/news/conflict-bitcoin-hedge-political-risk?utm_source=rss_feed&utm_medium=rss&utm_campaign=rss_partner_inbound",
        "author": "Cointelegraph by Daniel Ramirez-Escudero",
        "published": "Fri, 29 Nov 2024 14:30:00 +0000",
        "description": "Localized geopolitical conflicts are rising with global risks looming.",
        "image": "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjQtMTEvMDE5Mzc4MGEtNjZhNi03Y2Y0LWFhODEtMWM1Mzk2YzliYTk4.jpg"
      },
      {
        "title": "Bitcoin was pronounced dead 415 times, now it battles for $100K",
        "link": "https://cointelegraph.com/news/bitcoin-nears-100k-defying-415-death-predictions?utm_source=rss_feed&utm_medium=rss&utm_campaign=rss_partner_inbound",
        "author": "Cointelegraph by Zoltan Vardai",
        "published": "Fri, 29 Nov 2024 14:15:53 +0000",
        "description": "Based on the growing global money supply projected to peak at $127 trillion in January 2026, some analysts predict a Bitcoin cycle top above $132,000.",
        "image": "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjQtMTEvMDE5Mzc4MmMtMmQwOC03M2QwLWI0MDQtZjI4MWUzOGEwNWM5.jpg"
      }
    ]
    ```

  - **Transformation Logic**: 
    - The raw data fetched from the backend contains several fields, such as `title`, `description`, and `published` date. These fields are transformed into a consistent format suitable for the frontend.
    - A unique `id` is generated for each article.
    - The `publishedAt` field is formatted into a readable date.
    - Missing optional fields (like `image`) are set to an empty string to avoid rendering errors.
    - The `source` is extracted from the author field (if present), or defaults to "Unknown."

  - **Use in Project**: This endpoint is crucial for fetching dynamic content (news articles) based on user input (feed name). It ensures that the frontend displays up-to-date, relevant news items in an organized and user-friendly format.

#### Code-related Significant Issues

| Issue Title | Role | Issue Link |
|-------------|------|------------|
| [FE - Integrate loglevel Logger for Unified Frontend Logging](https://github.com/bounswe/bounswe2024group2/issues/396) | Assignee | #396 |
| [FE - Fetch News Data from Backend and Enhance News Display](https://github.com/bounswe/bounswe2024group2/issues/395) | Assignee | #395 |
| [FE - Improve Dark Mode Compatibility Across Application](https://github.com/bounswe/bounswe2024group2/issues/389) | Assignee | #389 |
| [FE - Markets Stocks](https://github.com/bounswe/bounswe2024group2/issues/411) | Reviewer | #411 |
| [FE - Implement Profile Page Layout and Server Connection](https://github.com/bounswe/bounswe2024group2/issues/369) | Reviewer | #369 |
| [FE - Add Loading Indicator For Auth Operations](https://github.com/bounswe/bounswe2024group2/issues/384) | Reviewer | #384 |
| [FE - Add Dark Mode Toggle](https://github.com/bounswe/bounswe2024group2/issues/382) | Reviewer | #382 |

#### Management-related Significant Issues

| Issue Title | Role | Issue Link |
|-------------|------|------------|
| [Meeting Notes 6 Documentation](https://github.com/bounswe/bounswe2024group2/issues/430) | Assignee | #430 |
| [Plan Testing for Frontend](https://github.com/bounswe/bounswe2024group2/issues/402) | Assignee | #402 |
| [Discuss the Use of Annotation W3C Standard in the Web](https://github.com/bounswe/bounswe2024group2/issues/374) | Assignee | #374 |
| [Document Lab Meeting Notes #4](https://github.com/bounswe/bounswe2024group2/issues/377) | Reviewer | #377 |
| [BE - Discuss Implementation of Web Annotation Data Model](https://github.com/bounswe/bounswe2024group2/issues/370) | Reviewer | #370 |

#### Pull Requests

| PR Title | Role | PR Link |
|-------------|------|------------|
| [Add Jest Test for News and Dashboard Frontend](https://github.com/bounswe/bounswe2024group2/pull/424) | Assignee | #424 |
| [Integrate RSS News with API Frontend](https://github.com/bounswe/bounswe2024group2/pull/415) | Assignee | #415 |
| [Add Frontend Logger Util](https://github.com/bounswe/bounswe2024group2/pull/397) | Assignee | #397 |
| [Improve Dark Mode Support and UI Consistency](https://github.com/bounswe/bounswe2024group2/pull/388) | Assignee | #388 |
| [Feature/fe comments](https://github.com/bounswe/bounswe2024group2/pull/428) | Reviewer | #428 |
| [Refactor news return values backend](https://github.com/bounswe/bounswe2024group2/pull/422) | Reviewer | #422 |
| [Removes authentication requirement from user endpoints](https://github.com/bounswe/bounswe2024group2/pull/416) | Reviewer | #416 |
| [Feature/fe markets stocks frontend](https://github.com/bounswe/bounswe2024group2/pull/411) | Reviewer | #411 |
| [Lab 6 - Add UX Features](https://github.com/bounswe/bounswe2024group2/pull/385) | Reviewer | #385 |
| [Implement Fetching News from RSS Feeds backend](https://github.com/bounswe/bounswe2024group2/pull/380) | Reviewer | #380 |


#### Additional Information
- To see a full log of contributions see [here](https://github.com/bounswe/bounswe2024group2/wiki/Halil-%C4%B0brahim-Kasapo%C4%9Flu-CMPE-451#-contributions).

### Muhammed Erkam Gökcepınar
* **Responsibilities:** I am part of the mobile team and responsible for the configuration of the mobile application and implementation of community, markets pages along with post creation with line charts. 

* **Main contributions:** 

  * Created create post page including post creation and its backend connection
  * Created community page that shows the posts retreived from the backend
  * Created markets page which visualize BIST and S&P stocks with their description and prices
  * Configured Jest framework in mobile app for testing.
  * Configured the mobile project and created APK file for the release

*  **API Contributions**

    *  **API Endpoint**: `POST /posts/`, 
    * **Description**: Since our application has a community part that people can share their ideas about stocks, news and portfolios, post creation is an essential feature that we should integrate to mobile application.
  
* **Scenario**: This endpoint is required when a user want to share a post with the community.
    * **Implementation**

 ```javascript
const handleCreation = async () => {
    const postData = {
        title: postTitle,
        content: postContent,
        liked_by:[],
        tags:tags,
        portfolios:[]
    };

    const postURL = baseURL + '/posts/';

    try {
        const response = await fetch(postURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN',
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            //console.log('Response:', jsonResponse);
            navigation.navigate("CommunityPage");
           
        } else {
          const errorResponse = await response.json();
          console.log('Error Response:', errorResponse);
          
          throw new Error('Network response was not ok.');
            
        }
    } catch (error) {
      
        console.error('Error:', error);
    }
  };      
 ```
   
* **Example Call**:

    ```javascript
    <TouchableOpacity 
        style={styles.postButton}
        onPress={() => handleCreation()}
    >
    ```

* **Example Response**:
      
    ```json
    [
      {
        "id": 1,
        "title": "Exploring Global Market Opportunities",
        "content": "As the world becomes increasingly interconnected, investors have more opportunities than ever to explore markets beyond their borders. This post delves into emerging markets and potential areas for investment that could yield significant returns.",
        "author": 6,
        "created_at": "2024-11-24T14:02:52.464136Z",
        "updated_at": "2024-11-24T14:02:52.464227Z",
        "liked_by": [],
        "tags": [],
        "portfolios": []
      }
    ]
    


* **Use in Project**: This endpoint ensures that the post to be created is created appropriately checking the access token and gains the functionality to send the posts to the backend.

* **Code-related significant issues:**

  * Issue [#386](https://github.com/bounswe/bounswe2024group2/issues/386) : Initialize dark mode in mobile app
  * Issue [#398](https://github.com/bounswe/bounswe2024group2/issues/398) : Create markets page of the mobile app 
  * Issue [#405](https://github.com/bounswe/bounswe2024group2/issues/405) : Create community page of the mobile app and connect it to the backend 
  * Issue [#406](https://github.com/bounswe/bounswe2024group2/issues/406) : Create post creation page of the mobile app and connect it to the backend 

* **Management-related significant issues:**

  * Issue [#403](https://github.com/bounswe/bounswe2024group2/issues/403) : I made a research about how to create unit tests and planned testing in mobile . 
 

* **Pull requests:** 

  * [#419](https://github.com/bounswe/bounswe2024group2/pull/419): Create markets page for mobile
  * [#421](https://github.com/bounswe/bounswe2024group2/pull/421): Create community page for mobile
  * [#423](https://github.com/bounswe/bounswe2024group2/pull/423): Create post creation page for mobile
  * While merging the PR [#423](https://github.com/bounswe/bounswe2024group2/pull/423), We will face a situation that doesn't allow us to seeing the differences in Github. Therefore, I need to made the necessary changes in command line. Solving the conflicts was a bit challanging, but with my teammate @furkansenkal, we removed reduntant parts of the code and we succeeded to run the mobile app in the first try after merging.

### Rafet Oğuz Pançuk
* **Responsibilities:** I am part of the backend team and responsible for preparation of elicitation questions and mobile mock up pages.

* **Main contributions:** 

  * Prepared elicitation questions
  * Designed and created login, register, forgot password, profile, home, community, post, news mobile mock up pages
  * Connected database to API

* **Code-related significant issues:**
  * Issue [#255](https://github.com/bounswe/bounswe2024group2/issues/255) : Connect Database to API (related [PR](https://github.com/bounswe/bounswe2024group2/pull/278))

* **Non-code-related significant issues:**

  * I prepared elicitation questions. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/253))
  * I designed and created onboarding mobile mock up pages. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/277))
  * I designed and created home, profile, community, post and news mobile mock up pages. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/359))

* **Additional information:**

  * I designed the general visual structure (colors, mobile layouts) of the application.
  * I took notes of a general meeting and a backend meeting.