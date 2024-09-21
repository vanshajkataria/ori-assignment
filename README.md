# Project Documentation: NPMJS Clone(ORI Assignment)

### Table of Contents

1. Project Overview
2. Tech Stack
3. Installation
4. Folder Structure
5. Key Features
6. API Usage
7. Components
8. Styling with Tailwind
9. Routing
10. Running the Application
##

### 1. Project Overview

This project is a clone of npmjs.com where users can search for npm packages, view their details, and read their README files. The application utilizes the npm registry API to fetch real-time data of npm packages and uses Next.js for server-side rendering and routing, along with Tailwind CSS for responsive UI design.

### 2. Tech Stack

- Next.js: For server-side rendering and client-side navigation.
- Tailwind CSS: For utility-first CSS styling.
- npm Registry API: To fetch data related to npm packages.
- React-Markdown: To render README files as Markdown.
- rehype-highlight: For syntax highlighting in Markdown code blocks.

### 3. Installation

1. Clone the repository:
```
git clone https://github.com/your-username/npmjs-clone.git
```
2. Navigate to the project directory:
```
cd npmjs-clone
```
3. Install dependencies:
```
npm install
```
4. Run the development server:
```
npm run dev
```
5. Open the project in your browser:
```
http://localhost:3000
```

### 4. Folder Structure
```
npmjs-clone/
│
├── app/                    # Main routing files
│   ├── index.tsx           # Contains Home Page Info
│   ├── layout.tsx          # Containe the Metadata along with Navbar and Footer
│   ├── globals.css         # Global and Tailwind CSS
│   ├── packages/           # Dynamic route for package details
│       ├── [packageName]/  # Individual package details
│           └── page.tsx    # Page for displaying npm package details
│
├── components/             # Reusable components
│   ├── navbar.tsx          # Navbar Component
│   ├── footer.tsx          # Footer Component
│   ├── homeSections        # Contains section of homepage
│       ├── main.tsx        # Main section of homepage
│       ├── info.tsx        # Info section of homepage
│   └── PackageDetails.tsx  # Package details page component
│
└── package.json            # Dependencies and scripts
```

### 5. Key Features

### Search Bar
- Provides search functionality where users can input a package name.
- Fetches top 10 results from the npm registry API and displays them as a dropdown list.
### Package Details
- Each package has its own page displaying detailed information like:
  - Name, version, and latest tag.
  - Installation instructions.
  - Rendered README from the npm package.
### Routing
- The project uses dynamic routing in Next.js to handle URL paths like ```/packages/[packageName]```.
- For example, ```/packages/react``` will display the details of the ```react``` npm package.
### 6. API Usage
The npm registry API is used to fetch package details. Below are the primary API calls used in the project.

### Search Endpoint
```
const searchPackages = async (query: string) => {
  const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${query}&size=10`);
  const data = await response.json();
  return data.objects.map((pkg: any) => pkg.package);
};
```
### Package Details Endpoint
```
const fetchPackageDetails = async (packageName: string) => {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  const data = await response.json();
  return data;
};
```
7. Components
```
SearchBar.tsx
```
A functional component for the search bar that dynamically fetches and shows search results from the npm registry API as the user types.

```
import { useState, useEffect } from "react";
import Link from "next/link";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchPackages = async (searchTerm: string) => {
    const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=10`);
    const data = await res.json();
    setResults(data.objects);
  };

  useEffect(() => {
    if (query.length > 2) {
      searchPackages(query);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search npm packages..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul>
          {results.map((pkg) => (
            <li key={pkg.package.name}>
              <Link href={`/packages/${pkg.package.name}`}>{pkg.package.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
```
```
PackageDetails.tsx
```
This component displays the details of the selected package using data fetched from the npm registry API.

```
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const PackageDetails = () => {
  const { packageName } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://registry.npmjs.org/${packageName}`);
      const data = await res.json();
      setPackageDetails(data);
    };
    fetchDetails();
  }, [packageName]);

  if (!packageDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{packageDetails.name}</h1>
      <div>Version: {packageDetails["dist-tags"].latest}</div>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {packageDetails.readme || "No README available."}
      </ReactMarkdown>
    </div>
  );
};

export default PackageDetails;
```
### 8. Styling with Tailwind

Tailwind CSS is used to create responsive and customizable components. For example, you can create a container with padding like this:

```
<div className="container mx-auto max-sm:px-4 py-12">
  {/* Content here */}
</div>
```
### 9. Routing

Next.js dynamic routing handles package URLs. The [packageName] dynamic route captures the package name from the URL:

- URL: ```/packages/react```
- Path: ```/packages/[packageName]/page.tsx```
```
import { useParams } from "next/navigation";

const { packageName } = useParams(); // Fetch package name from URL
```
### 10. Running the Application

To run the application in development mode:

1. Clone the repo.
2. Install dependencies using npm install.
3. Run npm run dev.
4. Open http://localhost:3000 in your browser to see the app.
