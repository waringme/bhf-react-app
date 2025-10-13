# BHF React App

A React application that integrates with Adobe Experience Manager (AEM) Headless CMS using GraphQL persisted queries to deliver content for a British Airways-themed web application.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variable Setup](#environment-variable-setup)
- [Persistent Queries](#persistent-queries)
- [Content Fragments and Models](#content-fragments-and-models)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [License](#license)

## Overview

This application is built with React and uses the Adobe AEM Headless Client to fetch content from AEM via GraphQL persisted queries. The app features flight booking functionality, articles, services, and various content sections powered by AEM Content Fragments.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Access to an AEM instance (Author or Publish environment)
- AEM GraphQL persisted queries configured in your AEM instance

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bhf-react-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory (see [Environment Variable Setup](#environment-variable-setup))

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will run on `https://localhost:3000` (HTTPS enabled by default).

## Environment Variable Setup

The application requires several environment variables to connect to AEM and fetch content. Create a `.env` file in the root directory with the following variables:

### Required Variables

```env
# AEM Host URI - The base URL of your AEM instance
REACT_APP_HOST_URI=https://your-aem-instance.com

# GraphQL Endpoint - The path to your AEM GraphQL endpoint
REACT_APP_GRAPHQL_ENDPOINT=/content/graphql/global/endpoint.json

# Base endpoint paths for persisted queries
REACT_APP_ENDPOINT=your-project/endpoint-name
REACT_APP_BA_ENDPOINT=your-ba-project/endpoint-name

# Proxy Configuration - Set to 'true' to use proxy and avoid CORS issues in development
REACT_APP_USE_PROXY=false
```

### Authentication Variables (Required for AEM Author environments)

Choose one authentication method:

#### Option 1: Basic Authentication
```env
REACT_APP_AUTH_METHOD=basic
REACT_APP_BASIC_AUTH_USER=your-username
REACT_APP_BASIC_AUTH_PASS=your-password
```

#### Option 2: Developer Token
```env
REACT_APP_AUTH_METHOD=dev-token
REACT_APP_DEV_TOKEN=your-development-token
```

#### Option 3: No Authentication (for Publish environments)
```env
# Leave REACT_APP_AUTH_METHOD undefined or empty
```

### Example Configuration

**For Production (AEM Publish):**
```env
REACT_APP_HOST_URI=https://publish-p12345-e67890.adobeaemcloud.com
REACT_APP_GRAPHQL_ENDPOINT=/content/graphql/global/endpoint.json
REACT_APP_ENDPOINT=bhf-project/production
REACT_APP_BA_ENDPOINT=bhf-ba-project/production
REACT_APP_USE_PROXY=false
```

**For Development (AEM Author):**
```env
REACT_APP_HOST_URI=https://author-p12345-e67890.adobeaemcloud.com
REACT_APP_GRAPHQL_ENDPOINT=/content/graphql/global/endpoint.json
REACT_APP_ENDPOINT=bhf-project/development
REACT_APP_BA_ENDPOINT=bhf-ba-project/development
REACT_APP_USE_PROXY=true
REACT_APP_AUTH_METHOD=dev-token
REACT_APP_DEV_TOKEN=your-token-here
```

### How Environment Variables Are Used

The application initializes the AEM Headless Client using these variables:

- **serviceURL**: Determined by `REACT_APP_USE_PROXY` - either "/" (proxy mode) or `REACT_APP_HOST_URI`
- **endpoint**: Set from `REACT_APP_GRAPHQL_ENDPOINT`
- **auth**: Set by `setAuthorization()` function based on `REACT_APP_AUTH_METHOD`

## Persistent Queries

The application uses GraphQL persisted queries to fetch content from AEM. Persisted queries are pre-defined GraphQL queries stored in AEM that provide better performance and security.

### What Are Persisted Queries?

Persisted queries are GraphQL queries that:
- Are stored and executed on the AEM server
- Have a unique URL endpoint
- Can be cached for better performance
- Provide better security by not exposing query structure to clients
- Are versioned and managed in AEM

### Available Persisted Queries

The application includes the following custom React hooks that call persisted queries:

#### 1. `usePageBySlug(slug, variation, fetchTrigger)`
Fetches page data by slug identifier.

- **Query**: `{REACT_APP_ENDPOINT}/page-by-slug`
- **Parameters**: 
  - `slug` (required): Page identifier
  - `variation` (optional): Content variation (default: "master")
  - `fetchTrigger` (optional): Dependency to trigger refetch
- **Returns**: Page object from `pageList.items[0]`

**Example:**
```javascript
import { usePageBySlug } from './api/usePersistedQueries';

function MyComponent() {
  const { data, error } = usePageBySlug('home-page', 'master');
  // Use data...
}
```

#### 2. `useBAPageBySlug(slug, variation, fetchTrigger)`
Fetches British Airways specific page data.

- **Query**: `{REACT_APP_BA_ENDPOINT}/GetPageByPath`
- **Parameters**:
  - `variation` (optional): Content variation (default: "master")
  - `fetchTrigger` (optional): Dependency to trigger refetch
- **Returns**: Page object from multiple possible response structures
- **Note**: Hardcoded path to `/content/dam/bhf/en/fragments/home-page-react`

#### 3. `useTeaserListByPath(path, variation, fetchTrigger)`
Fetches teaser list content.

- **Query**: `{REACT_APP_ENDPOINT}/teaser-list-by-path`
- **Parameters**:
  - `path` (required): Content Fragment path
  - `variation` (optional): Content variation (default: "master")
  - `fetchTrigger` (optional): Dependency to trigger refetch
- **Returns**: Teaser list from `teaserListList.items[0]`

#### 4. `useArticleBySlug(slug)`
Fetches individual article by slug.

- **Query**: `{REACT_APP_ENDPOINT}/article-by-slug`
- **Parameters**:
  - `slug` (required): Article identifier
- **Returns**: Article object from `articleList.items[0]`

#### 5. `useArticles(first)`
Fetches paginated list of articles.

- **Query**: `{REACT_APP_ENDPOINT}/articles`
- **Parameters**:
  - `first` (optional): Number of articles to fetch
- **Returns**: Array of articles from `articlePaginated.edges`

#### 6. `useServiceBySlug(slug)`
Fetches individual service by slug.

- **Query**: `{REACT_APP_ENDPOINT}/service-by-slug`
- **Parameters**:
  - `slug` (required): Service identifier
- **Returns**: Service object from `serviceList.items[0]`

#### 7. `useServices(first)`
Fetches paginated list of services.

- **Query**: `{REACT_APP_ENDPOINT}/services`
- **Parameters**:
  - `first` (optional): Number of services to fetch
- **Returns**: Array of services from `servicePaginated.edges`

#### 8. `useFlightPackageById(packageId, variation, fetchTrigger)`
Fetches flight package details.

- **Query**: `{REACT_APP_BA_ENDPOINT}/flightpackage-by-id`
- **Parameters**:
  - `packageId` (required): Flight package identifier
  - `variation` (optional): Content variation (default: "master")
  - `fetchTrigger` (optional): Dependency to trigger refetch
- **Returns**: Flight package from `flightPackageList.items[0]`

#### 9. `useChooseAFare(variation, fetchTrigger)`
Fetches fare selection data.

- **Query**: `{REACT_APP_BA_ENDPOINT}/choose-a-fare`
- **Parameters**:
  - `variation` (optional): Content variation (default: "master")
  - `fetchTrigger` (optional): Dependency to trigger refetch
- **Returns**: Fare data from `chooseAFareList.items[0]`

### How Persisted Queries Work

1. **Query Definition**: GraphQL queries are defined and saved in AEM
2. **Query Execution**: The app calls `fetchPersistedQuery(persistedQueryName, queryParameters)`
3. **Client Request**: The AEM Headless Client sends a request to the persisted query endpoint
4. **AEM Processing**: AEM executes the pre-defined query with provided parameters
5. **Response**: Data is returned in the expected format
6. **State Management**: React hooks manage the data and error states

### Creating Your Own Persisted Queries in AEM

To add new persisted queries to your AEM instance:

1. Navigate to AEM GraphQL Explorer: `https://<aem-host>/content/graphiql.html`
2. Write and test your GraphQL query
3. Click "Save" or "Persist Query" and provide a name
4. Note the full path to your persisted query
5. Create a corresponding React hook in `src/api/usePersistedQueries.js`

### Error Handling

All persisted query hooks return an object with:
- `data`: The fetched content (null if loading or error)
- `error`: Error message if the query fails (null if successful)

Example error handling:
```javascript
const { data, error } = useArticles(10);

if (error) {
  return <div>Error: {error}</div>;
}

if (!data) {
  return <div>Loading...</div>;
}

return <div>{/* Render data */}</div>;
```

## Content Fragments and Models

### Overview

Content Fragments in AEM are structured content based on Content Fragment Models. The application uses these models to define the schema for different types of content (Articles, Services, Pages, etc.) and renders them using React components.

### How Content Fragments Work

#### 1. Content Fragment Models in AEM

Content Fragment Models define the structure of your content. They are configured in AEM at paths like:
- `/conf/securbank/settings/dam/cfm/models/article`
- `/conf/securbank/settings/dam/cfm/models/service`

Each model defines fields such as:
- **Text fields**: `title`, `slug`, `description`
- **Rich text fields**: `content`
- **Media references**: `image`, `icon`
- **Fragment references**: `relatedArticles`, `serviceCategory`
- **Custom fields**: Model-specific fields

#### 2. Content Fragment Component Wrapper

The `ContentFragment` component (`src/components/base/ContentFragment.jsx`) is a wrapper that:
- Wraps rendered content with AEM Universal Editor metadata
- Provides `data-aue-*` attributes for in-context editing
- Enables content authors to edit fragments directly in the published app

**Key Features:**
```javascript
<ContentFragment
  cf={data}                    // Content Fragment data object
  behavior="component"         // Optional: editing behavior
  className="my-component"     // CSS classes
  tag="section"               // HTML tag (default: div)
  label="Custom Label"        // Custom label for editor
>
  {/* Your rendered content */}
</ContentFragment>
```

**Data Attributes Generated:**
- `data-aue-resource`: URN pointing to the fragment path
- `data-aue-type`: Set to "reference"
- `data-aue-label`: Display label in Universal Editor
- `data-aue-behavior`: Component behavior (e.g., "component")

#### 3. Base Components for Field Rendering

The application provides base components to render specific fields from content fragments:

**Title Component** (`src/components/base/Title.jsx`)
- Renders heading elements from fragment title fields
- Supports different heading levels (h1-h6)
- Includes `prop` attribute for field identification

**Text Component** (`src/components/base/Text.jsx`)
- Renders rich text content
- Parses HTML content safely
- Supports `prop` attribute for field identification

**Image Component** (`src/components/base/Image.jsx`)
- Renders images from fragment media fields
- Handles both `_path` and `_dynamicUrl` formats
- Includes `prop` attribute for field identification

### Call-to-Action (CTA) Implementation

The application uses several patterns for implementing CTAs with content fragments:

#### Pattern 1: Static CTA Component

The `CallToActionSection` component renders a hardcoded CTA section:

**Location:** `src/components/CallToActionSection.jsx`

**Usage in Pages:**
```javascript
import CallToActionSection from "../components/CallToActionSection";

function MyPage() {
  return (
    <>
      {/* Other content */}
      <CallToActionSection />
    </>
  );
}
```

**Features:**
- Fixed content (title, description, buttons)
- Used on Articles, Services, and other pages
- Consistent branding and messaging

#### Pattern 2: Content Fragment with CTA Fields

Content fragments can include CTA-related fields in their models:

**Example: Service Model with CTA**
```javascript
// ServiceDetail component
const ServiceDetail = ({ slug }) => {
  const { data } = useServiceBySlug(slug);
  
  return (
    <ContentFragment cf={data}>
      <Title heading="h1" prop="title">{data.title}</Title>
      <Text content={data.description} prop="description" />
      {/* CTA Button */}
      <RedirectButton className="hover-effect">
        Book Now
      </RedirectButton>
    </ContentFragment>
  );
};
```

**Example: Article Card with CTA Link**
```javascript
// ArticleCard component
const ArticleCard = ({ cf }) => {
  return (
    <ContentFragment cf={cf} behavior="component">
      <Image src={cf.image._dynamicUrl} prop="image" />
      <Title heading="h5" prop="title">{cf.title}</Title>
      {/* CTA Button linking to article detail */}
      <RedirectButton href={`/articles/${cf.slug}`} className="secondary">
        Learn More
        <img src={arrowRight} alt="Right arrow icon" />
      </RedirectButton>
    </ContentFragment>
  );
};
```

#### Pattern 3: Dynamic CTA Fields in Models

To make CTAs fully dynamic and editable in AEM, you can extend Content Fragment Models with CTA fields:

**Recommended CTA Model Fields:**
1. **ctaText** (Single line text): Button label
2. **ctaUrl** (Single line text): Link destination
3. **ctaStyle** (Enumeration): Button style (primary, secondary, tertiary)
4. **ctaOpenInNewTab** (Boolean): Link behavior

**Example Implementation:**
```javascript
// Component using dynamic CTA fields
const DynamicCTAComponent = ({ cf }) => {
  const ctaText = cf.ctaText || "Learn More";
  const ctaUrl = cf.ctaUrl || "#";
  const ctaStyle = cf.ctaStyle || "primary";
  
  return (
    <ContentFragment cf={cf}>
      <Title prop="title">{cf.title}</Title>
      <Text prop="description" content={cf.description} />
      
      {/* Dynamic CTA from content fragment */}
      <RedirectButton 
        href={ctaUrl}
        className={ctaStyle}
        data-aue-prop="ctaText"
      >
        {ctaText}
      </RedirectButton>
    </ContentFragment>
  );
};
```

#### RedirectButton Component

The `RedirectButton` component is a reusable wrapper for CTA buttons:

**Location:** `src/components/RedirectButton.jsx`

**Usage:**
```javascript
<RedirectButton 
  href="/destination"
  className="primary hover-effect"
>
  Button Text
</RedirectButton>
```

**Features:**
- Wraps an anchor tag with a button
- Supports custom styling via className
- Used throughout the application for consistent CTAs

### Content Fragment Configuration

The application includes configuration files that define available content fragment models:

#### Component Definition (`public/static/component-definition.json`)

Defines the content fragment models available in the Universal Editor:

```json
{
  "groups": [
    {
      "title": "Content Fragments",
      "id": "content-fragments",
      "components": [
        {
          "title": "Article",
          "id": "article",
          "plugins": {
            "aem": {
              "cf": {
                "name": "article",
                "cfModel": "/conf/securbank/settings/dam/cfm/models/article",
                "cfFolder": "/content/dam/securbank/pages/articles",
                "template": {
                  "title": "New Article",
                  "slug": "new-article"
                }
              }
            }
          }
        }
      ]
    }
  ]
}
```

#### Filter Definition (`public/static/filter-definition.json`)

Defines filters for selecting specific content fragments:

```json
[
  {
    "id": "featured-services",
    "components": ["service"]
  },
  {
    "id": "related-articles",
    "components": ["article"]
  }
]
```

### Best Practices

1. **Always wrap content from fragments with `ContentFragment` component** for Universal Editor support
2. **Use base components** (`Title`, `Text`, `Image`) with `prop` attributes for field-level editing
3. **Include fallback values** for optional fields to prevent rendering errors
4. **Use `_dynamicUrl`** for images when available (optimized delivery)
5. **Keep CTA text editable** by storing it in content fragment fields rather than hardcoding
6. **Test with and without data** to ensure proper loading states

### Example: Complete Content Fragment Rendering

```javascript
import ContentFragment from "./base/ContentFragment";
import Title from "./base/Title";
import Text from "./base/Text";
import Image from "./base/Image";
import RedirectButton from "./RedirectButton";

const MyComponent = ({ cf }) => {
  if (!cf) return <div>Loading...</div>;

  return (
    <ContentFragment 
      cf={cf}
      behavior="component"
      className="my-component"
    >
      {/* Image Field */}
      <Image 
        src={cf.image?._dynamicUrl} 
        alt={cf.title}
        prop="image"
      />
      
      {/* Title Field */}
      <Title heading="h2" prop="title" className="heading">
        {cf.title}
      </Title>
      
      {/* Rich Text Field */}
      <Text 
        content={cf.description}
        prop="description"
        className="description"
      />
      
      {/* CTA with dynamic fields */}
      {cf.ctaText && (
        <RedirectButton 
          href={cf.ctaUrl || "#"}
          className="primary"
        >
          {cf.ctaText}
        </RedirectButton>
      )}
    </ContentFragment>
  );
};
```

## Available Scripts

### `npm start` or `yarn start`

Runs the app in development mode with HTTPS enabled on port 3000.
Open [https://localhost:3000](https://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm test` or `yarn test`

Launches the test runner in interactive watch mode.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.
The build is optimized and minified for best performance.

### `npm run eject` or `yarn eject`

**Note: This is a one-way operation!**

Ejects from Create React App, giving you full control over configuration files.

## Project Structure

```
bhf-react-app/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── static/            # Static assets
├── src/
│   ├── api/               # AEM Headless integration
│   │   ├── aemHeadlessClient.js    # AEM client configuration
│   │   ├── usePersistedQueries.js  # Persisted query hooks
│   │   └── index.js
│   ├── components/        # React components
│   │   ├── base/          # Base components
│   │   ├── static/        # Static components
│   │   └── structure/     # Layout components
│   ├── pages/             # Page components
│   ├── styles/            # Global styles and fonts
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component
│   └── index.jsx          # Application entry point
├── .env                   # Environment variables (create this)
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Key Dependencies

- **React 18.2.0**: UI framework
- **@adobe/aem-headless-client-js**: AEM Headless client for GraphQL
- **react-router-dom**: Routing
- **sass**: CSS preprocessing
- **react-helmet-async**: Document head management

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. Set `REACT_APP_USE_PROXY=true` in your `.env` file
2. Configure a proxy in your build setup to forward requests to AEM

### Authentication Errors
- Verify your credentials are correct
- Ensure `REACT_APP_AUTH_METHOD` matches your credential type
- For AEM Publish, authentication is typically not required

### Query Not Found Errors
- Verify the persisted query exists in AEM
- Check the query name matches exactly (including path)
- Ensure `REACT_APP_ENDPOINT` and `REACT_APP_BA_ENDPOINT` are correct

### No Data Returned
- Check the AEM Content Fragments exist at the expected paths
- Verify the variation name matches what's in AEM
- Check browser console for detailed error messages

## License

Copyright 2022 Adobe
All Rights Reserved.

This project includes code licensed under Adobe license agreement terms.

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [AEM Headless Documentation](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/headless/introduction.html)
- [AEM GraphQL API](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/headless/graphql-api/content-fragments.html)
