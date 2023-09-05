# NewsApp
BTC Pro News Application

## News Source Listing Screen

## NewsSources Component

### Description:
The NewsSources component lists news sources available in a specific language (currently only English). This component allows users to filter news sources by category.

**Usage:**
By default, the component lists all English news sources.

**Props:**
This component does not take any props.

**Features:**
-   sources: List of news sources returned from the API.
-   useEffect: Retrieves news sources from the API when the page is loaded.


## News Listing Screen:

## NewsList Component

### Definition:
The NewsList component displays the latest news headlines and articles for a specific keyword. It also offers an auto-refresh option, provides infinite scrolling functionality, and allows the user to return to the previous page.

**Features:**
-   **Featured Headlines (Swiper)**: Displays featured news headlines. Automatically moves and shows one headline at a time on mobile devices or small screens, but shows three headlines on larger screens.
-   **Searched Articles List**: Displays news articles found based on the search term.
-   **Auto-Refresh Modal**: Displays a modal asking the user whether to select the auto-refresh option.
-   **Infinite Scrolling**: Loads more articles as the user scrolls the page.
-   **Back Button**: Directs the user back to the previous page.

**State Structure:**
-   **topHeadlines**: Holds the featured news headlines.
-   **searchedArticles**: Holds news articles found based on the search term.
-   **loading**: Checks if articles are loaded.
-   **hasMore**: Checks if there are more articles.
-   **page**: Holds the current page number for infinite scrolling.
-   **showModal**: Controls whether to display the modal.
-   **autoRefresh**: Checks if the auto-refresh option is active.

**Functions:**
-   **addToSet**: Used to combine old and new articles. Ensures new ones appear first.
-   **fetchNews**: Retrieves news articles based on the search term.
-   **loadMoreArticles**: Loads articles from the next page.
-   **handleModalChoice**: Sets the auto-refresh option based on the user's choice on the modal.
-   **goBack**: Directs the user back to the previous page.
-   **observer (useRef)**: Holds the Intersection Observer for infinite scrolling functionality.
-   **lastArticleRef (useCallback)**: Holds the reference to the last article and triggers to load more articles when the article appears in the viewport.

**Usage:**
Use this component when you want to list news articles for a specific search term. Featured news headlines are displayed within a swiper slider. Articles are loaded infinitely as you scroll down.


## News Detail Screen
## NewsDetail Component

**Description:**
-   Displays details of the selected news article.
-   Allows users to add or remove the article from their reading list.

**Features:**
-   Displays the selected news in detail.
-   Contains a link for full access to the news.
-   Users can go back to the previous page.
-   Users can add or remove the article from their reading list.

**Connections:**
-   useNews: Provides access to information about the selected news article.
-   useNavigate: Used for page navigation functionality.
-   Layout: Main page structure component.

**Usage:**
Use this component when the user chooses to view a news article in detail. It also offers buttons for users to add or remove the article from their reading list.


## Reading List Screen

## ReadingList Component

### Features:
-   A component that displays news in the user's reading list.
-   If there are no news articles in the user's reading list, a blank screen with a button directing to the home page is shown.

**Used Components and Modules:**
-   useNavigate: Used for page navigation functionality.
-   Layout: The main component that forms the general template of the application.
-   ArticleItem: Used to display each news item in the reading list.
-   FaFrown: The sad face icon displayed when the reading list is empty.

**Usage:**
Use this component to review the user's reading list. If the list is empty, the user is presented with a message and an option to return to the home page.


## ArticleItem Component

### Features:
-   An item component used for listing news.
-   Each item is clickable and directs the user to the detail page.
-   The news can be added to or removed from the reading list.

### Props:
-   article: Contains data related to the news article.
-   title (String): The article's headline.
-   description (String): The article's description.
-   urlToImage (String): The visual URL of the article.
-   url (String): URL for full access to the article.
-   publishedAt (String): The date the article was published.

-   lastArticleRef: A reference used for infinite scrolling.
-   isLastItem (Bool): Checks if it's the last item in the news list.
-   isReadingList (Bool): Checks if the item is in the reading list.

**Usage:**
This component is used to display each news item within a news list. Each item redirects to the detail page in response to the user's click.


### CustomModal Component

## Features:
-   Used to display modals in the application.
-   Show and close functionalities are dynamic, allowing you to create modals with different content using this component.

### Props:
-   show: Boolean value indicating whether the modal is displayed.
-   onClose: Function that triggers the closing of the modal.
-   title: Modal title.
-   children: Modal content.

**Used Helper Function - Hook:**
-   useModal: A hook used to control whether a modal is displayed. The isVisible indicates whether the modal is currently displayed or not. The show and hide functions are used to respectively display and hide the modal.

**Usage:**
Use this component to easily create modals anywhere in the application. With the children prop, you can dynamically change the modal content.


## Filter Component

## Definition:
This component is used to filter news categories. Users can select from existing categories to determine which categories of news they want to view.

## Props:
-onFilterApply: (function, required) A callback function for exporting the selected categories.

### Features:
-   Displays relevant categories according to the API document.
-   Contains a button named "Apply" to implement the relevant category filter.


## Card Component

## Definition:
This component introduces a news source in the form of a visual card.

## Props:
-   source: (object, required) Contains information about the news source.
-   name: (string, required) Contains the source's name.
-   description: (string) Contains a brief description of the source.
