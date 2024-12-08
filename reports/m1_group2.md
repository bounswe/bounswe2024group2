# CMPE451 Group 2 Milestone 1 Report

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
   * 1 **Introduction**
   * 2 **Project Status**
   * 3 **Customer Feedback & Reflections**
   * 4 **Deliverables**
   * 5 **Evaluations**
     
      * 5.1 Evaluation of Tools
      * 5.2 Evaluation of Processes
      * 5.3 Evaluation of Status of Deliverables

   * 6 **Requirements Addressed**
               
   * 7 **Individual Contributions**

### Executive Summary

## 1 Introduction
In the first week lab of the course, we started to discuss domains that we could select for a forum that would be enchanted with our creativity. After hours of discussions, we decided to implement a web and mobile app for a forum related to the financial market. Choosing a domain was not the only task at first; we needed to conduct research on where to get data for stocks, index prices, how to create charts, etc. After addressing a few different data sources and ways to build an interactive and distinct forum for financial market users, we decided to move forward with other steps of building a project. First, we named our application **Bull&Bear**. 

**Project Objectives:**

* Develop a functional web and mobile application for a financial forum.
* Provide users with tools for tracking portfolios, analyzing market data, and engaging in discussions.
* Build a user-friendly and intuitive interface.
* Ensure secure user authentication and data management.

**Technical Challenges:**

* Implementing real-time stock data updates and market analysis.
* Integrating third-party API's for data fetching and chart visualization.
* Ensuring seamless communication between the frontend, backend, and mobile app.

## 2 Project Status
Currently, all project requirements are written. Mockups and scenarios are created. UML diagrams such as class, sequence, and use case diagrams are created. 

Web app is built and deployed [here](http://159.223.28.163:30001/home). Web application has community, market, news, portfolio, login, registration, and logout functionalities displayed. Among these functionalities, login, registration, and logout are connected to backend and database.


Mobile app is built with home page, user profile page with badges, login, and registration functionalities. Among these functionalities, login, registration, and logout are connected to backend and database.

As mentioned above, login, registration, email verification and logout endpoints are implemented in the backend. Backend application is connected to database and deployed. Swagger documentation for backend application can be found [here](http://159.223.28.163:30002/docs/).

Frontend, backend, and database are containerized using docker and deployed on DigitalOcean.

Also, a deployment pipeline was implemented for an automated deployment on our development branch called `dev`. Anytime a new pull request is merged into branch dev, the changes are automatically deployed to droplet.

## 3 Customer Feedbacks & Reflections
We presented our work for milestone 1 to the customer on October 22nd, 2024. Here are the feedbacks and our reflections on the customer presentation:

* **Badge name revision:** On the mobile application, we named one of our user badges as "High-liked" which can be obtained by users whose at least one post gets more than 100 likes.
    * The customer suggested this badge to be named something like "Popular."
    * We believe that giving unique and unusual names to badges will make them appealing for users, and they will interact with the app more.
    * **Action Plan:** We will re-evaluate the badge names and explore alternative options that are more engaging and user-friendly.
    * **Impact:** The change in badge names is expected to be a minor adjustment that will not significantly affect the project's timeline or resources.
* **Including all stocks in the app:** We planned to focus only on the US and TR markets.
    * After a question from the audience, the customer suggested not to focus on specific markets like US or TR but to include all markets in the world.
    * We preferred to be able to provide more features for users within specific markets than putting more effort into finding data for all markets in the world.
    * **Action Plan:**  We will conduct further research and explore the feasibility of including data for all global markets. We will analyze the impact of this expansion on development time and resources.
    * **Impact:**  Including data for all markets will require additional research, data integration, and potentially adjustments to our application architecture. This may impact the project's scope and timeline.
* **Usage of Wikidata**: We currently do not use Wikidata to fetch stock data.
    * The customer suggested using Wikidata to get stock-related data as it is compatible for querying.
    * We will elaborate on this as a team and try to fetch stock details from Wikidata. If we ensure that we can fetch all necessary fields for each stock, we will use Wikidata.
    * **Action Plan:** We will investigate using Wikidata as a source for stock data. We will compare the data availability and quality of Wikidata with our existing data sources. 
    * **Impact:**  Using Wikidata might require adjustments to our data fetching logic and data validation processes. This could impact the development timeline but potentially enhance the accuracy and comprehensiveness of our data.

## 4 List of Deliverable and Work Links 

| Deliverable/Work                       | Related Link |
| ------------------------- | ------------- | 
| Github Code Repository        | [Repository](https://github.com/bounswe/bounswe2024group2)        |
| URL to the Deployed Application      | [Bull&Bear](http://159.223.28.163:30001/home)        |
| Instruction to build Deployed Application       | [Quickstart](https://github.com/bounswe/bounswe2024group2/wiki/Quickstart-451)        |
| Release Tag    | [0.1.0-alpha](https://github.com/bounswe/bounswe2024group2/releases/tag/customer-milestone-1)       |
| Requirements       | [Requirements](https://github.com/bounswe/bounswe2024group2/wiki/Requirements-%E2%80%90-Cmpe-451)        |
| Scenarios      | [Scenarios](https://github.com/bounswe/bounswe2024group2/wiki/User-Scenarios-451)        |
| Mockups       | [Mockups](https://github.com/bounswe/bounswe2024group2/wiki/Mockups-451)        |
| Class Diagram        | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Class-Diagram-451)        |
| Sequence Diagram        | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Sequence-Diagrams-CmpE451)        |
| Use-Case Diagram        | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Use-Case-Diagrams)  |
|  Project Plan     | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Project-Plan-CmpE451)        |
|  Communication Plan     | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Communication-Plan)        |
| RAM        | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Responsibility-Assignment-Matrix-451) |
| Meeting Notes (1st)    | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Meeting,03.10.2024)        |
| Meeting Notes (2nd)    | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Meeting-10.10.2024)        |
| Meeting Notes (3rd)    | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Meeting-17.10.2024)        |
| Meeting Notes (4th)    | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Meeting-19.10.2024)        |
| Meeting Notes (5th)    | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/General-Meeting-%235)        |
| Milestone 1 Report    | [Wiki](https://github.com/bounswe/bounswe2024group2/wiki/Milestone-1-Report-%E2%80%90-CMPE451)        |


## 5 Evaluations

### 5.1 Evaluation of Tools

#### 5.1.1 VSCode
VSCode has supported our development across both the front-end and back-end, providing a consistent and reliable environment for writing, testing, and debugging our code. Its cross-platform capability has also been crucial, as our team members use a mix of operating systems.

#### 5.1.2 Github Desktop
Github Desktop was useful at first since it allowed some of us to handle branches and commits easily. 

#### 5.1.3 React 
Since React is widely used for frontend applications and we were familiar with it from a previous course, we had a relatively easy time with it. Also, there were lots of tutorials that we could utilize. Additionally, packages like NPM helped us utilize hot reloads on local which was again an advantage of using React and JS.

#### 5.1.4 React Native
When creating the mobile application, we used React Native. Despite the complicated installation and clean-up process, the language's simplicity and speed gave us an advantage when writing. One of the things that motivated us to use it was the fact that people who specialize in the mobile side are accustomed to it.

The only problem we faced was the decision of using expo. It had a trade-off for easy compatibility with the usage of some packages. To be able to use some graph-related packages, we decided not to use expo.

#### 5.1.5 Django
For the backend development of our app, we used Django, a high-level Python web framework. Django's MVC architecture enhanced code readability and maintainability for our app. Additionally, Django's built-in ORM facilitated seamless integration with our chosen database management system, MySQL. Finally, its clear documentation provided access to a wealth of tutorials, forums, and third-party packages that have helped us throughout our implementation.

One downside of Django was, however, its migration dependency which caused us to manually delete some migrations to implement our custom models on built-in ones.

#### 5.1.6 Mermaid 
We used Mermaid when writing the use case and class diagrams. The most functional feature for us was that we did not need to download or pay anything to use the site's free live editor, and the editor also allowed us to instantly see the effect of the code we wrote on the diagram.

#### 5.1.7 PlantUml
In order to create sequence diagrams, we used Plant UML. As programmers, it was delightful to only code and not draw anything for our diagram.

#### 5.1.8 Docker
Docker has played a crucial role in our deployment strategy, providing a consistent environment for our application across different stages of development and production. We dockerized our app and could easily test on our computers without encountering system compatibility issues.

#### 5.1.9 Digital Ocean 
Digital Ocean has served as our hosting platform, offering scalable and reliable infrastructure to deploy and manage our application in a production environment. There was a 200$ free starter pack for 1 year that we benefited from using the Github Student Developer Pack. It enabled us to connect it with SSH so that we had full control (seeing logs etc.).

#### 5.1.10 Discord
In the first weeks, we used Discord for our weekly meetings and as we defined development teams like frontend, backend, and mobile, we opened different channels to communicate and hold records separately. This feature helped us organize the development process.

#### 5.1.11 WhatsApp
We used WhatsApp for urgent things and meeting reminders. This helped us prioritize the messages from the WhatsApp group.
After Discord was unreachable, we created WhatsApp groups for sub-groups like backend, frontend, and mobile.

#### 5.1.12 Jitsi
After Discord was restricted in Turkey, we switched to Jitsi for our weekly meetings as it has provided us with unlimited meeting time.

#### 5.1.13 Kubernetes
We have used Kubernetes on our deployment VMs as container orchestrators. It allowed us to easily monitor via its dashboard and also provided us with many benefits like DNS through service names, always on pods, and also allowed us to distribute resources as we wished.

#### 5.1.14 GitHub Actions
We have used GitHub actions as one of our CI/CD tools. It allowed us to automatically deploy dev environment without any additional concerns. It really faster our development process. 

#### 5.1.15 Docker Hub
We have pushed our images on the public docker hub registry. It allowed us to quickly change the images on dev servers, rollback in need, etc.  Also It helped us to create automated deployment workflows.

### 5.2 Evaluation of Processes

#### 5.2.1 Pull-request and naming
We paid close attention to having reviewers on each pull-request and having distinct branch names. We defined commit conventions and PR title and description conventions. This rigorous process ensured code quality and maintainability.

#### 5.2.2 Teaming
For the preparation and development of the application, we gave importance to always distribute the load evenly and have a reviewer for all work. Hence, we created teams ensuring this. We will continue the distribution of work this way.

#### 5.2.3 Notes
We had moderators, note takers, and wiki editors for every meeting; hence there was a reviewing mechanism inherently, and they were neatly recorded. We will continue this method.

#### 5.2.4 Issues
Issues allowed us to record and review all work we need to do and did. We also created new templates for issues which made issue opening easier and have a more general look. We agree that continuing this procedure will ensure that no work will lack documentation.

#### 5.2.5 Presentation
After preparing the development part of customer milestone 1, we presented the current state and details of further implementations of the project to the customer. During the preparation process, we planned who would present which part, which was nice.

However, we could prepare a more structured presentation plan, like going over some user scenarios and providing each feature in those scenario flows. This way, the customer could better understand the impact of each feature on the user.

### 5.3 Evaluation of Status of Deliverables

#### 5.3.1 Software Requirements Specification
This deliverable is completed and will not need a revision unless the customer strongly addresses a change mid-project.

#### 5.3.2 Software Design (UML Diagrams)
Class, use case, and sequence diagrams are completed and again, as long as the customer doesn't want a change that causes a change in requirements, the design part will not need a revision.

#### 5.3.3 Scenarios and Mockups
Detailed 5 scenarios are written incorporating different requirements and providing a broad image of our application. 

Mockups, again, are created in detail to reflect the features we addressed in requirements. Also, since the code implementation has started, mockups will be used as a reference. So, mockups should have been completed before the milestone deadline, and they are.

#### 5.3.4 Project Plan and RAM
The project plan is created to give a broad roadmap for our project. However, we believe there might be small shifts in the dates in the future.

The RAM is created, and responsibilities for everyone are addressed clearly. However, during the project, there might be small changes in the details, but we do not expect huge changes here.

#### 5.3.4 Weekly Reports and Meetings
We regularly documented all lab reports and meetings. We have three different meeting notes as lab meeting notes, weekly meeting notes, and sub-group meeting notes like backend meeting notes.

Each kind of these meeting notes and reports can be found on our wiki page [here](https://github.com/bounswe/bounswe2024group2/wiki).


## 6 Requirements Addressed
The addressed requirements in the first milestone are listed below:

* **User Requirements**
    * 1.1.1.1 Users shall be able to register with a unique username, e-mail address, and password.
    * 1.1.1.2 User shall be registered with a secure password.
    * 1.1.1.3 Users shall be able to log in using their registered credentials.
    * 1.1.1.5 Users shall be able to log out from the system.
    * 1.1.2.1.1 Guest user shall be able to view posts.
    * 1.1.2.1.2 Guest user shall be able to view stocks.
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

* **Non Functional Requirements**
    * 2.1.1 The application shall be available for Web and Mobile platforms.
    * 2.1.2 The web application shall be available for web browsers supporting ES6.
    * 2.1.3. The web application shall support FHD (1920x1080) or higher resolutions, ensuring that all charts and graphs are rendered at a minimum resolution of 1080p for clarity and detail.
    * 2.1.4 The mobile application shall be available for Android(API 33 or higher) operating systems.
    * 2.1.5 The mobile application shall support portrait orientation on mobile devices.
    * 2.1.6 The mobile application shall support FHD or higher resolutions, with charts and graphs rendered at a minimum resolution of 720p for clear visibility.
    * 2.1.1 Application shall be available in English Language.
    * 2.3.3 User shall verify their email addresses after signing up to ensure the validity of accounts before logging into the system.
    * 2.6.1 The application shall load within 3 seconds under normal network conditions.

For the complete list of requirements, refer [here](https://github.com/bounswe/bounswe2024group2/wiki/Requirements-%E2%80%90-Cmpe-451) please.

## 7 Individual Contribution Report

### Cem Güngör
* **Responsibilities:** I was in the backend team and mainly responsible for onboarding processes, and swagger. Also I've designed user scenarios and use case diagrams
* **Main contributions:**
    * Developed and implemented backend Logout endpoint and swagger documentation
    * Using scenarios and requirements draw use case diagrams
    * Created user scenarios 
* **Code-related significant issues:**
    * **Resolved Issue #295:**  Add registration endpoint. ([PR](https://github.com/bounswe/bounswe2024group2/pull/301))
    * **Resolved Issue #296:**  Add login endpoint. ([PR](https://github.com/bounswe/bounswe2024group2/pull/301))
    * **Resolved Issue #297:**  Added email verification endpoint. ([PR](https://github.com/bounswe/bounswe2024group2/pull/301))
    * **Resolved Issue #256:**  Add swagger. ([PR](https://github.com/bounswe/bounswe2024group2/pull/280))
    * **Resolved Issue #298:**  Add logout endpoint. ([PR](https://github.com/bounswe/bounswe2024group2/pull/331))
**Non-code-related significant issues:**
    * **Documented meeting notes for both labs and backend meetings**
    * **Assisted in the creation and updating of the use case diagrams, user scenarios and mobile mockups**


### Rukiye Aslan

* **Responsibilities:** I was in the backend team and mainly responsible for Dockerization of the project, managing database connections, and implementing the endpoints needed. Also, usually setting time for meetings.
* **Main contributions:**
    * Developed and implemented the backend API endpoints for user authentication (login, registration, email verification).
    * Designed and implemented the database schema for user accounts and other essential data.
    * Containerized the backend application and database using Docker for consistent deployment.
    * Configured and managed the database connection within the Dockerized environment.
    * Containerized the frontend application and database using Docker for consistent deployment and tests on local machine.
    
* **Code-related significant issues:**
    * **Resolved Issue #257:**  Dockerize the backend application. ([PR](https://github.com/bounswe/bounswe2024group2/pull/278))
    * **Resolved Issue #295:**  Add registration endpoint. ([PR](https://github.com/bounswe/bounswe2024group2/pull/301))
    * **Resolved Issue #296:**  Add login endpoint. ([PR](https://github.com/bounswe/bounswe2024group2/pull/301))
    * **Resolved Issue #297:**  Added email verification endpoint. ([PR](https://github.com/bounswe/bounswe2024group2/pull/301))
* **Non-code-related significant issues:**
    * **Organized and documented the lab reports, meeting notes for the whole and backend team.**
    * **Assisted in the creation and updating of the non functional requirements, sequence diagrams, ensuring accurate representation of responsibilities.**
* **Pull requests:** Pull requests apart from mentioned above
    * [PR #307](https://github.com/bounswe/bounswe2024group2/pull/307) - Fixed migration inconsistency caused by Django migration dependency.
    * [PR #333](https://github.com/bounswe/bounswe2024group2/pull/333) - Containerized frontend along with backend application and database for tests on local machine.
    * [PR #343](https://github.com/bounswe/bounswe2024group2/pull/343) - Fixed registration flow to direct user to verify her/his email.
    * [PR #344](https://github.com/bounswe/bounswe2024group2/pull/344) - Reflected implementations on  development branch onto main branch after testing on development branch for release.

* **Additional information:** In addition to the tasks I have provided above, I also presented our first customer milestone presentation.

### Furkan Şenkal
* **Responsibilities:** I am a member of the mobile team, my duties involve developing the overall project structure and configuring and implementing the mobile application. 
* **Main contributions:**
   
  * Contributed to user scenarios and usecase diagrams.
  * Designed and implemented login, register and forgot password page of mobile application.
  * Made backend connection of login and register pages.
  * Initialized the git environment for mobile project.

* **Code-related significant issues:**

  * Issue [#267](https://github.com/bounswe/bounswe2024group2/issues/267) : Initialize git environment
  * Issue [#351](https://github.com/bounswe/bounswe2024group2/issues/351) : Create login page of the mobile app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/317))
  * Issue [#352](https://github.com/bounswe/bounswe2024group2/issues/352) : Create register page of the mobile app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/319))
  * Issue [#353](https://github.com/bounswe/bounswe2024group2/issues/353) : Create forgot password page of the mobile app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/318))

* **Non-code-related significant issues:**

  * I made a research about W3C standarts. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/244))
  * I created the user scenarios with my team member @cemgungor1. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/251))
  * I created and updated the RAM Page. (related issues [1](https://github.com/bounswe/bounswe2024group2/issues/245), [2](https://github.com/bounswe/bounswe2024group2/issues/356),
  * I created the usecase diagrams with my team member @cemgungor1. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/279))
  
* **Pull requests:** PRs apart from above

  * [#334](https://github.com/bounswe/bounswe2024group2/pull/334): Bug fix about flatlist error that comes from mock data.
  * [#335](https://github.com/bounswe/bounswe2024group2/pull/335): Bug fixes and enhancement of header alignment.
  * [#337](https://github.com/bounswe/bounswe2024group2/pull/337): Bug fix about navigation stack.

* **Additional information:**
  * I contributed to the preparation of the requirements, and I prepared and documented the [lab report 4](https://github.com/bounswe/bounswe2024group2/wiki/Lab-Report-%234) and [lab meeting note 2](https://github.com/bounswe/bounswe2024group2/wiki/2nd-Lab-Meeting-Report,01.10.2024).

### Mahmut Buğra Mert
* **Responsibilities:** I am in the frontend team. My responsibility was creating mock markets page for demo to explain futures of our web page to customers. Additionally, I created the Project Plan. Took part in creating Sequence Diagrams, writing User Requirements, taking some of the meeting notes, researching and reviewing issues.
* **Main contributions:**

    * Created mock Markets and Stocks page.
    * Created Project Plan.
    * Created first draft of User Requirements.
    * Created half of the Sequence Diagrams.
    * Created initial mock page for Login.
* **Code-related significant issues:**

    * Issue [#269](https://github.com/bounswe/bounswe2024group2/issues/269). Initial mock Login page.
    * Issue [#316](https://github.com/bounswe/bounswe2024group2/issues/316). Market and Stocks page.
* **Non-code-related significant issues:**

    * Issue [#246](https://github.com/bounswe/bounswe2024group2/issues/246). First draft of User Requirements.
    * Issue [#247](https://github.com/bounswe/bounswe2024group2/issues/247). Project Plan.
    * Issue [#274](https://github.com/bounswe/bounswe2024group2/issues/274). Sequence Diagrams.
* **Pull requests:**

    * PR [#286](https://github.com/bounswe/bounswe2024group2/pull/286). Mock Login page.
    * PR [#336](https://github.com/bounswe/bounswe2024group2/pull/336). Market and Stocks page.
* **Additional information:** I attended nearly all of the labs and meetings. I took one lab report and one meeting notes. Made W3C researchs, and reviewed issues. For my weekly efforts, see my [personal page](https://github.com/bounswe/bounswe2024group2/wiki/Mahmut-Bu%C4%9Fra-Mert-CmpE451).
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
* **Responsibilities:** I was in the frontend team and also managed DevOps/deployment-related issues. I was mainly responsible for portfolio, news, and community pages, and mock data creation for those. In the DevOps part, I was responsible for the deployment, configuration of remote VMs, setting up a k8s environment and auto deploys via GitHub Actions. I also took responsibility for creating the requirements glossary, web mockups, and class diagram preparation.
* **Main contributions:**
    * Set up the web community page content: 
        * Created a community page to list active posts
        * Created a post view page that can display post content(graphs, text, news) and comments made on them.
        * Created related mock data
    * Set up the web news page content:
        * Created the news page to list recent news
        * Created related mock data
    * Set up the web portfolio page content:
        * Created portfolio/assets creation modals
        * Created portfolio/assets view page(charts, assets list, portfolio metadata)
        * Added asset add/remove/update functionalities
        * Created related mock data
    * Set up the navbar for web application, enabled routing over pages
    * Configured Digital Ocean Droplets
        * Create 2 VMs (master and worker) and set up k8s environment there. 
    * Configured Github Action Yamls
        * Created a Public Docker Hub registry
        * Automated deploys with action yamls that build and push the images to registry and rollouts pods with new ones on commits.
    * Deployed the application
* **Code-related significant issues:**
  
    - [**Created Community Page Skeleton for Web**](https://github.com/bounswe/bounswe2024group2/issues/338) - *Issue #338*
    - [**Created Navbar Skeleton for Web**](https://github.com/bounswe/bounswe2024group2/issues/289) - *Issue #289* 
    - [**Created News Page Skeleton for Web**](https://github.com/bounswe/bounswe2024group2/issues/290) - *Issue #290* 
    - [**Created Portfolio Page Skeleton for Web**](https://github.com/bounswe/bounswe2024group2/issues/302) - *Issue #302*
    - [**Created Github Action Yaml Files**](https://github.com/bounswe/bounswe2024group2/issues/268) Issue #268

* **Non-code-related significant issues:**
    - [**Create Requirements Glossary**](https://github.com/bounswe/bounswe2024group2/issues/238) Issue 238
    - [**Create Class Diagram**](https://github.com/bounswe/bounswe2024group2/issues/268) Issue 268
    - [**Create Web Mockups For Profile, Home and Post Creation Pages**](https://github.com/bounswe/bounswe2024group2/issues/358)  Issue #358 
    - [**Configuration of Deployment Environment utilizing K8s**](https://github.com/bounswe/bounswe2024group2/issues/270) Issue 270
    - [**Create Quickstart Documentation**](https://github.com/bounswe/bounswe2024group2/issues/272) Issue 272

* **Pull requests:**
    - [**Added community page skeleton**](https://github.com/bounswe/bounswe2024group2/pull/339) - *PR #339* 
    - [**Added portfolio page**](https://github.com/bounswe/bounswe2024group2/pull/309) - *PR #309* 
    - [**Added news page skeleton**](https://github.com/bounswe/bounswe2024group2/pull/303) - *PR #303*
    - [**Added navbar skeleton**](https://github.com/bounswe/bounswe2024group2/pull/291) - *PR #291* 
    - [**Added navbar styles**](https://github.com/bounswe/bounswe2024group2/pull/312) - *PR #312* 
    - [**Added not found page**](https://github.com/bounswe/bounswe2024group2/pull/321) - *PR #321* 

* **Additional information:** I have taken part in some other misc stuff like adding some meeting notes or reviewing other issues. Some fixing PRs and other issues have also not been added here since they are not significant. To see a full log of contributions see [here](https://github.com/bounswe/bounswe2024group2/wiki/Halil-%C4%B0brahim-Kasapo%C4%9Flu-CMPE-451#-contributions).


### Muhammed Erkam Gökcepınar
* **Responsibilities:** I am part of the mobile team and responsible for the configuration and implementation of the mobile application and designing the general structure of the project. 

* **Main contributions:** 

  * Contributed to system requirements and class diagrams 
  * Helped to design of the page structure of the app and implementation of the functionalities
  * Configured the mobile project and solved the initialization errors
  * Designed and implemented home and profile page of mobile application

* **Code-related significant issues:**

  * Issue [#261](https://github.com/bounswe/bounswe2024group2/issues/261) : Initialize mobile application (related [PR](https://github.com/bounswe/bounswe2024group2/pull/308))
  * Issue [#305](https://github.com/bounswe/bounswe2024group2/issues/305) : Create home page of the mobile app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/328))
  * Issue [#325](https://github.com/bounswe/bounswe2024group2/issues/325) : Create profile page of the mobile app (related [PR](https://github.com/bounswe/bounswe2024group2/pull/329))

* **Non-code-related significant issues:**

  * I made a research about graphics manipulation tools for web and mobile app. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/241))
  * I significantly contributed to write requirements in general and wrote the system requirements. (related issues [1](https://github.com/bounswe/bounswe2024group2/issues/242), [2](https://github.com/bounswe/bounswe2024group2/issues/273), [3](https://github.com/bounswe/bounswe2024group2/issues/293))
  * I have created the account on DigitalOcean. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/258))
  * I created the class diagrams with my team member @Halil-Ibrahim-Kasapoglu. (related [issue](https://github.com/bounswe/bounswe2024group2/issues/258))

* **Pull requests:** PRs apart from above

  * [#310](https://github.com/bounswe/bounswe2024group2/pull/310): Moving the project structure from Expo to React Native cli
  * [#341](https://github.com/bounswe/bounswe2024group2/pull/341): Last bug fixes including header and navigation problems

* **Additional information:**

  * I generated the apk of our mobile application.
  * I presented the mobile part in the first milestone presentation.
  * I worked on the integration of graphics library in our mobile app, but I can not integrate graphics until the first milestone.

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
