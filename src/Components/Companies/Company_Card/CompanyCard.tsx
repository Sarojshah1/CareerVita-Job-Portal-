import React from 'react';

interface CompanyCardProps {
    companyName: string;
    location: string;
    isOpenPosition: boolean;
    positionCount: number;
    isFeatured?: boolean; 
  }

const CompanyCard:React.FC<CompanyCardProps> = ({companyName, location, isOpenPosition, positionCount, isFeatured = false,}) => {
    return (
        <div className="bg-white hover:shadow-primary dark:bg-zinc-800 p-4 rounded-lg shadow-md hover:shadow-2xl hover:translate-y-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{companyName}</h3>
          {isFeatured && (
          <span className="bg-red-100 text-red-500 text-xs font-medium px-2 py-1 rounded">Featured</span>
        )}
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4"><i className="fas fa-map-marker-alt"></i> {location}</p>
        <button className="bg-primary  text-white px-4 py-2 rounded-lg w-full">{isOpenPosition ? `Open Positions (${positionCount})` : 'No Open Positions'}</button>
      </div>
    );
};

export default CompanyCard;