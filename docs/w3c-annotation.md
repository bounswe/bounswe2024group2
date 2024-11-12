## Introduction

The Web Annotation Data Model is a W3C (World Wide Web Consortium) standard that defines a structured format for creating and sharing annotations on digital resources. In our app, we will utilize this model to allow users to view and interact with news articles, portfolios, and stock information directly within posts through annotations. This integration aims to enhance user engagement and provide a richer exchange of information.

## Benefits

### Enhanced User Engagement

* Interactive Content: Annotations enable users to interact with specific parts of a post.

### Improved Content Discovery

* Contextual Information: Annotations can provide additional context, such as linking a stock symbol to its market data or attaching relevant news articles.
* Efficient Navigation: Users can quickly access related content without leaving the post, improving the overall user experience.

### Interoperability

* Standardization: Adhering to the W3C standard ensures compatibility with other tools and platforms that support the Web Annotation Data Model.
* Data Portability: Annotations can be easily shared or transferred between systems, promoting collaboration.
 
### Scalability

* Modular Architecture: The standardized model allows for scalable implementation, accommodating future features and integrations.
* Community Support: Utilizing a widely accepted standard provides access to community resources and updates.

## Requirements of Following the Standard

### Compliance with W3C Specifications

* Data Structure: Annotations must conform to the JSON-LD format as specified by the Web Annotation Data Model.
* URI Usage: Each annotation should have a unique identifier (URI) to ensure it can be individually referenced and accessed.
* Types of Annotations: Support for various annotation types such as Tagging, and Linking must be implemented.

### Annotation Properties

* Target: The specific part of the content the annotation refers to (e.g., a paragraph in a news article).
* Body: The content of the annotation itself, which could be text, links, or other media. r

### Technical Implementation

* Compatibility: The system must be compatible with existing web technologies and standards.
* Performance: Annotations should load efficiently without degrading the performance of the app.


### How it will be enforced in practice | Frontend

**Which elements may be displayed by annotations?**

- **News**: Highlights a brief summary of the specific news article on hover, allowing users to understand the context; clicking redirects to the full article page.
- **Stocks**: Displays essential stock details on hover, offering quick insights; redirects to the stock's main page for deeper information.
- **Tags**: Shows a tooltip like "See posts related to tag_name," enabling users to explore related discussions.
- **Users**: Highlights key user info on hover, including follower count, like count, and badges, giving a snapshot of user influence; clicking redirects to the user’s profile.
- **Badges**: Provides a description on hover of how the badge was obtained (e.g., "Achieved 100 followers"), offering recognition context without redirection.
- **Portfolios**: Displays a pie chart of the user’s portfolio on hover, representing stock allocations; clicking redirects to the portfolio's page for further details.


**Where in our applications may annotations appear?**
- **Post page**  
  On the post page, following annotations may appear:
  -Stocks
  -Tags
  -Users
  -Badges
  -Portfolios
  
    A post consists of multiple blocks, such as graphs, text, and news items. Users can leave a comment for each part separately, allowing for targeted interaction with specific content segments.

  
- **Profile page**  
  On the post page, following annotations may appear:
  -Badges

  

**How to visualize annotations?**

Annotations may be visually highlighed as: 
- On hover, a panel will open, displaying short, highlighted information. 
- On click, it will redirect to the page of the annotated element.


### How it will be enforced in practice. | Mobile

**Which user actions will create annotations?**

**Linking News:** Users can select a “Link News” option, which opens a searchable interface to add news articles directly related to their post.

**Tagging:** Users can add tags to categorize posts, which appear prominently as annotations at the top of the post. This helps users filter and navigate relevant topics efficiently.

**Linking Portfolios:** User can add their portfolios in the post creation page. It will provides other users to access the details of the linked portfolio.

**Link Stocks to Portfolios:** Associate stocks with portfolios, adding relevant context to portfolio performance and enhancing transparency on holdings.

**Add Annotations on Profiles:** Highlight accomplishments or relevant information on their profiles, which can help others gauge credibility.

**How to visualize annotations in mobile app?**

**Hover or Click Details:** Users can hover over or click on an annotation to view more information, such as the full text of the linked news article, details about tagged stocks, or further context on a related portfolio.

**Sorting and Filtering:** Users can filter or sort posts based on annotations (e.g., posts linked to certain news, tagged with specific topics, or containing certain types of comments).
