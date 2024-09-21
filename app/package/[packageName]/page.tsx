/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // For code syntax highlighting
import Link from "next/link";

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
    return <div className="bg-white p-12">Loading...</div>;
  }

  return (
    <div className="bg-white text-black">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="col-span-1 md:col-span-2 md:border-r md:pr-8">
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
                    className="w-4 h-4"
                  >
                    <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
                  </svg>
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-600 mt-2">{copySuccess}</p>
              )}
            </div>

            {/* Other Sidebar Info (License, Popularity, etc.) */}
            <div className="mb-8">
              <div className="border-b pb-4">
                <h6 className="pb-2 font-medium text-gray-500">Repository</h6>
                <Link
                  href={packageDetails.repository.url.replace(
                    /^git\+|^git:\/\//,
                    ""
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <title>Git</title>
                      <g fill="#0A0B09" fill-rule="nonzero">
                        <path
                          d="M15.6981994,7.28744895 L8.71251571,0.3018063 C8.3102891,-0.1006021 7.65784619,-0.1006021 7.25527133,0.3018063 L5.80464367,1.75263572 L7.64478689,3.59281398 C8.07243561,3.44828825 8.56276901,3.5452772 8.90352982,3.88604451 C9.24638012,4.22907547 9.34249661,4.72359725 9.19431703,5.15282127 L10.9679448,6.92630874 C11.3971607,6.77830046 11.8918472,6.8738964 12.2346975,7.21727561 C12.7135387,7.69595181 12.7135387,8.47203759 12.2346975,8.95106204 C11.755508,9.43026062 10.9796112,9.43026062 10.5002476,8.95106204 C10.140159,8.59061834 10.0510075,8.06127108 10.2336636,7.61759448 L8.57948492,5.9635584 L8.57948492,10.3160467 C8.69614805,10.3738569 8.80636859,10.4509954 8.90352982,10.5479843 C9.38237103,11.0268347 9.38237103,11.8027463 8.90352982,12.2822931 C8.42468862,12.7609693 7.64826937,12.7609693 7.16977641,12.2822931 C6.69093521,11.8027463 6.69093521,11.0268347 7.16977641,10.5479843 C7.28818078,10.4297518 7.42521643,10.3402504 7.57148065,10.2803505 L7.57148065,5.88746473 C7.42521643,5.82773904 7.28852903,5.73893407 7.16977641,5.62000506 C6.80707597,5.25747183 6.71983981,4.72499027 6.90597844,4.27957241 L5.09195384,2.465165 L0.301800552,7.25506126 C-0.100600184,7.65781791 -0.100600184,8.31027324 0.301800552,8.71268164 L7.28783254,15.6983243 C7.69005915,16.1005586 8.34232793,16.1005586 8.74507691,15.6983243 L15.6981994,8.74506934 C16.1006002,8.34266094 16.1006002,7.68968322 15.6981994,7.28744895"
                          id="Path"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <span className="font-medium">
                    {packageDetails.repository.url.replace(
                      /^git\+|^git:\/\//,
                      ""
                    )}
                  </span>
                </Link>
              </div>
              <div className="border-b py-4">
                <h6 className="pb-2 font-medium text-gray-500">Homepage</h6>
                <Link
                  href={packageDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="link"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
                      ></path>
                    </svg>
                  </span>
                  <span className="font-medium">{packageDetails.homepage}</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6 border-b py-4">
                <div>
                  <h6 className="pb-2 font-medium text-gray-500">Version</h6>
                  <div>
                    <span className="font-medium">
                      {packageDetails["dist-tags"].latest}
                    </span>
                  </div>
                </div>
                <div>
                  <h6 className="pb-2 font-medium text-gray-500">License</h6>
                  <div>
                    <span className="font-medium">
                      {packageDetails.license}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
