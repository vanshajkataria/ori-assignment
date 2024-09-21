/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // For code syntax highlighting

const PackageDetails = () => {
  const { packageName } = useParams(); // useParams for app directory
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("readme"); // Tab switching
  const [copySuccess, setCopySuccess] = useState<string>("");

  useEffect(() => {
    if (packageName) {
      const fetchPackageDetails = async () => {
        try {
          const response = await fetch(
            `https://registry.npmjs.org/${packageName}`
          );
          const data = await response.json();
          setPackageDetails(data);
        } catch (error) {
          console.error("Error fetching package details:", error);
        }
      };

      fetchPackageDetails();
    }
  }, [packageName]);

  // Copy npm install command to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`npm i ${packageName}`);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000); // Clear success message after 2 seconds
  };

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto max-sm:px-4 py-12">
        {/* Header Section */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold">{packageDetails.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <p className="text-gray-600">
              {packageDetails["dist-tags"].latest}
            </p>
            <span>•</span>
            <p>Public</p>
            <span>•</span>
            <p>
              {/* Format this date properly */ packageDetails.time.modified}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="col-span-2 border-r pr-8">
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`px-4 py-2 ${
                  activeTab === "readme"
                    ? "border-b-2 border-black font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("readme")}
              >
                README
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "versions"
                    ? "border-b-2 border-black font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("versions")}
              >
                Versions
              </button>
              {/* Add more tabs if needed */}
            </div>

            {/* Tab Content */}
            {activeTab === "readme" && (
              <div className="prose">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {packageDetails.readme || "No README available."}
                </ReactMarkdown>
              </div>
            )}

            {activeTab === "versions" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Versions</h3>
                <ul>
                  {Object.keys(packageDetails.versions).map((version) => (
                    <li key={version}>{version}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1">
            {/* Install Command */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold">Install</h3>
              <div className="border-2 border-gray-300 rounded-lg px-4 py-3 flex items-center gap-4 relative">
                <svg viewBox="0 0 12.32 9.33" height={12} aria-hidden="true">
                  <g>
                    <line x1="7.6" y1="8.9" x2="7.6" y2="6.9"></line>
                    <rect width="1.9" height="1.9"></rect>
                    <rect x="1.9" y="1.9" width="1.9" height="1.9"></rect>
                    <rect x="3.7" y="3.7" width="1.9" height="1.9"></rect>
                    <rect x="1.9" y="5.6" width="1.9" height="1.9"></rect>
                    <rect y="7.5" width="1.9" height="1.9"></rect>
                  </g>
                </svg>
                <code>npm i {packageName}</code>
                <button
                  className="absolute right-[15px] border-none bg-none cursor-pointer"
                  onClick={copyToClipboard}
                  aria-label="Copy install command"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="copy"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-5 h-5"
                  >
                    <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941z"></path>
                  </svg>
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-600 mt-2">{copySuccess}</p>
              )}
            </div>

            {/* Other Sidebar Info (License, Popularity, etc.) */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold">Package Info</h3>
              <ul className="space-y-2">
                <li>License: {packageDetails.license || "N/A"}</li>
                <li>
                  Dependencies:{" "}
                  {Object.keys(packageDetails.dependencies || {}).length}
                </li>
                <li>
                  Last Published:{" "}
                  {/* format this */ packageDetails.time.modified}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
