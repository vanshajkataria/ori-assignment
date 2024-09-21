/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Package {
  name: string;
  description: string;
}

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch search results from the npm registry API
  const fetchSearchResults = async (query: string) => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://registry.npmjs.org/-/v1/search?text=${query}&size=10`
      );
      const data = await response.json();
      setSearchResults(
        data.objects.map((pkg: any) => ({
          name: pkg.package.name,
          description: pkg.package.description,
        }))
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search to avoid fetching too often
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 2) {
        fetchSearchResults(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300); // Delay before search triggers (300ms)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <>
      <div className="h-2.5 w-full bg-gradient-to-r from-[#fb8817] from-10% via-[#c12127] via-80% to-[#e02aff] "></div>
      <header className="pt-4 bg-white text-black">
        <div className="container mx-auto max-sm:px-4 pb-4">
          <div className="flex justify-start items-center gap-4">
            <span className="hidden md:block text-xl">❤</span>
            <nav>
              <ul className="flex gap-4 items-center">
                <li>Pro</li>
                <li>Teams</li>
                <li>Pricing</li>
                <li>Documentation</li>
              </ul>
            </nav>
          </div>
        </div>
        <hr />
        <div className="container mx-auto max-sm:px-4 py-4">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div>
              <a href="/">
                <svg viewBox="0 0 780 250" height={24} aria-hidden="true">
                  <path
                    fill="#231F20"
                    d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="flex flex-grow bg-[#f2f2f2] order-3 md:order-2 relative">
              <form
                action=""
                className="flex justify-between items-center w-full"
              >
                <div className="flex justify-between items-center gap-4 w-full focus-within:border focus-within:border-black p-4">
                  <span className="">
                    <svg
                      width="15px"
                      height="15px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 18 18"
                      aria-hidden="true"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g stroke="#777777" strokeWidth="1.3">
                          <g>
                            <path d="M13.4044,7.0274 C13.4044,10.5494 10.5494,13.4044 7.0274,13.4044 C3.5054,13.4044 0.6504,10.5494 0.6504,7.0274 C0.6504,3.5054 3.5054,0.6504 7.0274,0.6504 C10.5494,0.6504 13.4044,3.5054 13.4044,7.0274 Z"></path>
                            <path d="M11.4913,11.4913 L17.8683,17.8683"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <input
                    type="search"
                    name="search_packages"
                    id="search"
                    placeholder="Search Packages"
                    className="bg-transparent w-full outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="border border-black px-6 py-4 bg-black text-white"
                >
                  Search
                </button>
              </form>
              {loading && <div className="absolute top-full bg-white w-full p-2">Loading...</div>}
              {!loading && searchResults.length > 0 && (
                <ul className="absolute top-full bg-white w-full p-2 max-h-64 overflow-y-auto border border-gray-300">
                  {searchResults.map((pkg, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100">
                      <Link href={`/package/${pkg.name}`}>
                          <strong>{pkg.name}</strong> - {pkg.description}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-4 order-2 md:order-3">
              <button
                type="button"
                className="px-6 py-4 border border-[#cccccc]"
              >
                Sign Up
              </button>
              <button type="button">Sign In</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
