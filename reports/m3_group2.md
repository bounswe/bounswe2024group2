
# CMPE451 Group 2 Milestone 3 Report

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

   * 1 [**Executive Summary**](#1-Executive-Summary)

   * 2 [**Progress Based on Teamwork**](#2-Progress-Based-on-Teamwork)
     * 2.1 [A summary of work performed by each team member](#2.1-Summary-of-work)
     * 2.2 [Status of Requirements](#2.2-Status-of-Requirements:)
     * 2.3 [API Endpoints:](#2.3-API-Endpoints:)
       * 2.3.1 [The API documentation.](#API-Documentation:)
       * 2.3.2 [Link to the API.](#Link-to-API:-Swagger)
     * 2.4 [User Interface / User Experience](#2.4-User-Interface-/-User-Experience:)
     * 2.5 [Standards](#2.5-Standards)
     * 2.6 [Scenarios](#2.6-Scenarios)
     
   * 3 [**Individual Documentation**](#3-Individual-Documentation)
     * [Cem Güngör](#Cem-Güngör)
     * [Rukiye Aslan](#Rukiye-Aslan-Group2-Backend)
     * [Furkan Şenkal](#Furkan-Şenkal)
     * [Mahmut Buğra Mert](#Mahmut-Buğra-Mert-Group2-frontend)
     * [Kamil Deniz Coşkuner](#Kamil-Deniz-Coşkuner)
     * [Halil İbrahim Kasapoğlu](#Halil-İbrahim-Kasapoğlu)
     * [Muhammed Erkam Gökcepınar](#Muhammed-Erkam-Gökcepınar)
     * [Rafet Oğuz Pançuk](#Rafet-Oğuz-Pançuk)

## 1 Executive Summary
### A.Summary of the Project Status
Our project has reached the final milestone with the primary focus on developing the forum and W3C-compliant annotations. These core functionalities, which are central to our platform, are mostly completed. Users can create and edit posts, interact through comments and likes, and utilize annotations within posts, ensuring compliance with the W3C Web Annotation Data Model.

In addition to the forum, we implemented other essential pages. The portfolio page allows users to track and manage stocks effectively, while the stocks page provides real-time updates on stock performance. Additionally, the news page aggregates relevant financial news, enhancing the platform's usability and value to users. These pages required extensive work, particularly in integrating dynamic data and ensuring user-friendly interfaces.

While the critical functionalities are operational, some features are incomplete or pending refinement. For instance, certain user interaction and administrative capabilities, like user follow lists and post moderation tools, require further development. Despite these gaps, the platform offers a solid foundation with its main features ready for use.

Throughout the development process, the team has adapted to feedback from earlier milestones, focusing on improving collaboration and ensuring realistic prioritization of tasks. Lessons learned during the project have highlighted the importance of clearly defined workflows and early testing of critical features. Overall, the application is on track to fulfill its primary goals and serve as a functional platform for its intended audience.

### B.Status of the Deliverables

| Deliverable/Work | Status | Related Link | 
| ------------------------- | ------------- | ------------- | 
| Github Code Repository        | Completed | [Repository](https://github.com/bounswe/bounswe2024group2)        |
| URL to the Deployed Application    | Completed | [Bull&Bear](http://159.223.28.163:30001/community)        |
| Instruction to build Deployed Application     | Completed | [Quickstart](https://github.com/bounswe/bounswe2024group2/wiki/Quickstart-451)     |
| Release Tag    | Completed | [0.9.0](https://github.com/bounswe/bounswe2024group2/releases/tag/customer-presentation-3)       |
| W3C Standard Decision & Implementation   | Completed | [W3C Standard](#2.5-Standards) |
| Software Requirements Specification | Completed | [SRS](https://github.com/bounswe/bounswe2024group2/wiki/Requirements-%E2%80%90-Cmpe-451)|
| User Manual | Completed | [User Manual](https://github.com/bounswe/bounswe2024group2/wiki/User-Manual)|
| System Manual | Completed | [System Manual](https://github.com/bounswe/bounswe2024group2/wiki/System-Manual)|
| Software Design Documents | Completed | [Class diagram](https://github.com/bounswe/bounswe2024group2/wiki/Class-Diagram-451), [Use Case Diagram](https://github.com/bounswe/bounswe2024group2/wiki/Use-Case-Diagrams), [Sequence Diagram](https://github.com/bounswe/bounswe2024group2/wiki/Sequence-Diagrams-CmpE451)|
| User Scenarios and Mockups | Completed | [Scenarios](https://github.com/bounswe/bounswe2024group2/wiki/User-Scenarios-451), [Mockups](https://github.com/bounswe/bounswe2024group2/wiki/Mockups-451)|
| Project Plan | Completed | [Project Plan](https://github.com/bounswe/bounswe2024group2/wiki/Project-Plan-CmpE451)|
| Unit Tests | Completed | [Backend](https://github.com/bounswe/bounswe2024group2/wiki/Backend-Unit-Tests), [Frontend](https://github.com/bounswe/bounswe2024group2/wiki/Frontend-Unit-Tests), [Mobile](https://github.com/bounswe/bounswe2024group2/wiki/Mobile-Unit-Tests)|
| Lab 8 | Completed | [Lab 8 PR](https://github.com/bounswe/bounswe2024group2/pull/434)|
| Lab 9 | Completed | [Lab 9 Report](https://github.com/bounswe/bounswe2024group2/wiki/Lab-report-9) |




### C.Final Release Notes
The final release of Bull&Bear includes the following features:

* Comprehensive User Profiles: Users can manage their portfolios and view their activity history.
* Advanced Search Functionality: Enhanced search options to find posts, users, and stock information efficiently.
* Stock Linking to Posts: Users can link specific stocks to their posts, making discussions more informative and relevant.
* Line Charts for Multiple Time Ranges: Interactive line charts display stock data across different time ranges for better analysis.
* Annotation Feature: Users can add annotations to their posts, providing additional context and insights for discussions.
* Tag Creation, Addition, and Filtering: Users can create tags, add them to their posts, and filter posts by tags to improve organization and discoverability.
* Like and Comment Functionality: Users can like and comment on posts, enhancing engagement and interaction within the platform.

### D.Changes Made Based on Milestones
From our reflections on earlier milestones, we made several improvements to how we worked:

* Better Communication: We started having regular meetings and used collaboration tools to stay organized and work together better.
* Agile Practices: We followed agile methods, which helped us work step-by-step and adapt to changes more easily.
* Code Reviews: We introduced regular code reviews to keep the code quality high and share knowledge within the team.

These changes helped us work more efficiently, produce better results, and stay more connected as a team.


### E.Reflections to Final Milestone Demo

The final milestone demo gave us a good chance to reflect on both how we worked and what we delivered. One thing we learned is the value of working in an agile way. By following agile methods, we were able to build and improve features step by step, adjusting to challenges and feedback quickly. Good communication within the team was also key to keeping everyone on the same page and solving problems effectively.

During the demo, some issues were pointed out. For example, annotations were missing on the mobile app, even though they were an important feature of the project. This showed us the importance of making sure features work well on all platforms and testing them early.

Another issue was with the stock page, where stocks were only shown in their original currencies, like TRY for Turkish stocks and USD for US stocks. This makes it hard for users who want to compare stocks in a single currency. Fixing this would make the app more user-friendly.

From this demo, we realized how important it is to plan better and check features earlier to avoid last-minute issues. We also learned to focus on both technical details and how users experience the app so we can meet their needs better.

### F.Changes From Start to End of the Project
Looking back, starting the project with a clearer plan and more detailed goals could have made the development process smoother. Using agile methods earlier and setting up tools for continuous integration and deployment from the start would have made things more efficient. Also, getting feedback from potential users early on could have helped us create a product that better fits their needs.

Overall, this project has been a great learning experience. It helped our team improve skills in project management, software development, and working together.

## 2 Progress Based on Teamwork 

## 2.1 Summary of work: 
| **Name**                      | **Summary of Work** |
|-------------------------------|---------------------|
| **Cem Güngör**                |I was a member of the backend team and was primarily responsible for the Markets section of the backend. Worked closely with front end and mobile to include dynamic price fetching, api calling and continiously monitoring and returning the values. I implemented stock indices, which fetches selected stock indices from web, to update database. These indices consists of various stocks. I also implemented the endpoint to return stock prices for a given range or a period for a given interval. This allowed the application to create graphs by using the information we get from libraries, such as yfinance. I've also wrote commands to update or create database on each build, allowing our app to adapt to changes.                     |
| **Rukiye Aslan**              |        I was a member of backend team and was mainly responsible for implementing REST endpoints in the backend and arranging docker and database configurations. In the endpoints part, I implemented or refactored annotation, search, portfolio, user, comment endpoints. I also created annotation project from the scratch, configured its docker container, and its swagger documentation. Also, I created database for annotation project, containerized it and connected it to the annotation project. To maintain integrity with newly created annotation app, I added annotation creation and retrieval endpoints in the backend project which is internally connected to the annotation project.       |
| **Furkan Şenkal**             |I was a member of the mobile team and primarily responsible for the Markets, Portfolio, and News pages and their components. My tasks included remaking the Markets page with backend integration and creating the Stock Details page featuring real-time graphics. I implemented the Portfolio feature for mobile, which included developing the Portfolio page to allow users to view their portfolios, creating the Portfolio Details page with a pie chart and stock addition/removal functionalities, and designing the Create Portfolio page to enable users to create new portfolios. Additionally, I added new RSS feeds to the News page and handled the navigation and coordination between these pages. I also developed unit tests for the pages I was responsible for to ensure their functionality and reliability.                     |
| **Rafet Oğuz Pançuk**         |In Milestone 3, I contributed to the backend development by implementing follow-unfollow, like-unlike, post searching with multiple tags, and post-stock relations. I developed a fake post generation system for the demo and wrote unit tests for the onboarding module. Additionally, I fixed bugs, including validation errors, and enhanced CRUD methods. I created the User and System Manuals and documented unit tests. Finally, I contributed to team management by documenting General Meeting #11 and submitting/reviewing multiple pull requests to address key issues and features.|
| **Mahmut Buğra Mert**         | I was a member of the frontend team for web development. In general, I was responsible with community page and its components. I was responsible of implementing comments, tags, like/unlike, annotation. I implemented the navigation and coordination between them and tested them. Also, I created a unit test for Assets Modal Page.|
| **Kamil Deniz Coşkuner**      |                     |
| **Halil İbrahim Kasapoğlu**   | I was a member of the frontend team, focused on completing frontend integration and testing. I created Jest test files for various frontend components and documented the testing strategy along with acceptance criteria. I developed and connected key pages to the API, including the Portfolio Page, Stock Details View, Navbar Search, and User Profile Page. I also worked on deploying the annotations server pipeline and updated the Kubernetes configuration. To optimize the frontend, I refactored the Dockerfile for production readiness and resolved minor bugs. Additionally, I created a custom alert modal provider and contributed to documenting final demo scenarios.
| **Muhammed Erkam Gökcepınar** |  I was a member of the mobile team, responsible for developing and managing the community-related features of the mobile application. I implemented functionalities such as liking, commenting, and linking stock graphics and tags to posts. I developed and connected key pages, including the Community, Post, and Create Post pages, ensuring seamless integration with the API. To maintain code quality, I created Jest test files for these pages and documented the testing strategy with acceptance criteria. Additionally, I optimized the project by configuring environment-specific variables, creating a configuration file, and preparing the APK file for release. I also enhanced user experience by creating custom UI components like a stock search modal and alert modal provider. Throughout the project, I resolved significant issues, including implementing tag creation, post interactions, and stock linking, while documenting final demo scenarios to align with team objectives.                   |


## 2.2 Status of Requirements:

### Functional Requirements

#### 1.1 User Requirements

##### 1.1.1 Register & Login
* **1.1.1.1** Users shall be able to register with a unique username, e-mail address, and password. **[Completed]**
* **1.1.1.2** User shall be registered with a secure password. **[Completed]**
* **1.1.1.3** Users shall be able to log in using their registered credentials. **[Completed]**
* **1.1.1.4** Users should have the option to reset their password via e-mail verification. **[In Progress]**
* **1.1.1.5** Users shall be able to log out from the system. **[Completed]**
* **1.1.1.6** Users shall accept the Terms of Use and Privacy Policy in order to register. **[Not Started]**

##### 1.1.2 User Types
###### 1.1.2.1 Guest User
* **1.1.2.1.1** Guest user shall be able to view posts. **[Completed]**
* **1.1.2.1.2** Guest user shall be able to view stocks. **[Completed]**
* **1.1.2.1.3** Guest user shall be able to view user profiles. **[In progress]**
* **1.1.2.1.4** Guest user shall be able to search for users by their usernames. **[In progress]**
* **1.1.2.1.5** Guest user shall be able to semantic search for posts. **[Completed**
* **1.1.2.1.6** Guest user shall be able to view recent news about financial markets. **[Completed]**

###### 1.1.2.2 Registered User
* **1.1.2.2.1** Registered users shall be able to create and edit posts. **[Completed]**
* **1.1.2.2.2** Registered users shall be able to like and unlike posts. **[Completed]**
* **1.1.2.2.3** Registered users shall be able to write comments to posts. **[Completed]**
* **1.1.2.2.4** Registered users shall be able to follow and unfollow other users on the platform. **[In progress]**
* **1.1.2.2.5** Registered users shall be able to view her/his followers. **[In progress]**
* **1.1.2.2.6** Registered users should be able to add graphs to their posts. **[In progress]**
* **1.1.2.2.7** Registered users shall be able to perform the same actions as guest users. **[In Progress]**

###### 1.1.2.3 Admin
* **1.1.2.3.1** An admin shall be able to ban user accounts. **[Not Started]**
* **1.1.2.3.2** An admin shall be able to remove(ban) posts. **[Not Started]**
* **1.1.2.3.3** An admin shall be able to remove(hide) comments on posts. **[Not Started]**
* **1.1.2.3.4** An admin shall be able to remove tag. **[Not Started]**

##### 1.1.3 Profile Preferences
* **1.1.3.1** Users shall be able to view profile information. **[Completed]**
* **1.1.3.2** Users shall be able to update her/his profile information. **[Not Started]**
* **1.1.3.3** Users should be able to add/remove a profile photo. **[Not Started]**

---

#### 1.2 System Requirements

##### 1.2.1 Search
###### 1.2.1.1 Searching
* **1.2.1.1.1** The system shall allow users to search for users. **[In progress]**
* **1.2.1.1.2** The system shall allow users to search for posts through tags, titles, author. **[Completed]**
* **1.2.1.1.3** The system shall allow users to search for stocks. **[Completed]**

###### 1.2.1.2 Filtering
* **1.2.1.2.1** The system shall allow users to filter the stocks as increasing and decreasing. **[Not Started]**
* **1.2.1.2.2** The system shall allow users to filter for posts according to the post's portfolio, author and author's badges. **[Not Started]**

##### 1.2.2 Portfolio
* **1.2.2.1** Portfolios should be created by the users by entering purchase price and quantity of stock. **[Completed]**
* **1.2.2.2** Portfolios shall include one or more stock. **[Completed]**

##### 1.2.3 News
* **1.2.3.1** The system shall include news about stocks. **[Completed]**

##### 1.2.4 Posts
* **1.2.4.1** The system shall require registered users to add title to posts. **[Completed]**
* **1.2.4.2** The system shall allow registered users to add tags to posts. **[Completed]**
* **1.2.4.3** The system shall allow registered users to add their portfolios to posts. **[Not Started]**
* **1.2.4.4** The system shall allow registered users to add news to posts. **[Completed]**
* **1.2.4.5** The system shall allow registered users to add ideas in the form of text to posts. **[Completed]**
* **1.2.4.6** The system shall allow registered users to add line charts of stocks to posts. **[Completed]**
* **1.2.4.7** The system shall store author of posts. **[Completed]**
* **1.2.4.8** The system shall store creation date of posts. **[Completed]**
* **1.2.4.9** The system shall store last edit date of posts. **[Completed]**
* **1.2.4.10** The system shall store like count of posts. **[Completed]**
* **1.2.4.11** The system shall be able to list comments related to a post. **[Completed]**

##### 1.2.5 Badges
* **1.2.5.1** The system shall include badges which gain new abilities to users. **[Completed]**
* **1.2.5.2** The system shall have a badge type called "High-liked". **[Completed]**
* **1.2.5.3** The system shall have a badge type called "Cretager". **[Completed]**

##### 1.2.6 Tags
* **1.2.6.1** The system shall limit tag length to 40 chars. **[Completed]**
* **1.2.6.2** The system shall limit the tags to be lowercase and unique. **[Completed]**

##### 1.2.7 Annotations
* **1.2.7.1** The system shall use annotations that comply with the W3C Web Annotation Data Model. **[Completed]**
* **1.2.7.2** The system shall use annotations appearing in the form of a highlighted text. **[Completed]**
* **1.2.7.3** The system shall allow annotations only in post bodies. **[Completed]**

---

### Non-Functional Requirements

#### 2.1 Platforms & Compatibility
* **2.1.1** The application shall be available for Web and Mobile platforms. **[Completed]**
* **2.1.2** The web application shall be available for web browsers supporting ES6. **[Completed]**
* **2.1.3** The web application shall support FHD (1920x1080) or higher resolutions, ensuring that all charts and graphs are rendered at a minimum resolution of 1080p for clarity and detail. **[Completed]**
* **2.1.4** The mobile application shall be available for Android(API 33 or higher) operating systems. **[Completed]**
* **2.1.5** The mobile application shall support portrait orientation on mobile devices. **[Completed]**
* **2.1.6** The mobile application shall support FHD or higher resolutions, with charts and graphs rendered at a minimum resolution of 720p for clear visibility. **[Completed]**

#### 2.2 Supported Languages
* **2.2.1** Application shall be available in English Language. **[Completed]**

#### 2.3 Security
* **2.3.1** User authorization credentials shall be encrypted to ensure the confidentiality of user data. **[Completed]**
* **2.3.2** User login sessions shall expire after 12 hours of inactivity, requiring re-authentication to enhance security. **[Completed]**
* **2.3.3** User shall verify their email addresses after signing up to ensure the validity of accounts before logging into the system. **[Completed]**

#### 2.4 Privacy
* **2.4.1** The application shall comply with KVKK. **[Not Started]**
* **2.4.2** The application shall provide a comprehensive privacy policy to users, clearly outlining data collection, usage, and sharing practices, and shall require user confirmation to operate. **[Not Started]**

#### 2.5 Restricted Content
* **2.5.1** The application shall not include or promote any adult content, ensuring a safe and professional environment for users engaging with financial information. **[Not Started]**
* **2.5.2** The application shall provide clear disclaimers regarding the nature of financial content, indicating the risks associated with trading and investment activities. **[Not Started]**
* **2.5.3** The application shall provide clear guidelines on acceptable use of content, including prohibiting the sharing of misleading financial advice or illegal activities. **[Not Started]**

#### 2.6 Performance
* **2.6.1** The application shall load within 3 seconds under normal network conditions. **[Completed]**
* **2.6.2** The application shall not be unresponsive at a maximum of 10 seconds. **[Completed]**
* **2.6.3** The application shall stay responsive for up to 5000 users concurrently. **[Completed]**


## 2.3 API Endpoints:
  * The API documentation.
### Link to API: [Swagger](http://159.223.28.163:30002/docs/)

## API Documentation:
**Get /table_name/{id} always returns specified database object with given ID, unless otherwise specified**
**Delete /table_name/{id} always deletes specified database object with given ID, unless otherwise specified**
**Patch /table_name/{id} always updates specified database object with given ID, unless otherwise specified**
**Put /table_name/{id} always updates specified database object with given ID, unless otherwise specified**

- ### Register:  
> ```json
> {
>   "username": "testuser",
>   "password": "zxcv1234!",
>   "email": "testuser@gmail.com"
> }
> ```

- ### Login: 
  - Returns access and refresh tokens. Should be used for calls that require tokens

> ```json
> {
>   "username": "testuser",
>   "password": "zxcv1234!"
> }  
> ```

- ### Users:
  -  **Get:** returns users as a list: id - url - username - email
  - **Post**  

> ```json
> {
>   "username": "testuser",
>   "email": "testuser@gmail.com"
> }
> ```

 - **Get by username:** Returns user with given username

> ` /users/by-username/{PeterLynch}`

> ```json
> {
>   "id": 27,
>   "url": "http://159.223.28.163:30002/users/27/",
>   "username": "PeterLynch",
>   "email": "cemgungor1907+benjamin@gmail.com"
> }
> ```

- ### Follow:  
 - **Post:** Follow user with given username

> ```json
>  {
>   "username": "PeterLynch"
> }
> ```


- ### Unfollow:  
 - **Post:** Unfollow user with given username, if followed
> ```json
>  {
>   "username": "PeterLynch"
> }
> ```


- ### Tags:  
  - **Get:** Returns a list of tags.

> ```json
>  [
>   {
>     "id": 1,
>     "name": "türkiye",
>     "user_id": 13
>   },
>   {
>     "id": 2,
>     "name": "usa",
>     "user_id": 13
>   }, ...
> ]
> ```

  - **Post:** Create a tag.
> ```json
> {
>   "name": "Investment",
> }  
> ```

- ### Tags:  
  - **Get:** Returns a paginated list of stocks. Prices are fetched real time from yfinance

> ```json
> [
>   {
>     "id": 2,
>     "name": "A1 CAPITAL YATIRIM",
>     "symbol": "A1CAP",
>     "currency": 2,
>     "price": 24.82
>   },
>   {
>     "id": 3,
>     "name": "ACIPAYAM SELULOZ",
>     "symbol": "ACSEL",
>     "currency": 2,
>     "price": 128.2
>   }, ...
> ]
> ```

  - **Post:** Create a stock. Requires currency id

> ```json
> {
>   "name": "Akbank",
>   "symbol": "AKBNK",
>   "currency": <currency_id>
> }
> ```

  - **Get:** /stocks/{id} Returns details of a given stock

> ```json
> {
>   "id": 1500,
>   "name": "BlackRock Municipal Income Trust II",
>   "symbol": "BLE",
>   "currency": {
>     "id": 3,
>     "name": "US Dollar",
>     "code": "USD"
>   },
>   "price": 10.64,
>   "detail": {
>     "address1": "50 Hudson Yards",
>     "city": "New York",
>     "fax": "212 810 5801",
>     "website": "https://www.blackrock.com/investing/products/240222/blackrock-municipal-income-trust-ii-usd-fund",
>     "industry": "Asset Management",
>     "companyOfficers": [
>       {
>         "maxAge": 1,
>         "name": "Mr. Charles Choon Sik Park",
>         "age": 56,
>         "title": "Chief Compliance Officer and Anti- Money Laundering Officer",
>         "yearBorn": 1967,
>         "exercisedValue": 0,
>         "unexercisedValue": 0
>       } ...
>     ],
>     "maxAge": 86400,
>     "priceHint": 2,
>     ...
>   } 
> }
> ```

  - **Post:** /stocks/{id}/get_historical_data Get historical data of a stock, fetched from yfinance
  - If start - end date is specified, returns that interval. If not returns given period with given interval. Interval is required

> ```json
> {
>   "start_date": "2024-12-16",
>   "end_date": "2024-12-18",
>   "interval": "1d"
> }
> ```
> 
> ```json
> {
>   "Open": [
>     10.72,
>     10.72
>   ],
>   "High": [
>     10.84,
>     10.73
>   ],
>   "Low": [
>     10.72,
>     10.63
>   ],
>   "Close": [
>     10.75,
>     10.64
>   ],
>   "Volume": [
>     150100,
>     301800
>   ],
>   "Dividends": [
>     0.05,
>     0
>   ],
>   "Stock Splits": [
>     0,
>     0
>   ],
>   "Date": [
>     "2024-12-16T00:00:00-05:00",
>     "2024-12-17T00:00:00-05:00"
>   ]
> }
> ```

> ```json
> {
>   "period": "1d",
>   "interval": "1d"
> }
> ```
> ```json {
> 
>   "Open": [
>     10.72
>   ],
>   "High": [
>     10.64
>   ],
>   "Low": [
>     10.6
>   ],
>   "Close": [
>     10.63
>   ],
>   "Volume": [
>     23122
>   ],
>   "Dividends": [
>     0
>   ],
>   "Stock Splits": [
>     0
>   ],
>   "Date": [
>     "2024-12-18T00:00:00-05:00"
>   ]
> }
> ```

  - **Post:** /stocks/search Return all stocks that match the pattern on any case, limited by specified **limit**.

> ```json
> {
>   "pattern": "Ade",
>   "limit": 10
> }
> 
> ```
> ```json
> [
>   {
>     "id": 772,
>     "name": "Adecoagro S.A. Common Shares",
>     "symbol": "AGRO",
>     "currency": 3,
>     "price": 10.07
>   },
>   {
>     "id": 685,
>     "name": "Adeia Inc. Common Stock",
>     "symbol": "ADEA",
>     "currency": 3,
>     "price": 14.49
>   },
>   {
>     "id": 4,
>     "name": "ADEL KALEMCILIK",
>     "symbol": "ADEL",
>     "currency": 2,
>     "price": 36.14
>   }
> ]
> ```

- ### Search:  
  - **Get:** /search/all/{q} Search all posts, tags and portfolios on the database. Q is required, search parameter. **q=ade**
  - Same logic applies for /search/portfolios/{q} Search only portfolios
  - Same logic applies for /search/posts/{q} Search only posts
  - Same logic applies for /search/tags/{q} Search only tags

> ```json
> {
>   "posts": [
>     {
>       "id": 9,
>       "title": "Thoughts on the BIST30 Lately?",
>       "content": "Hey everyone, I’ve been keeping an eye on the BIST30 index, and it’s been an interesting ride lately. It feels like there’s a lot going on with some of the top companies driving the market. Anyone else noticing any patterns or surprises? Personally, I’m curious about how certain sectors are holding up, especially with everything happening in the global economy. Let’s chat—I’d love to hear your takes!",
>       "author": 13,
>       "created_at": "2024-11-24T23:17:27.394430Z",
>       "updated_at": "2024-11-24T23:17:27.394497Z",
>       "liked_by": [
>         6,
>         13,
>         22
>       ],
>       "disliked_by": [],
>       "tags": [],
>       "portfolios": [],
>       "stocks": []
>     }
>   ],
>   "tags": [
>     {
>       "id": 3,
>       "name": "bist30",
>       "user_id": 13
>     }
>   ],
>   "portfolios": []
> }
> ```

- ### Profiles:
  - **Get:** /profiles/ returns all profiles

> ```json
> [
>   {
>     "id": 1,
>     "user": 17,
>     "profile_picture": null,
>     "followers": [],
>     "following": [],
>     "bio": "",
>     "location": ""
>   },
>   {
>     "id": 2,
>     "user": 18,
>     "profile_picture": null,
>     "followers": [
>       9
>     ],
>     "following": [],
>     "bio": "",
>     "location": ""
>   },...
> ]
> ```

  - **Post:** /profiles/   are created when a user is created

> ```json
> {
>   "profile_picture": "string",
>   "followers": [
>     
>   ],
>   "following": [
>     
>   ],
>   "bio": "string",
>   "location": "string"
> }
> ```

  - **Get:** /profiles/by-user-id/{user_id} returns profile given id

> ```json
> {
>   "id": 15,
>   "user": 15,
>   "profile_picture": null,
>   "followers": [
>     9
>   ],
>   "following": [],
>   "bio": "",
>   "location": ""
> }
> ```

- ### Posts:
  - **Get:** /posts/ returns all posts, no pagination is applied
> ```json
> [
>   {
>     "id": 1,
>     "title": "Exploring Global Market Opportunities",
>     "content": "As the world becomes increasingly interconnected, investors have more opportunities than ever to explore markets beyond their borders. This post delves into emerging markets and potential areas for investment that could yield significant returns.",
>     "author": 6,
>     "created_at": "2024-11-24T14:02:52.464136Z",
>     "updated_at": "2024-11-24T14:02:52.464227Z",
>     "liked_by": [
>       18
>     ],
>     "disliked_by": [],
>     "tags": [],
>     "portfolios": [],
>     "stocks": []
>   },
>   {
>     "id": 9,
>     "title": "Thoughts on the BIST30 Lately?",
>     "content": "Hey everyone, I’ve been keeping an eye on the BIST30 index, and it’s been an interesting ride lately. It feels like there’s a lot going on with some of the top companies driving the market. Anyone else noticing any patterns or surprises? Personally, I’m curious about how certain sectors are holding up, especially with everything happening in the global economy. Let’s chat—I’d love to hear your takes!",
>     "author": 13,
>     "created_at": "2024-11-24T23:17:27.394430Z",
>     "updated_at": "2024-11-24T23:17:27.394497Z",
>     "liked_by": [
>       6,
>       13,
>       22
>     ],
>     "disliked_by": [],
>     "tags": [],
>     "portfolios": [],
>     "stocks": []
>   },
>   {
>     "id": 10,
>     "title": "What the U.S. Elections Might Mean for the Markets",
>     "content": "With the U.S. elections coming up, I’ve been thinking about how the results could impact the markets. Changes in leadership often shift policies, which might affect sectors like energy, tech, or healthcare. There’s also the possibility of short-term volatility depending on the outcome. What do you all think—could there be opportunities, or is it more about managing risks? Let’s share some ideas!",
>     "author": 13,
>     "created_at": "2024-11-25T08:48:47.869592Z",
>     "updated_at": "2024-11-25T08:48:47.869650Z",
>     "liked_by": [
>       6,
>       18
>     ],
>     "disliked_by": [],
>     "tags": [],
>     "portfolios": [],
>     "stocks": []
>   }, 
>   ...
> ]
> ```

- **Post:** /posts/ create a post. Can send tag - portfolio or a stock. Also requires a title.
> ```json
> {
>   "title": "Blackbaud Bullish",
>   "content": "Blackbaud's might increase in the future because of their new investments",
>   "liked_by": [
>     
>   ],
>   "disliked_by": [
>     
>   ],
>   "tags": [
>     8
>   ],
>   "portfolios": [
>     
>   ],
>   "stocks": [
>     1505
>   ]
> }
> ```

- **Get:** /posts/posts-by-stock/{stock_id} get all posts that include given stock id.

`/posts/posts-by-stock/{4}`

> ```json
> [
>   {
>     "id": 174,
>     "title": "Adel go long",
>     "content": "Adel is a company that produces pens. Students are increasing in number in Turkey, Buy adel",
>     "author": 26,
>     "created_at": "2024-12-17T12:05:42.147647Z",
>     "updated_at": "2024-12-17T12:05:42.147695Z",
>     "liked_by": [
>       13,
>       22,
>       26
>     ],
>     "disliked_by": [],
>     "tags": [
>       1,
>       8
>     ],
>     "portfolios": [],
>     "stocks": [
>       4
>     ]
>   }
> ]
> ```

- **Get:** /posts/posts-by-tag/{tag_id} get all posts that include given tag id.

`/posts/posts-by-tag/{8}`

> ```json
> [
>   {
>     "id": 173,
>     "title": "Apple stock lately",
>     "content": "Apple stock looks great for the last five days. Also their new mac mini is incredible",
>     "author": 26,
>     "created_at": "2024-12-17T11:34:59.964023Z",
>     "updated_at": "2024-12-17T11:34:59.964060Z",
>     "liked_by": [],
>     "disliked_by": [],
>     "tags": [
>       2,
>       8
>     ],
>     "portfolios": [],
>     "stocks": []
>   },
>   {
>     "id": 174,
>     "title": "Adel go long",
>     "content": "Adel is a company that produces pens. Students are increasing in number in Turkey, Buy adel",
>     "author": 26,
>     "created_at": "2024-12-17T12:05:42.147647Z",
>     "updated_at": "2024-12-17T12:05:42.147695Z",
>     "liked_by": [
>       13,
>       22,
>       26
>     ],
>     "disliked_by": [],
>     "tags": [
>       1,
>       8
>     ],
>     "portfolios": [],
>     "stocks": [
>       4
>     ]
>   },
>   {
>     "id": 175,
>     "title": "Nvidia all time favorite",
>     "content": "NVIDIA has long been a standout in the tech world, revolutionizing industries with its cutting-edge GPUs and AI technologies. Its stock reflects this innovation, consistently gaining attention from investors as the company expands into AI, gaming, data centers, and autonomous vehicles. Known for its ability to stay ahead of trends, NVIDIA continues to set benchmarks for performance and innovation, making it a key player in shaping the future of technology.",
>     "author": 3,
>     "created_at": "2024-12-17T12:31:31.482964Z",
>     "updated_at": "2024-12-17T12:31:31.483003Z",
>     "liked_by": [
>       7
>     ],
>     "disliked_by": [],
>     "tags": [
>       8,
>       23
>     ],
>     "portfolios": [],
>     "stocks": [
>       5138
>     ]
>   },
>   {
>     "id": 176,
>     "title": "Palantir is kind of risky",
>     "content": "Palantir Technologies offers innovative data analytics solutions but carries investment risks due to high competition, reliance on large contracts, and valuation volatility. It's suited for risk-tolerant investors seeking growth potential. Be careful investors !!",
>     "author": 26,
>     "created_at": "2024-12-17T13:12:51.774972Z",
>     "updated_at": "2024-12-17T13:12:51.775012Z",
>     "liked_by": [],
>     "disliked_by": [],
>     "tags": [
>       5,
>       8
>     ],
>     "portfolios": [],
>     "stocks": [
>       5597
>     ]
>   }
> ]
> ```

- **Get:** /posts/posts-by-tags/{tags} get all posts that include given list of tag ids

`/posts/posts-by-tags/{1,4}`

> ```json
> [
>   {
>     "id": 174,
>     "title": "Adel go long",
>     "content": "Adel is a company that produces pens. Students are increasing in number in Turkey, Buy adel",
>     "author": 26,
>     "created_at": "2024-12-17T12:05:42.147647Z",
>     "updated_at": "2024-12-17T12:05:42.147695Z",
>     "liked_by": [
>       13,
>       22,
>       26
>     ],
>     "disliked_by": [],
>     "tags": [
>       1,
>       8
>     ],
>     "portfolios": [],
>     "stocks": [
>       4
>     ]
>   }
> ]
> ```

- **Get:** /posts/posts-by-user/{user_id} get all posts that is written by given user_id

`/posts/posts-by-user/{15}`

> ```json
> [
>   {
>     "id": 70,
>     "title": "Is transform cutting-edge applications really the future?",
>     "content": "Anyone else worried about how Congolese franc is affecting disintermediate rich channels? I think it’s time we started discussing this more seriously.",
>     "author": 15,
>     "created_at": "2024-12-16T17:29:19.733090Z",
>     "updated_at": "2024-12-16T17:29:19.733155Z",
>     "liked_by": [
>       13
>     ],
>     "disliked_by": [],
>     "tags": [],
>     "portfolios": [],
>     "stocks": []
>   },
>   {
>     "id": 75,
>     "title": "Do you think architect 24/7 networks is overhyped?",
>     "content": "Anyone else worried about how Congolese franc is affecting disintermediate rich channels? I think it’s time we started discussing this more seriously.",
>     "author": 15,
>     "created_at": "2024-12-16T17:29:19.754696Z",
>     "updated_at": "2024-12-16T17:29:19.754733Z",
>     "liked_by": [],
>     "disliked_by": [],
>     "tags": [],
>     "portfolios": [],
>     "stocks": []
>   },
>   {
>     "id": 84,
>     "title": "Anyone else seeing the hype around incentivize robust methodologies?",
>     "content": "I’ve been dabbling in some research about repurpose revolutionary supply-chains, and I think I’m onto something exciting. Let’s connect if you’re interested!",
>     "author": 15,
>     "created_at": "2024-12-16T17:29:19.788027Z",
>     "updated_at": "2024-12-16T17:29:19.788068Z",
>     "liked_by": [],
>     "disliked_by": [],
>     "tags": [],
>     "portfolios": [],
>     "stocks": []
>   }
> ]
> ```


- ### Post Add Stock:

- **Post:** /post-add-stocks add given id to a stock

> ```json
> {
>   "post_id": 80,
>   "stock_ids": [
>     1505
>   ]
> }
> ```

> ```json
> {
>   "message": "Stocks added successfully."
> }
> ```


- ### Portfolio:

- **Get:** /portfolios/  get all portfolios

> ```json
> [  
> {
>     "id": 8,
>     "name": "ilkPortfolyom",
>     "description": "This is a new portfolio",
>     "user_id": 13,
>     "created_at": "2024-12-13T08:20:26.107660Z",
>     "updated_at": "2024-12-13T08:21:01.659232Z",
>     "stocks": [
>       {
>         "stock": 15,
>         "price_bought": "63.50",
>         "quantity": 5
>       },
>       {
>         "stock": 51,
>         "price_bought": "68.70",
>         "quantity": 2
>       }
>     ]
>   },...
> ]
> ```

- **Post:** /portfolios/  create a portfolio

> ```json
> {
>   "name": "first",
>   "description": "my portfolio",
>   "stocks": [
>     {
>       "stock": 4,
>       "price_bought": "15.1",
>       "quantity": 10
>     }
>   ]
> }
> ```

> ```json
> {
>   "id": 31,
>   "name": "first",
>   "description": "my portfolio",
>   "user_id": 26,
>   "created_at": "2024-12-20T17:42:36.539799Z",
>   "updated_at": "2024-12-20T17:42:36.539848Z",
>   "stocks": [
>     {
>       "stock": 4,
>       "price_bought": "15.10",
>       "quantity": 10
>     }
>   ]
> }
> ```

- **Get:** /portfolios/portfolios-by-user/{user_id}/ get all portfolios of a user

- ### Portfolio-add-stocks:

- **post:** /portfolio-stocks/add_stock/ add a stock to portfolio, only if logged in user is the owner of it

> ```json
> {
>   "portfolio_id": 80,
>   "stock": 1505,
>   "price_bought": "15.5",
>   "quantity": 10
> }
> ```

> ```json
> {
>   "status": "Stock added to portfolio"
> }
> ```

- **post:** /portfolio-stocks/remove-stock/ remove a stock to portfolio, only if logged in user is the owner of it

- ### News:

- **post:** /news/ fetch news from various predefined rss feeds

> ```json
> {
>   "feed_name": "turkey"
> }
> ```

> ```json
> [
>   {
>     "title": "Zenginler 5 ülkeden arsa almaya başladı bile: Dünyanın sonunda gizli sığınak olacaklar",
>     "link": "https://www.ntv.com.tr/galeri/ekonomi/zenginler-5-ulkeden-arsa-almaya-basladi-bile-dunyanin-sonunda-gizli-siginak-olacaklar,pzv_n3SGsEyiYkiFn0P7OA",
>     "author": "NTV",
>     "published": "2024-12-20T16:47:19+03:00",
>     "description": "Dünya nüfusunun hızla artması, salgın hastalıklar, iklim değişikliği ve küresel ısınma gibi tehditler, insan uygarlığını ciddi risklerle karşı karşıya bırakıyor. Bilim insanları yıllardır bu tehditlere karşı hazırlık yapıyor ve …",
>     "image": "https://cdn1.ntv.com.tr/gorsel/QIWyYHQ_U0K5DmHj4S15og.jpg?width=1200&ampmode=crop&ampscale=both"
>   }, …
> ```

- ### Like:

- **post:** /like/ like or if already liked, remove like for the given post id.

- ### Dislike:

- **post:** /dislike/ dislike or if already disliked, remove dislike for the given post id.

- ### Indices:

- **get:** /indices/ return given indices in database, their stocks, currency and current price of the index

> ```json
> [
>   {
>     "id": 1,
>     "name": "BIST 100",
>     "symbol": "XU100",
>     "currency": {
>       "id": 2,
>       "name": "Turkish Lira",
>       "code": "TRY"
>     },
>     "stocks": [
>       {
>         "symbol": "ADEL",
>         "currency": {
>           "id": 2,
>           "name": "Turkish Lira",
>           "code": "TRY"
>         }
>       },…      
>     ],
>     "price": 9724.5
> }
> ]
> ```

- **post:** /indices/ create a index with the given stock ids

> ```json
> {
>   "name": "BIST12",
>   "symbol": "XU012",
>   "currency": 1,
>   "stocks": [
>     1,2,3,4
>   ]
> }
> ```

- **get:** /indices/{id} returns the given index with its stocks and their current prices.

> ```json
> {
>   "id": 2,
>   "name": "BIST 50",
>   "symbol": "XU050",
>   "currency": {
>     "id": 2,
>     "name": "Turkish Lira",
>     "code": "TRY"
>   },
>   "stocks": [
>     {
>       "currency": "TRY",
>       "symbol": "AEFES.IS",
>       "price": 234.6
>     },...
> ],
>   "price": 8573.3798828125
> }
> 
> ```


- ### Follow:

- **get:** /follow/ follows if not followed or if followed does nothing. 

> ```json
> {
>   "username": "cemgungor"
> }
> ```


- ### Currencies:

- **get:** /currencies/ gets all currencies in the database
> ```json
> [
>   {
>     "id": 2,
>     "name": "Turkish Lira",
>     "code": "TRY"
>   },
>   {
>     "id": 3,
>     "name": "US Dollar",
>     "code": "USD"
>   }
> ]
> ```

- **post:** /currencies/ creates a currency in the database
> ```json
> {
>   "name": "EURO",
>   "code": "EUR"
> }
> ```

- ### Comments:

- **post:** /comments/ creates a comment to the given post id
> ```json
> {
>   "post_id": 10,
>   "content": "great idea"
> }
> ```

- **get:** /comments/post-comments/{post_id} gets all comments on a post

`/comments/post-comments/{10}`

> ```json
> [
>   {
>     "id": 10,
>     "post_id": 10,
>     "user_id": 18,
>     "content": "Hmm, very interesting"
>   },…
> ]
> ```

- ### Annotations:

- **get:** /annotations/ gets an annotation for a post

- **post:** /annotations/ creates an annotation for a given post
> ```json
> {
>   "post_id": 10,
>   "start": 10,
>   "end": 40,
>   "value": "interesting..."
> }
> ```

> ```json
> {
>   "id": 78,
>   "body": {
>     "id": 78,
>     "type": "TextualBody",
>     "value": "interesting...",
>     "format": "text/plain",
>     "language": "en"
>   },
>   "target": {
>     "id": 78,
>     "type": "TextPositionSelector",
>     "start": 10,
>     "end": 40,
>     "source": "http://159.223.28.163:30002/posts/10"
>   },
>   "creator": {
>     "id": 78,
>     "creator_id": "http://159.223.28.163:30002/users/26",
>     "type": "Person",
>     "name": "cemgungor"
>   },
>   "generator": null,
>   "type": "Annotation",
>   "created": "2024-12-20T18:02:50.688146Z",
>   "modified": "2024-12-20T18:02:50.688359Z"
> }
> ```

- **get:** /annotations/post-annotations/{post_id} gets all annotations on a post

> `/annotations/post-annotations/{10}`

> ```json
> [
>   {
>     "post_id": 10,
>     "start": 375,
>     "end": 380,
>     "value": "lets",
>     "user_id": 18,
>     "created_at": "2024-12-16T09:30:11.990427Z",
>     "updated_at": "2024-12-16T09:30:11.990823Z"
>   }, …
> ]
> ```


## 2.4 User Interface / User Experience:

 ### Mobile
  #### Links to the code in the project repository for each page. (Screenshots are in the same order)

   - [Login](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/Login.js)
   - [Register](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/Register.js)
   - [Forgot Password](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/ForgotPassword.js)
   - [Profile Page](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/ProfilePage.js)
   - [Home](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/Home.js)
   - [Community](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/Community.js)
   - [Post](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/Post.js)
   - [Create Post](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/CreatePost.js)
   - [News](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/News.js)
   - [Markets](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/Markets.js)
   - [Stock Details](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/StockDetails.js)
   - [Portfolio](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/Portfolio.js)
   - [Portfolio Details](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/PortfolioDetails.js)
   - [Create Portfolio](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/src/pages/CreatePortfolio.js)

  #### Screenshots
  #### - **Login - Register - Forgot Password Pages**
<div style="display: flex; align-items: center; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/6d9f1a00-c975-4be5-abde-82abf0cae8bc" alt="Login" width="250"/>
    <img src="https://github.com/user-attachments/assets/5542dc24-3fd9-423e-9c17-c6a3f8efcc72" alt="Register" width="250"/>
    <img src="https://github.com/user-attachments/assets/f8ba1124-aed3-41b7-899f-70e5664ab930" alt="Forgot Password" width="250"/>
</div>

  #### - **Profile Page**
<div style="display: flex; align-items: center; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/171f0571-57e2-4a7f-b6bb-461ea0cb0ee0" alt="Profile Page" width="250"/>
</div>

  #### - **Home Page**
<div style="display: flex; align-items: center; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/baf33457-1cfe-4d63-a111-10df87941275" alt="Home" width="250"/>
</div>

  #### - **Community - Post - Create Post Pages**

<div style="display: flex; align-items: center; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/c4549b10-bef8-4dee-85d1-bca79bf9bfad" alt="Community" width="250"/>
    <img src="https://github.com/user-attachments/assets/5af469e2-edf3-426d-a860-3f2b2f7f66dc" alt="Post" width="250"/>
    <img src="https://github.com/user-attachments/assets/c0422f17-f7ca-496e-a032-53498285e180" alt="Create Post" width="250"/>
</div>


  #### - **News Page**

<div style="display: flex; align-items: center; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/2f76afe6-4d5f-4063-95a9-9abedb87dac6" alt="News" width="250"/>
</div>

  #### - **Markets - Stock Details Pages**

<div style="display: flex; align-items: center; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/4619f4c7-6ea6-4717-8c3a-18f0478d0b9f" alt="Markets" width="250"/>
    <img src="https://github.com/user-attachments/assets/060c54a8-5400-4cfe-8176-b5b6e1be7eba" alt="Stock Details" width="250"/>
</div>

  #### - **Portfolio - Portfolio Details - Create Portfolio Pages**

<div style="display: flex-start; align-items: flex-start; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/af055c71-9c01-410e-a4b3-306bcf0b94aa" alt="Community" width="250"/>
    <img src="https://github.com/user-attachments/assets/e818db3b-0c1c-4f68-a25d-99759be06bcc" alt="Post" width="250"/>
    <img src="https://github.com/user-attachments/assets/68da5f1b-2225-4330-a2ae-905e453a03fe" alt="Create Post" width="250"/>
</div>





### Frontend

#### - **Login - Register - Forgot Password Pages**
<div style="display: flex; align-items: center; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/6d9f1a00-c975-4be5-abde-82abf0cae8bc" alt="Login" width="250"/>
    <img src="https://github.com/user-attachments/assets/5542dc24-3fd9-423e-9c17-c6a3f8efcc72" alt="Register" width="250"/>
    <img src="https://github.com/user-attachments/assets/f8ba1124-aed3-41b7-899f-70e5664ab930" alt="Forgot Password" width="250"/>
</div>

 ### Frontend
  #### Links to the code in the project repository for each page. (Screenshots are in the same order)

   - [Login](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/login/Login.js)
   - [Register](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/login/Register.js)
   - [Forgot Password](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/login/ForgotPassword.js)
   - [News](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/news/NewsPage.js)
   - [News Card](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/news/NewsCard.js)
   - [Stock Overview](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/markets/stocks/StockOverviewPage.js)
   - [Markets](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/markets/MarketsPage.js)
   - [Stock Page](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/markets/StocksPage.js)
   - [Dashboard-Search Bar](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/Dashboard.js)
   - [Profile Page](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/profile/ProfilePage.js)
   - [Community](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/community/CommunityPage.js)
   - [Post View](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/community/PostView.js)
   - [Create Post](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/community/CreatePostPage.js)
   - [Post Card](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/community/PostCard.js)
   - [Portfolio](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/portfolio/PortfolioPage.js)
   - [Portfolio Details Card](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/portfolio/PortfolioDetailsCard.js)
   - [Not Found Page](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/components/notfound/NotFound.js)



### Screenshots

#### - **Authentication**
<div style="display: flex; align-items: center; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/b2b69233-f7db-4eba-a15b-7764954cc129" alt="Forgot Password" width="250"/>
  <img src="https://github.com/user-attachments/assets/408c6715-e569-4e13-972d-52c37079ff5b" alt="Login" width="250"/>
  <img src="https://github.com/user-attachments/assets/c88ea461-5023-4e81-880f-93a11889ebe1" alt="Register" width="250"/>
</div>

  #### - **News Page**


<div style="display: flex; align-items: center; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/30f46078-af82-473f-8ee2-fa1b4a555554" alt="News" width="250"/>
</div>

#### Stocks Details

<div style="display: flex; align-items: center; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/7fc6d2ce-42ec-4ecc-b337-e656cacdad4e" alt="Stock" width="250"/>
  </div>

#### Stocks 
<div style="display: flex; align-items: center; gap: 20px;">
<img src="https://github.com/user-attachments/assets/533f40f8-ccde-49a0-888c-4dfb511c592c" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/2c483a8d-0576-4435-b0c5-04ee3cede0fe" alt="Stock" width="250"/>
</div>

#### Search Bar
<div style="display: flex; align-items: center; gap: 20px;">
<img src="https://github.com/user-attachments/assets/c787519e-bbc0-43fc-b794-32ee70429e31" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/0a10a7c3-4c3f-46c0-8adb-dd6c42dabd61" alt="Stock" width="250"/>
</div>


#### Profile Page
<div style="display: flex; align-items: center; gap: 20px;">
<img src="https://github.com/user-attachments/assets/9eeb419c-0bf2-4a05-9808-12a2977d7d9f" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/ea5f5839-1d63-4a3f-a371-f94e9feaf729" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/dcf941cf-f6e7-420b-a60b-1eafe8bd53a4" alt="Stock" width="250"/>
</div>


#### Community
<div style="display: flex; align-items: center; gap: 20px;">
<img src="https://github.com/user-attachments/assets/37e47644-b66f-47c2-a143-73052ab037b3" alt="Stock" width="250" height="250"/>
<img src="https://github.com/user-attachments/assets/ebeedf99-93cd-4120-8b49-fe7325bd0bfa" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/5322a423-2d27-464a-b52b-3d233e63d9a3" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/93b9937f-8a1a-4310-b674-f55cd9bbcda1" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/ecb7ea3d-1e01-44a2-a056-2667a66d2674" alt="Stock" width="250"/>
</div>


#### Portfolio
<div style="display: flex; align-items: center; gap: 20px;">
<img src="https://github.com/user-attachments/assets/9fd44ced-53f4-460e-af27-652b5b19f983"
 alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/0831b0fc-1c0a-4849-aa44-63cae973a734" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/86f47562-1cf9-4331-88a1-83345a07f304" alt="Stock" width="250"/>
<img src="https://github.com/user-attachments/assets/46fb7d8a-41d3-4a18-8b4f-4c9d943df2c8" alt="Stock" width="250"/>
</div>


#### Not Found
<div style="display: flex; align-items: center; gap: 20px;">
<img src="https://github.com/user-attachments/assets/5c9629d0-20ae-433f-9c2c-e179f0de7893" alt="Stock" width="250"/>
</div>







  * Previously submitted interfaces can be reused with new additions appended.
 * Standards: Explain the work completed towards applying W3C standards.
 * Scenarios: Provide a scenario encompassing all core functionalities of your project.
Describe in detail the features and work completed to realize this scenario.


## 2.5 Standards
The Web Annotation Data Model was selected as the standard for implementing annotations in our project. This choice was driven by the goal of enabling logged-in users on our platform to express their opinions on posts directly within the content, without requiring them to place comments into a separate container on the webpage. Furthermore, the annotation functionality was designed to be project-independent, allowing it to be reused in other projects by connecting to our annotation server.

#### 2.5.1 Backend Implementation

To achieve project independence and scalability, we implemented a dedicated backend application for annotations. This backend operates as a standalone service with its own:
* 	**Project structure:** Independent from the main project.
* 	**Docker setup:** Enables easy deployment and containerization.
* 	**Database:** A separate database to store annotation data.
* 	**Documentation:** Swagger documentation to guide external projects on integration.

Any external project that connects to the annotations server can perform read and write operations on annotation objects, using following format:

```jsonld
{
    "id": 2,
    "body": {
      "id": 1,
      "type": "TextualBody",
      "value": "yes",
      "format": "text/plain",
      "language": "en"
    },
    "target": {
      "id": 1,
      "type": "TextPositionSelector",
      "start": startIndex,
      "end": endIndex,
      "source": "sourceUri"
    },
    "creator": {
      "id": 2,
      "creator_id": "creatorUri",
      "type": "Person",
      "name": "name"
    },
    "generator": null,
    "type": "Annotation",
    "created": "2024-12-16T08:13:43.110766Z",
    "modified": "2024-12-16T08:13:43.111151Z"
  },
```

#### 2.5.2 Frontend Implementation
On the frontend, logged-in users can annotate specific parts of post bodies, enhancing interactivity and context-driven engagement.

**Core Features:**

* Highlighting Annotated Sections: Annotated segments in post bodies are highlighted.
* Annotation Details on Hover: Hovering over highlighted sections reveals annotation details such as:
* Content: The text of the annotation.
* Creator: The name of the user who created the annotation.
* Creation Date: When the annotation was added.

When a user creates an annotation, the frontend sends a request to the Bull & Bear backend application. This backend application performs all required URI conversions and communicates with the standalone annotation backend to store the annotation data.

## 2.6 Scenarios
Volkan Effendi, who has been following stock markets for two and a half years, hears about bull and bear from one of his colleagues. He has never used a financial blog like this so he opens the website and starts to wander around. Without logging in he takes a look at some posts, reads them and searches for the stocks some posts include. Then wanders around at news section, reads some after filtering news according to his taste. After, when trying to search for the owner of a post, he fails to open her profile, hence he clicks on register button. Registers with a unique username and email and enters a secure password consisting of eight or more characters, both uppercase and lowercase letters, a number and a special character. Then verifies his email to be able to log in the future. Then searches for rukiye, likes one of her posts before annotating her comment on incentivize robust methodologies. After following rukiye he switches to the mobile application to post his ideas. He writes about apple stock and adds the graph of stock and select the opportunity tag on the app. Later, in the morning while having his favorite breakfast: scrambled eggs with sesame seeds, he starts creating his portfolio, adding stocks from both Turkish and US stocks.
## 3 Individual Documentation

### Cem Güngör-Backend

* **Responsibilities:**  I was a member of backend team mainly responsible for developing and implementing dynamic endpoints such as currency,stock, and indices.
* **Main Contributions:** I mainly worked on the stock and index part of the backend. 
    *  **Stock endpoint** 
Refactored stock price fetching to fetch dynamically at each request. Also included stock data such as ceo, website, financial statements with the stock endpoint. Moreover wrote an endpoint to return stock price range, which is used to create graphs on front-end. 
    *  **Index endpoint** 
Wrote index endpoints that are updated on each build of the application, so that they are up-to-date. Indices include stocks in them so wrote two main endpoints one of which returns all stocks in the indices while returning index's price where the other returns current prices of all stocks in an index while not decreasing the overall performance of the application.
 * **Code-Related Significant Issues:**
      * Insert all Turkish stocks to database regularly -  [Issue 449](https://github.com/bounswe/bounswe2024group2/issues/449)
    * Stock Indices Endpoints -  [Issue 450](https://github.com/bounswe/bounswe2024group2/issues/450)
    * Fetch selected indices to keep database up-to-date -  [Issue 485](https://github.com/bounswe/bounswe2024group2/issues/485)
    * Stock Price Range Fetching -  [Issue 486](https://github.com/bounswe/bounswe2024group2/issues/486)
    * Stock Information Detail -  [Issue 487](https://github.com/bounswe/bounswe2024group2/issues/487)
    
* **Management-Related Significant Issues:** 
    * Checklist for Domain-specific Features -  [Issue 437](https://github.com/bounswe/bounswe2024group2/issues/437)


* **Pull Requests:** 
    * Stock Price Range - [PR 426](https://github.com/bounswe/bounswe2024group2/pull/426)
    * Daily Currency Stock Update - [PR 442](https://github.com/bounswe/bounswe2024group2/pull/442)
    * Stock Indices Endpoint - [PR 451](https://github.com/bounswe/bounswe2024group2/pull/451)
    * Fix the stock price range endpoint - [PR 489](https://github.com/bounswe/bounswe2024group2/pull/489)
    * Refactor stock price range - [PR 500](https://github.com/bounswe/bounswe2024group2/pull/500)
    * Stock Detail for stocks - [PR 503](https://github.com/bounswe/bounswe2024group2/pull/503)
    * Fix pagination for stocks - [PR 504](https://github.com/bounswe/bounswe2024group2/pull/504)
    * Increase pagination for stocks - [PR 505](https://github.com/bounswe/bounswe2024group2/pull/505)
    * Daily Index update for selected indices - [PR 528](https://github.com/bounswe/bounswe2024group2/pull/528)
    * Change authorization on stock endpoints - [PR 533](https://github.com/bounswe/bounswe2024group2/pull/533)
    * Add US stocks to database using commands and update daily  - [PR 539](https://github.com/bounswe/bounswe2024group2/pull/539)

* **Unit Tests:** I've written tests on stock and currency endpoints mainly.
    * Test MarketFeed - [PR 549](https://github.com/bounswe/bounswe2024group2/pull/549)


### Rukiye-Aslan-Group2-Backend
* **Responsibilities:** I was mainly responsible for implementing REST endpoints in the backend and arranging docker and database configurations.

*  **Main Contributions**

    *  **Annotation Project**
     I initiated and implemented the entire annotation project from scratch. The project was dockerized, along with its associated database, ensuring seamless deployment. Additionally, I configured the connection between the annotation backend and the annotation database to establish a fully functional system.
    
    * **Portfolio Endpoints**
    I refactored existing portfolio-related endpoints to enhance their functionality and created new endpoints to allow the addition of stocks to portfolios. These new endpoints support price details and quantity details, providing a more comprehensive solution for portfolio management.
    
    *  **User Content Endpoints**
     I developed user-specific endpoints to enable mobile and frontend teams to retrieve content created by a user, including posts, portfolios, and comments. These endpoints were designed to streamline content accessibility and support cross-platform collaboration.
    
    *  **RSS Feed Integration**
     I added four new RSS feeds to the news page, focusing on financial news specific to Turkey, Asia, and investment recommendations. I also implemented the necessary mapping to adapt these feeds into our format, ensuring a consistent and user-friendly experience.
     
    *  **Search Functionality**
     I implemented a general search endpoint that returns posts, portfolios, and tags containing the search query. In addition, I developed specific search endpoints for post searches and user searches, enhancing the platform's search capabilities and improving user navigation.


 * **Code-Related Significant Issues:**
    * News with new RSS feeds -  [Issue 526](https://github.com/bounswe/bounswe2024group2/issues/526)
    * Implement Annotation Endpoints - [Issue 512](https://github.com/bounswe/bounswe2024group2/issues/512)
    * Configure Annotation Database - [Issue 511](https://github.com/bounswe/bounswe2024group2/issues/511)
    * Dockerize Annotation Project - [Issue 510](https://github.com/bounswe/bounswe2024group2/issues/510)
    * Create Annotation Project - [Issue 509](https://github.com/bounswe/bounswe2024group2/issues/509)
    * Comments by Post Endpoint - [Issue 445](https://github.com/bounswe/bounswe2024group2/issues/445)
    * Portfolios by user endpoint - [Issue 443](https://github.com/bounswe/bounswe2024group2/issues/443)

* **Pull Requests:** 
    * Comments by posts - [PR 463](https://github.com/bounswe/bounswe2024group2/pull/463)
    * User endpoints refactor - [PR 468](https://github.com/bounswe/bounswe2024group2/pull/468/files)
    * User endpoints refactor - [PR 477](https://github.com/bounswe/bounswe2024group2/pull/477)
    * Post return values with tags - [PR 478](https://github.com/bounswe/bounswe2024group2/pull/478)
    * Search endpoints - [PR 479](https://github.com/bounswe/bounswe2024group2/pull/479)
    * Posts by tags - [PR 480](https://github.com/bounswe/bounswe2024group2/pull/480)
    * Annotation backend project - [PR 490](https://github.com/bounswe/bounswe2024group2/pull/490)
    * Post pagination fix - [PR 498](https://github.com/bounswe/bounswe2024group2/pull/498)
    * Post stock serializer fix - [PR 518](https://github.com/bounswe/bounswe2024group2/pull/518)
    * News with new RSS feeds - [PR 524](https://github.com/bounswe/bounswe2024group2/pull/524)
    * Tests for annotation, post, and portfolio - [PR 550](https://github.com/bounswe/bounswe2024group2/pull/550)

### Furkan Şenkal-Group2-android

* **Responsibilities:**

I was a member of the mobile team and primarily responsible for the Markets, Portfolio, and News pages and their components. My tasks included remaking the Markets page with backend integration and creating the Stock Details page featuring real-time graphics. I implemented the Portfolio feature for mobile, which included developing the Portfolio page to allow users to view their portfolios, creating the Portfolio Details page with a pie chart and stock addition/removal functionalities, and designing the Create Portfolio page to enable users to create new portfolios. Additionally, I added new RSS feeds to the News page and handled the navigation and coordination between these pages. I also developed unit tests for the pages I was responsible for to ensure their functionality and reliability.

* **Main contributions:**
  * Remade Markets page with backend integration. Made users able to search and see real time prices of stocks.
  * Created Stock Details page with backend integration to show 1 month graphics and other specialities of the stocks.
  * Created Portfolio page to allow users to view their portfolios.
  * Created Portfolio Details page with pie chart and stock addition/removal functionalities and connected to backend.
  * Created Create Portfolio page with backend integration. Made users able to create new portfolios.
  * Added new RSS feeds prepared by backend team to the news page.
  * Created four unit tests for Markets, Stock Details, Portfolio and Portfolio Details pages.

  * **Code-related significant issues:**
    * Issue [#537](https://github.com/bounswe/bounswe2024group2/issues/537). Create new markets page.
    * Issue [#538](https://github.com/bounswe/bounswe2024group2/issues/538). Implement portfolio features for mobile.
    * Issue [#552](https://github.com/bounswe/bounswe2024group2/issues/552). Update news page with new RSS feeds.
    * Issue [#553](https://github.com/bounswe/bounswe2024group2/issues/553). Create unit tests for portfolio, portfolio details, markets and stock details pages.
  * **Management-Related Significant Issues:**
    * Issue [#436](https://github.com/bounswe/bounswe2024group2/issues/436). Create checklist for primary features.
    * Issue [#464](https://github.com/bounswe/bounswe2024group2/issues/464). Document demo scenario for Persona 1.
    
* **Pull Requests:**
  * PR [#531](https://github.com/bounswe/bounswe2024group2/pull/531). Added new markets and stock details pages with backend connection
  * PR [#532](https://github.com/bounswe/bounswe2024group2/pull/532). Added porfolio feature with details and creation page.
  * PR [#543](https://github.com/bounswe/bounswe2024group2/pull/543). Added graph to stock details page.
  * PR [#547](https://github.com/bounswe/bounswe2024group2/pull/547). Added new RSS feeds to news page.
  * PR [#548](https://github.com/bounswe/bounswe2024group2/pull/548). Added unit tests for portfolio, portfolio details, markets and stock details pages.

* **Unit Tests:** Personally, I have written unit tests for Portfolio, Portfolio Details, Markets and Stock Details pages.


| Test File                      | Link                                                                                          |
|--------------------------------|-----------------------------------------------------------------------------------------------|
| Portfolio.test.js             | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/__tests__/Portfolio.test.js)             |
| PortfolioDetails.test.js              | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/__tests__/PortfolioDetails.test.js)              |
| Markets.test.js        | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/__tests__/Markets.test.js)        |
| StockDetails.test.js          | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/__tests__/StockDetails.test.js)          |
* **Additional Information:** I actively participated in all labs and team meetings, consistently contributing to my team and our project. Additionally, I made significant contributions to the preparation of the Milestone 3 report and deliverables by working on the status of requirements, user interface/user experience (for mobile), and the system manual (for mobile) parts.


### Mahmut Buğra Mert-Group2-frontend

* **Responsibilities:**
I was a member of the frontend team for web development. In general, I was responsible with community page and its components. I was responsible of implementing comments, tags, like/unlike, annotation. I implemented the navigation and coordination between them and tested them. Also, I created a unit test for Assets Modal Page.
* **Main contributions:**
  * Connected tags with backend. Made users able to add tags while creating posts. Displayed tags in both community and post view pages. Later, implemented filtering posts through tags.
  * Connected comments with backend. Made users able to share their comments about the posts and see other users' comments about posts. 
  * Connected like/unlike with backend. Made users able to like and unlike a post. Displayed posts like number on community page.
  * Implemented annotation and connected it with backend. Made users able to enable and disable display of annotations and add their own annotations the posts' descriptions.
  * Created a unit test for Assets Modal component.
  * **Code-related significant issues:**
    * Issue [#448](https://github.com/bounswe/bounswe2024group2/issues/448). Implement tags for web.
    * Issue [#452](https://github.com/bounswe/bounswe2024group2/issues/452). Implement usernames and dates on posts..
    * Issue [#446](https://github.com/bounswe/bounswe2024group2/issues/446). Implement connection of comments with Backend issue template.
    * Issue [#481](https://github.com/bounswe/bounswe2024group2/issues/481). Implement connection of like/unlike with Backend .
  * **Management-Related Significant Issues:**
    * Issue [#440](https://github.com/bounswe/bounswe2024group2/issues/440). Create checklist for Testing Strategies.
    * Issue [#441](https://github.com/bounswe/bounswe2024group2/issues/374). Document Lab Meeting Notes #8.
    * There are also issues I created in the lab sessions to provide task division between team members and plan the subtasks of the issue. Lab8: [#436](https://github.com/bounswe/bounswe2024group2/issues/436), [#437](https://github.com/bounswe/bounswe2024group2/issues/437), [#438](https://github.com/bounswe/bounswe2024group2/issues/438), [#439](https://github.com/bounswe/bounswe2024group2/issues/439). Lab9: [#464](https://github.com/bounswe/bounswe2024group2/issues/464), [#465](https://github.com/bounswe/bounswe2024group2/issues/465), [#466](https://github.com/bounswe/bounswe2024group2/issues/466), [#467](https://github.com/bounswe/bounswe2024group2/issues/467).

* **Pull Requests:**
  * PR [#457](https://github.com/bounswe/bounswe2024group2/pull/457). Add tags, username, and publish dates to posts.
  * PR [#482](https://github.com/bounswe/bounswe2024group2/pull/482). Add comments, likes. Fix tags.
  * PR [#520](https://github.com/bounswe/bounswe2024group2/pull/520). View tags on posts.
  * PR [#551](https://github.com/bounswe/bounswe2024group2/pull/551). Add annotation and filter posts by tags.
  * PR [#434](https://github.com/bounswe/bounswe2024group2/pull/434). Lab8
* **Unit Tests:** Personally, I have written [Asset Modal's unit test](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/AlertModal.test.js).
* **Additional Information:** Attended all of the labs and team meetings. Tried to actively contribute my team and our project. Took part writing milestone 3 report for executive summary and user interfaces.

### Kamil Deniz Coşkuner
* **Member:** Name, group, and subgroup (e.g., backend, frontend, Android).
* **Responsibilities:** Overall description of assigned responsibilities.
* **Main Contributions:** Description of personal contributions to the project, including:
  * Code-Related Significant Issues: Issues contributing to the code base
demonstrated during the demo.
  * Management-Related Significant Issues: Issues contributing to the management of
the software project.
* **Pull Requests:** Personal pull requests.
* **Unit Tests:** All unit tests written personally.
* **Additional Information:** Further relevant information about contributions (optional).


### Halil İbrahim Kasapoğlu, Group 2, Frontend

#### Member
- Name: Halil Ibrahim Kasapoglu
- Group: Group 2 (Bull&Bear)
- Subgroup: Frontend

#### Responsibilities

 I was in the frontend team and also managed DevOps/deployment-related issues. I was mainly responsible for managing user profile, portfolio, stock and navbar frontend, creating jest test for the respective section.


#### Main Contributions
- Created jest test files for frontend and also documented testing strategy for frontend and listed acceptence criterias for testing in lab
- Created following frontend pages and connected them with api;
    - Portfolio Page
    - Stock details view page
    - Navbar search
    - User profile page
- Created annotations server pipeline and deployed it (updated k8s configuration on csp)
- Refactored frontend dockerfile for making it production ready by doing it build the files then serve it instead of dev.
- Resolved minor bugs in frontend.
- Created frontend custom alert model provider 
- Helped documenting final demo scenarios
- Created API client class for frontend


#### Code-related Significant Issues

| Issue Title | Role | Issue Link |
|-------------|------|------------|
| [Integrate Portfolio Management with Backend](https://github.com/bounswe/bounswe2024group2/issues/394) | [#394](https://github.com/bounswe/bounswe2024group2/issues/394)                                | Assignee       |
| [Integrate Stock Details Page with API Data](https://github.com/bounswe/bounswe2024group2/issues/557) | [#557](https://github.com/bounswe/bounswe2024group2/issues/557)                                | Assignee       |
| [Integrate Profile Page with Backend API](https://github.com/bounswe/bounswe2024group2/issues/556) | [#556](https://github.com/bounswe/bounswe2024group2/issues/556)                                | Assignee       |
| [Create Jest Tests for Frontend Sections](https://github.com/bounswe/bounswe2024group2/issues/559) | [#559](https://github.com/bounswe/bounswe2024group2/issues/559)                                | Assignee       |
| [Deploy Annotations Server and Create Deployment Pipeline](https://github.com/bounswe/bounswe2024group2/issues/558) | [#558](https://github.com/bounswe/bounswe2024group2/issues/558)                                | Assignee       |
| [Implement Get Profile By User ID](https://github.com/bounswe/bounswe2024group2/issues/494) | [#494](https://github.com/bounswe/bounswe2024group2/issues/494)                                | Reviewer  |
| [Implement connection of like/unlike with Backend](https://github.com/bounswe/bounswe2024group2/issues/481) | [#481](https://github.com/bounswe/bounswe2024group2/issues/481)                                | Reviewer  |
| [Fix Like-Dislike CRUD methods](https://github.com/bounswe/bounswe2024group2/issues/471) | [#471](https://github.com/bounswe/bounswe2024group2/issues/471)                                | Reviewer  |
| [Implement usernames and dates on posts](https://github.com/bounswe/bounswe2024group2/issues/452) | [#452](https://github.com/bounswe/bounswe2024group2/issues/452)                                | Reviewer  |
| [Implement tags for web](https://github.com/bounswe/bounswe2024group2/issues/448) | [#448](https://github.com/bounswe/bounswe2024group2/issues/448)                                | Reviewer  |
| [Implement connection of comments with Backend](https://github.com/bounswe/bounswe2024group2/issues/446) | [#446](https://github.com/bounswe/bounswe2024group2/issues/446)                                | Reviewer  |



#### Management-related Significant Issues
| Title                                                         | Link                                                                                           | Role           |
|---------------------------------------------------------------|------------------------------------------------------------------------------------------------|----------------|
| [Document Presentation Outline and Demo Action List](https://github.com/bounswe/bounswe2024group2/issues/467) | [#467](https://github.com/bounswe/bounswe2024group2/issues/467)                                | Assignee       |
| [Create checklist for Testing Strategies](https://github.com/bounswe/bounswe2024group2/issues/440) | [#440](https://github.com/bounswe/bounswe2024group2/issues/440)                                | Assignee       |
| [Document Persona2's Scenario](https://github.com/bounswe/bounswe2024group2/issues/465) | [#465](https://github.com/bounswe/bounswe2024group2/issues/465)                                | Assignee       |
| [Add Meeting Notes 10](https://github.com/bounswe/bounswe2024group2/issues/447) | [#447](https://github.com/bounswe/bounswe2024group2/issues/447)                                | Assignee       |
| [Create System Manual](https://github.com/bounswe/bounswe2024group2/issues/560) | [#560](https://github.com/bounswe/bounswe2024group2/issues/560)                                | Reviewer  |
| [Create checklist for API and its Documentation](https://github.com/bounswe/bounswe2024group2/issues/438) | [#438](https://github.com/bounswe/bounswe2024group2/issues/438)                                | Reviewer  |
| [Document Persona1’s Scenario](https://github.com/bounswe/bounswe2024group2/issues/464) | [#464](https://github.com/bounswe/bounswe2024group2/issues/464)                                | Reviewer  |



#### Pull Requests

| Title                                     | Issue ID | Link                                                                                     | Role      |
|-------------------------------------------|----------|------------------------------------------------------------------------------------------|-----------|
| Integrate Profile Page with API frontend  | #522     | [Link](https://github.com/bounswe/bounswe2024group2/pull/522)                           | Assignee  |
| Add stock details page frontend           | #488     | [Link](https://github.com/bounswe/bounswe2024group2/pull/488)                           | Assignee  |
| Add real stock price values on chart frontend | #508 | [Link](https://github.com/bounswe/bounswe2024group2/pull/508)                           | Assignee  |
| Implement Navbar Search frontend          | #534     | [Link](https://github.com/bounswe/bounswe2024group2/pull/534)                           | Assignee  |
| Refactor dockerfile for production env devops frontend | #476 | [Link](https://github.com/bounswe/bounswe2024group2/pull/476)                           | Assignee  |
| Refac portfolio selection bug frontend    | #523     | [Link](https://github.com/bounswe/bounswe2024group2/pull/523)                           | Assignee  |
| Resolve tag render issue bug frontend     | #519     | [Link](https://github.com/bounswe/bounswe2024group2/pull/519)                           | Assignee  |
| Add ci pipeline for annotations project devops | #516 | [Link](https://github.com/bounswe/bounswe2024group2/pull/516)                           | Assignee  |
| Resolve manifest.json error bug           | #515     | [Link](https://github.com/bounswe/bounswe2024group2/pull/515)                           | Assignee  |
| fix: create profiles for users if they have none backend bug | #496 | [Link](https://github.com/bounswe/bounswe2024group2/pull/496)                           | Assignee  |
| Implement Portfolio API integration frontend | #475  | [Link](https://github.com/bounswe/bounswe2024group2/pull/475)                           | Assignee  |
| Add jest test components frontend    | #541     | [Link](https://github.com/bounswe/bounswe2024group2/pull/541)                           | Assignee  |
| Add custom alert modal frontend           | #474     | [Link](https://github.com/bounswe/bounswe2024group2/pull/474)                           | Assignee  |
| Add user service management frontend      | #470     | [Link](https://github.com/bounswe/bounswe2024group2/pull/470)                           | Assignee  |
| Add API for Pattern-Based Stock Search backend | #469 | [Link](https://github.com/bounswe/bounswe2024group2/pull/469)                           | Assignee  |
| Add annotation and filter posts by tags frontend | #551 | [Link](https://github.com/bounswe/bounswe2024group2/pull/551)                           | Reviewer  |
| US stocks backend                         | #539     | [Link](https://github.com/bounswe/bounswe2024group2/pull/539)                           | Reviewer  |
| Stock detail and pagination fix backend   | #505     | [Link](https://github.com/bounswe/bounswe2024group2/pull/505)                           | Reviewer  |
| Fix pagination backend                    | #504     | [Link](https://github.com/bounswe/bounswe2024group2/pull/504)                           | Reviewer  |
| Stock detail and pagination for stocks backend | #503 | [Link](https://github.com/bounswe/bounswe2024group2/pull/503)                           | Reviewer  |
| Stock Price Range Refactor backend        | #500     | [Link](https://github.com/bounswe/bounswe2024group2/pull/500)                           | Reviewer  |
| Fix/BE get profile by user id backend bug | #495     | [Link](https://github.com/bounswe/bounswe2024group2/pull/495)                           | Reviewer  |
| Annotation backend project backend        | #490     | [Link](https://github.com/bounswe/bounswe2024group2/pull/490)                           | Reviewer  |
| Add comments, likes. Fix tags frontend    | #482     | [Link](https://github.com/bounswe/bounswe2024group2/pull/482)                           | Reviewer  |
| Change like and dislike view types to GenericAPIView backend bug | #473 | [Link](https://github.com/bounswe/bounswe2024group2/pull/473)                           | Reviewer  |
| Refactor user related endpoints backend   | #468     | [Link](https://github.com/bounswe/bounswe2024group2/pull/468)                           | Reviewer  |
| Feature/be like dislike backend           | #462     | [Link](https://github.com/bounswe/bounswe2024group2/pull/462)                           | Reviewer  |
| Feature/be follow unfollow backend        | #461     | [Link](https://github.com/bounswe/bounswe2024group2/pull/461)                           | Reviewer  |

#### Unit Tests
I have implemented frontend jest tests for our components.  Here I have listed unit tests written by me. To see a full list of unit test created by me, see [this PR](https://github.com/bounswe/bounswe2024group2/pull/541) or take a look at the table below,

| Test File                      | Link                                                                                          |
|--------------------------------|-----------------------------------------------------------------------------------------------|
| AlertModal.test.js             | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/AlertModal.test.js)             |
| AssetList.test.js              | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/AssetList.test.js)              |
| CircleAnimation.test.js        | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/CircleAnimation.test.js)        |
| FilterButtons.test.js          | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/FilterButtons.test.js)          |
| NewsCard.test.js               | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/NewsCard.test.js)               |
| NotFound.test.js               | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/NotFound.test.js)               |
| PortfolioDetailsCard.test.js   | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/PortfolioDetailsCard.test.js)   |
| PortfolioModal.test.js         | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/PortfolioModal.test.js)         |
| ProfilePage.test.js            | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/ProfilePage.test.js)            |
| UserCard.test.js               | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/UserCard.test.js)               |
| randomUtil.test.js             | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/frontend/src/test/randomUtil.test.js)             |


#### Additional Information
- To see a full log of contributions see [here](https://github.com/bounswe/bounswe2024group2/wiki/Halil-%C4%B0brahim-Kasapo%C4%9Flu-CMPE-451#-contributions).

### Muhammed Erkam Gökcepınar (Group 2 - Mobile)

#### Responsibilities
As a part of the mobile team, I am responsible for developing and managing the mobile application mainly the community part including functionalities as like, comment, linking stock graphics and tags to the posts. Also, I have created unit test by using Jest framework for pages created by myself. 

---

#### Main Contributions
- **Create Configuration File**: Created configuration file for abstraction of some environment variables
- **Organize Post Page**: Added and adjusted the layouts that are responsible for showing linecharts, adding comments and liking the posts
- **Organize Community Page**: Similar to post page, liking and commenting functionalities are linked to buttons. Additionally, searching and filtering the posts according to tags feature is implemented
- **Organize Create Post Page**: To link the posts with tags and stocks, added some layouts and modals. For adding a stock, implemented a stock search modal using stocks endpoints
- **Write Unit Tests**: Created unit tests for properly testing the pages of mobile application.(Community, Post, Create Post)
- **Project Configuration**: Configured the mobile project and created the APK file for release.

- **Code-Related Significant Issues**
    * Issue [#455](https://github.com/bounswe/bounswe2024group2/issues/455): Implemented tag creation functionality along with lnking to the posts.
    * Issue [#501](https://github.com/bounswe/bounswe2024group2/issues/501): Implemented like functionality for posts.
    * Issue [#502](https://github.com/bounswe/bounswe2024group2/issues/502): Implemented comment functionality for posts.
    * Issue [#517](https://github.com/bounswe/bounswe2024group2/issues/517): Implemented linking stock to posts and showing graphics of the value of the stock for several time ranges.
    

- **Management-Related Significant Issues**
    * Issue [#436](https://github.com/bounswe/bounswe2024group2/issues/436): Created checklist for features that will be implemented until the end of the project
    * Issue [#454](https://github.com/bounswe/bounswe2024group2/issues/454): Created a config file for managing env-specific variables
    * Issue [#525](https://github.com/bounswe/bounswe2024group2/issues/525): Created unit tests for mobile application

--- 
#### Pull Requests
* [#497](https://github.com/bounswe/bounswe2024group2/pull/497): Implement tag creation and use.
* [#521](https://github.com/bounswe/bounswe2024group2/pull/521): Implement comment feature for posts.
* [#527](https://github.com/bounswe/bounswe2024group2/pull/527): Implement post stock connection.
* [#530](https://github.com/bounswe/bounswe2024group2/pull/530): Implement like functionality for posts.
* [#544](https://github.com/bounswe/bounswe2024group2/pull/544): Create unit tests for mobile.
* [#545](https://github.com/bounswe/bounswe2024group2/pull/545): Fix search and filter functionalities for posts.
    
#### **Unit Tests**
I have created unit tests for pages of mobile application including 
*  Community page 
*  Create Post page
*  Post page
    
  | Test File                      | Link                                                                                          |
|--------------------------------|-----------------------------------------------------------------------------------------------|
| Community.test.js             | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/__tests__/Community.test.js)             |
| CreatePost.test.js              | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/__tests__/CreatePost.test.js)              |
| Post.test.js        | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/__tests__/Post.test.js)        |
| Login.test.js          | [Link](https://github.com/bounswe/bounswe2024group2/blob/main/mobile/__tests__/Login.test.js)          |

   
 As an example, the commmunity test for 
* rendering
* fetching users and posts
* adding comments a etc. 




### Rafet Oğuz Pançuk-Group2-Backend

* **Responsibilities:**
I was a member of the backend team. I was responsible for implementing like-unlike, follow-unfollow, post searching with multiple tags and post-stock relation. I also fixed ValidationError import bug. I implemented fake post generation using faker (for final demo). I also wrote unit tests for all functions in onboarding module under backend. I created the checklist for API Documentation. I created the User Manual, System Manual. I also documented Unit Tests. Finally, I took and added notes of General Meeting #11 
* **Main contributions:**
  * Implemented follow-unfollow feature. Made users able to follow and unfollow each other.
  * Implemented like-dislike feature. Made users able to like and unlike each others posts.
  * Implemented post searching with multiple tags. Made users able to search posts with multiple tags.
  * Implemented post-stock relation. Made users able to add stocks to their posts.
  * Implemented fake post generation using faker for demo presentation.
  * Implemented unit tests for onboarding module.
  * Fixed 2 bugs.
  * Implemented get profile by user id.
  * Created the user manual.
  * Created the system manual.
  * Documented unit tests.
  * Created the checklist for API and its documentation.
  * Took and added General Meeting #11 Notes.
  * **Code-related significant issues:**
    * Issue [#458](https://github.com/bounswe/bounswe2024group2/issues/458). Implement Follow & Unfollow Endpoints
    * Issue [#459](https://github.com/bounswe/bounswe2024group2/issues/459). Implement Like & Dislike Endpoints
    * Issue [#484](https://github.com/bounswe/bounswe2024group2/issues/484). Implement Onboarding Unit Tests
    * Issue [#491](https://github.com/bounswe/bounswe2024group2/issues/489). Implement Post Search With Multiple Tags
    * Issue [#506](https://github.com/bounswe/bounswe2024group2/issues/506). Implement Post-Stock Relation
    * Issue [#536](https://github.com/bounswe/bounswe2024group2/issues/536). Implement Fake Post Generation
    * Issue [#471](https://github.com/bounswe/bounswe2024group2/issues/471). Fix Like-Dislike CRUD methods issue
    * Issue [#514](https://github.com/bounswe/bounswe2024group2/issues/514). Fix ValidationError import bug
    * Issue [#494](https://github.com/bounswe/bounswe2024group2/issues/494). Implement Get Profile By User ID 
  * **Management-Related Significant Issues:**
    * Issue [#438](https://github.com/bounswe/bounswe2024group2/issues/438). Create checklist for API and its Documentation
    * Issue [#483](https://github.com/bounswe/bounswe2024group2/issues/483). Add General Meeting #11 Notes
    * Issue [#560](https://github.com/bounswe/bounswe2024group2/issues/560). Create System Manual
    * Issue [#561](https://github.com/bounswe/bounswe2024group2/issues/561). Create User Manual
    * Issue [#562](https://github.com/bounswe/bounswe2024group2/issues/562). Document Unit Tests

* **Pull Requests:**
  * PR [#461](https://github.com/bounswe/bounswe2024group2/pull/461). Implement Follow/Unfollow
  * PR [#462](https://github.com/bounswe/bounswe2024group2/pull/462). Implement Like/Unlike
  * PR [#473](https://github.com/bounswe/bounswe2024group2/pull/473). Change like and dislike view types to GenericAPIView
  * PR [#493](https://github.com/bounswe/bounswe2024group2/pull/493). Post Search with multiple tags
  * PR [#495](https://github.com/bounswe/bounswe2024group2/pull/495). Get profile by username
  * PR [#499](https://github.com/bounswe/bounswe2024group2/pull/499). Onboarding unit tests
  * PR [#507](https://github.com/bounswe/bounswe2024group2/pull/507). Stocks of posts
  * PR [#513](https://github.com/bounswe/bounswe2024group2/pull/513). ValidationError import
  * PR [#535](https://github.com/bounswe/bounswe2024group2/pull/535). Faker implementation
  * PR [#542](https://github.com/bounswe/bounswe2024group2/pull/542). Faker fix


* **Unit Tests:** Personally, I have written Onboarding Module's unit tests.

##### **RegisterViewTest**
- **`test_register_valid_user`**: Verifies successful user registration with valid data, user creation, and email verification.
- **`test_register_invalid_user`**: Ensures invalid registration data results in appropriate error responses and no user is created.

##### **VerifyEmailTest**
- **`test_verify_email_with_valid_token`**: Tests email verification using a valid token, confirming the account is activated.
- **`test_verify_email_with_expired_token`**: Ensures expired tokens return an "Activation Expired" error without activating the account.
- **`test_verify_email_with_invalid_token`**: Validates the response for an invalid token, ensuring no changes to the account's verification status.
- **`test_verify_email_already_verified`**: Tests behavior when attempting to verify an already verified email, expecting an error response.

##### **MyObtainTokenPairViewTest**
- **`test_get_token_with_valid_credentials`**: Confirms users can obtain JWT tokens using valid credentials, including access and refresh tokens.

##### **UserViewSetTest**
- **`test_list_users`**: Validates that all users are listed correctly in the response.
- **`test_retrieve_user`**: Verifies accurate retrieval of a specific user's details.
- **`test_create_user`**: Confirms new user creation with valid data and checks persistence in the database.
- **`test_update_user`**: Ensures user details can be updated successfully and reflected in the database.
- **`test_delete_user`**: Validates successful user deletion and ensures the user is removed from the database.
- **`test_get_user_by_username_success`**: Checks for successful retrieval of a user by their username.
- **`test_get_user_by_username_not_found`**: Ensures appropriate error handling for non-existent usernames.


##### **LogoutViewTest**
- **`test_successful_logout`**: Tests successful logout with a valid refresh token and proper token invalidation.
- **`test_logout_without_refresh_token`**: Verifies error response when attempting to log out without providing a refresh token.

##### **ProfileViewSetTest**
- **`test_list_profiles`**: Ensures all profiles are listed correctly.
- **`test_retrieve_profile`**: Verifies accurate retrieval of a single profile's details.
- **`test_update_profile`**: Confirms that profile details can be updated successfully.
- **`test_delete_profile`**: Ensures profiles can be deleted and are removed from the database.

##### **FollowUnfollowViewTest**
- **`test_follow_user_success`**: Confirms successful following of another user and reflects the updated followers list.
- **`test_follow_user_already_following`**: Validates error handling when trying to follow a user who is already followed.
- **`test_follow_user_not_found`**: Ensures appropriate error response when attempting to follow a non-existent user.
- **`test_unfollow_user_success`**: Verifies successful unfollowing of a user and updates the followers list accordingly.
- **`test_unfollow_user_not_following`**: Checks for proper error response when attempting to unfollow a user who is not being followed.
- **`test_unfollow_user_not_found`**: Ensures appropriate error handling when trying to unfollow a non-existent user.
