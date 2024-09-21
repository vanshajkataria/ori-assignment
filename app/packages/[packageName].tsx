/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// You can optionally fetch more package details from npm registry
const PackageDetails: React.FC = () => {
  const router = useRouter();
  const { packageName } = router.query;

  const [packageDetails, setPackageDetails] = useState<any>(null);

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
          console.error('Error fetching package details:', error);
        }
      };

      fetchPackageDetails();
    }
  }, [packageName]);

  return (
    <div className="container mx-auto p-4">
      {packageDetails ? (
        <div>
          <h1 className="text-3xl font-bold">{packageDetails.name}</h1>
          <p>{packageDetails.description}</p>
          <p>
            <strong>Version:</strong> {packageDetails['dist-tags'].latest}
          </p>
          <p>
            <strong>Homepage:</strong>{' '}
            <a href={packageDetails.homepage} target="_blank" rel="noopener noreferrer">
              {packageDetails.homepage}
            </a>
          </p>
          {/* Display other package information */}
        </div>
      ) : (
        <p>Loading package details...</p>
      )}
    </div>
  );
};

export default PackageDetails;
