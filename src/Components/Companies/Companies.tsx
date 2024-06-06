import React from 'react';
import CompanyCard from './Company_Card/CompanyCard';


const companiesData = [
    {
      companyName: 'FI SOFT',
      location: 'Kathmandu, Nepal',
      isOpenPosition: true,
      positionCount: 3,
      isFeatured: true,
    },
    {
      companyName: 'Tech Innovators',
      location: 'San Francisco, USA',
      isOpenPosition: false,
      positionCount: 0,
      isFeatured: false,
    },
    {
      companyName: 'Global Solutions Ltd.',
      location: 'London, UK',
      isOpenPosition: true,
      positionCount: 5,
      isFeatured: false,
    },
    {
      companyName: 'MegaTech Enterprises',
      location: 'Tokyo, Japan',
      isOpenPosition: true,
      positionCount: 2,
      isFeatured: true,
    },
    {
      companyName: 'Digital Nexus',
      location: 'Sydney, Australia',
      isOpenPosition: true,
      positionCount: 1,
      isFeatured: true,
    },
    {
      companyName: 'Innovate IT Solutions',
      location: 'Berlin, Germany',
      isOpenPosition: false,
      positionCount: 0,
      isFeatured: false,
    },
  ];
  

const Companies:React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-200 dark:bg-zinc-900 p-6">
            <h2 className="text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-6">Top Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companiesData.map((company, index) => (
          <CompanyCard
            key={index} // Ideally use a unique key from your data
            companyName={company.companyName}
            location={company.location}
            isOpenPosition={company.isOpenPosition}
            positionCount={company.positionCount}
            isFeatured={company.isFeatured}
          />
        ))}

        
        
        </div>
      </div>
    );
};

export default Companies;