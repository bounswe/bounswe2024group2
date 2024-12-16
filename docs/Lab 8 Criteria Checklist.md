---
title: Lab 8 Criteria Checklist

---

# Criteria Checklist
1. **Primary features**
* Semantic Search
    * Acceptance Criterias
        - [ ] User should be able to search posts using their titles, contents and tags.

* User Management
    * Acceptance Criterias
        - [x] User should be able to login with their credentials.
        - [x] User should be able to log out.
        - [x] User should be able to register with a unique email, username and secure password.
        - [ ] User should be able to follow/unfollow other users.
        - [ ] User should be able to manage his/her profile information.
        - [ ] User should be able to view profile pages of other users.
        - [ ] User should be able to view his/her followers.
* Post Creation and Interactions
    * Acceptance Criterias
        - [x] Post creation with necessary components like title, content and additive information like tags, portfolios and graphics should be implemented.
        - [ ] Posts should be editable.
        - [ ] Post like/unlike and comment features should be available.
        - [x] Posts should be visible to other users in the community page.

* Filtering
    * Acceptance Criterias
        - [ ] Filtering that filters news according to their sources should be available.
        - [ ] User should be able to filter posts using the information of authors and if a graphic, portfolio and news is attached to post.
        



---

2. Domain-specific features (e.g. why they're specific, how they're implemented),

* **Financial and Cryptocurrency news with RSS feeds**
    * Acceptance Criterias:
        - [x]  News should be successfully fetched
        - [x] News should link to mentioned news on the page
        - [ ] News should not require a subscription on the page to read
        - [x] News should be up to date
* **Portfolio Tracking**
    * Acceptance Criterias: 
        - [ ] Portfolios should be created with existing stocks only
        - [ ] Portfolios should show current price
        - [x] Portfolios should show profit/loss using a pie chart
        - [x] Stocks can be deleted and added to portfolios then portfolio should be updated
        - [x] Portfolios should show number of stocks and current value
* **Up-to-date Stock Details with graphs**
    * Acceptance Criterias:
        - [x] Stock prices should be up to date, no late than 16 minutes old.
        - [ ] Stock details should support all Turkish and US stock markets' stocks
        - [ ] Stock details should have company description, website, phone number, and sector
        - [ ] Stock details should include line or bar chart
* **Posts with portfolios, hot news, and graphs**
    * Acceptance Criterias:
        - [ ] Portfolios of post owner should be embeddable within posts
        - [ ] News from RSS feeds should be embeddable within posts
        - [ ] Graphs of stocks should be embeddable within posts
        - [ ] Combinations of portfolio, news and graphs should be embeddable within posts



---


3. **API and its documentation**

#### General Criteria for API

1. **Consistency**:
   - [ ] API naming conventions and structures (e.g., endpoints, request/response bodies) must follow RESTful principles.
   - [ ] Use standard HTTP methods: GET, POST, PUT, PATCH, DELETE.

2. **Authentication and Authorization**:
   - [ ] Secure endpoints requiring authentication with tokens (e.g., access and refresh tokens).
   - [ ] Prevent unauthorized access by validating user credentials and tokens.

3. **Validation**:
   - [ ] All request bodies must be validated for required fields, types, and formats before processing.
   - [ ] Invalid requests should return descriptive error messages with appropriate status codes.

4. **Error Handling**:
   - [ ] API should return meaningful error codes (e.g., 400 for bad requests, 401 for unauthorized, 404 for not found).
   - [ ] Include detailed error messages for debugging purposes.

5. **Pagination**:
   - [ ] Endpoints returning multiple resources must support pagination with `count`, `next`, and `previous` metadata.

6. **Rate Limiting**:
   - [ ] Implement rate limiting to avoid abuse or overloading the API.

7. **Documentation**:
   - [ ] Each endpoint should include:
     - Purpose and description.
     - Supported HTTP methods.
     - Required headers, query parameters, and body examples.
     - Sample responses (both success and error).


#### Specific Criteria for API Endpoints

1. **Register**
   - [ ] Users must provide valid `username`, `password`, and `email`.
   - [ ] Passwords must follow a secure format (e.g., minimum length, mixed characters).
   - [ ] Email verification step must be enforced before the user can log in.
   - [ ] Returns `201 Created` on success with a message confirming registration.

2. **Login**
   - [ ] Accepts `username` and `password`.
   - [ ] Returns access and refresh tokens upon success.
   - [ ] Invalid credentials should return `401 Unauthorized` with a descriptive error message.

3. **Login Refresh**
   - [ ] Accepts a valid refresh token.
   - [ ] Returns new access and refresh tokens upon success.
   - [ ] Expired or invalid tokens return `403 Forbidden`.

4. **Logout**
   - [ ] Revokes the refresh token provided in the request body.
   - [ ] Returns `204 No Content` on success.

5. **Profiles**
   - [ ] `GET All`: Returns paginated profile data.
   - [ ] `POST`: Requires `profile_picture`, `bio`, `location`, and empty follower/following arrays on creation.
   - [ ] `PUT`/`PATCH`: Requires a valid profile ID and allows full or partial updates.
   - [ ] `DELETE`: Deletes a profile by ID and returns `204 No Content` on success.

6. **Posts**
   - [ ] `GET All`: Returns paginated post data with metadata.
   - [ ] `POST`: Requires valid `title`, `content`, `author`, and optional arrays (`liked_by`, `tags`, `portfolios`).
   - [ ] `PUT`/`PATCH`: Updates a post with a valid ID.
   - [ ] `DELETE`: Deletes a post by ID.

7. **Comments**
   - [ ] Follows similar criteria as `Posts` for CRUD operations.
   - [ ] Requires `post_id`, `user_id`, and `content`.

8. **Currencies**
   - [ ] Enforce valid `name` and `code` formats for creation.
   - [ ] Return all currencies with pagination support.

9. **News**
   - [ ] Requires a valid `feed_name` to fetch news.
   - [ ] Returns an array of news objects with metadata (`title`, `published`, `description`, `image`).

0. **Tags**
   - [ ] Requires `name` and `user_id` for creation.
   - [ ] CRUD operations adhere to general standards.

1. **Token**
   - [ ] Token creation requires `username` and `password`.
   - [ ] Token refresh should verify the existing token's validity.

2. **Stocks**
   - [ ] Automatically generate stocks for creation.
   - [ ] Return up-to-date `price` information for stock retrieval.


#### Examples of Well-Documented API

1. **Register Endpoint Example**:
   ```
   POST /api/register
   Content-Type: application/json
   Body:
   {
     "username": "roketatar",
     "password": "roket123",
     "email": "borsakaplani@hotmail.com"
   }
   Response:
   Status: 201 Created
   {
     "message": "Registration successful. Please verify your email."
   }
   ```

2. **Error Response Example**:
   ```
   POST /api/login
   Content-Type: application/json
   Body:
   {
     "username": "wronguser",
     "password": "wrongpass"
   }
   Response:
   Status: 401 Unauthorized
   {
     "error": "Invalid credentials. Please check your username and password."
   }
   ```


---
4. **Standard being followed**
Web Annotation Data Model will be used.
    1. Document Web AnnotationData Model
        - [x]     Documentation can be found [here](https://github.com/bounswe/bounswe2024group2/wiki/W3C%E2%80%90Annotation/9135d3225cd7f56f968dc719c12da384101d78a0).
    2. Implementation
    * Backend
        - [ ] Another django project should be implemented for annotations.
        - [ ] Within the annotation project, annotation REST endpoints should be implemented.
    * Frontend
        - [ ] Annotation creation feature should be implemented. When a user highlights a part from text body of a post, annotate feature, which calls create annotation from backend, should be visible.
        - [ ] When annotation is selected by user, a pop-up screen should appear where users can add their comments as text.
        - [ ] When annotation is created, create annotate endpoint from backend should be called.
        - [ ] Annotations created should be visible as a pop-up when a user hovers over an annotated field.
    * Mobile
        - [ ] Annotation creation feature should be implemented. When a user highlights a part from text body of a post, annotate feature, which calls create annotation from backend, should be visible.
        - [ ] When annotation is selected by user, a pop-up screen should appear where users can add their comments as text.
        - [ ] When annotation is created, create annotate endpoint from backend should be called.
        - [ ] Annotations created should be visible as a pop-up when a user hovers over an annotated field.
    
--- 
5. **Testing strategies**

    5.1 Backend Testing

    - [ ] Write unit tests for individual components or functions.
        - Tests cover serializers, models, or individual methods in views.
        - Tests are isolated from external dependencies, ensuring internal logic correctness.
        - Unit tests cover at least 90% of the lines for each individual component.

    - [ ] Write integration tests to verify interactions between components.
        - Tests ensure correct interactions between views, serializers, and external services.
        - End-to-end functionality for critical features is validated.


    5.2. Frontend Testing
    - [ ] Define critical UI components and their expected behavior.
        - List of components finalized.
        - Documentation includes expected behavior for each component.

    - [ ] Implement unit tests for React components.
        - All key components have unit test coverage >90%.
        - Tests validate rendering, props handling, and state updates.

    - [ ] Conduct integration tests for user workflows.
        - Test cases cover login, profile, and portfolio features.
        - Navigation flows are verified for correctness.


    5.3. Mobile Testing
    - [ ] Identify core features for React Native testing.
        - Features like login, profile navigation, and form submissions are documented.

    - [ ] Develop unit tests for mobile components.
        - Key components render correctly for different states and props.

    - [ ] Perform integration and E2E tests using Detox.
        - Navigation flows are fully tested and validated across screens.


    5.4. Mock Data Strategy
    - [ ] Set up Faker.js for realistic data generation.
        - Mock data mimics real-world constraints and relationships.


    5.5. Reporting
    - [ ] Generate unit test reports for frontend and backend.
        - Jest generates HTML and text-summary reports.
        - Reports uploaded to repository wiki.

    - [ ] Integrate test reports into CI pipeline.
        - GitHub Actions automatically runs tests and reports coverage.

    5.6. Documentation

    - [ ] Document the testing strategy plan in the repository wiki.
        - Testing strategy is clearly outlined, including the purpose and scope of each type of testing (unit, integration, E2E).
        - Step-by-step guide on how to run tests for backend, frontend, and mobile applications is included.
        - Examples of test cases for each layer are provided (e.g., sample unit tests for serializers, integration tests for news endpoints).
        - Mock data strategy with Faker.js and MSW is explained.
        - Instructions on generating and interpreting test reports are documented.


