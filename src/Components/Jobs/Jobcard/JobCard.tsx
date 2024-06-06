import React from 'react';
import { useNavigate } from 'react-router-dom';

interface jobcomponent{
    id: number;
  title: string;
  job_Type: string;
  postedDate: string;
  location: string;
  salary: string;
  work_Type: string;
  description: string;
  expiryDate:string;
  experience:string;


}

const JobCard:React.FC<jobcomponent> = ({id,title,work_Type,job_Type,description,salary,postedDate,location,expiryDate,experience}) => {
    const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/details/${id}`, { state: { title, job_Type, postedDate, location, salary, work_Type, description,expiryDate,experience } });
  };
    return (
        <div className="border size-90 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow-md hover:shadow-2xl hover:translate-y-2 hover:transition delay-100 hover:bg-white hover:shadow-blue-500 hover:">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{job_Type}• {location} • {work_Type}</p>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          {description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{salary}</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{postedDate}</span>
          </div>
          <div className="mt-4 flex justify-between">
            <button onClick={handleViewDetails} className="px-4 py-2 bg-white hover:bg-zinc-200  text-zinc-900 dark:text-zinc-100 rounded-lg">
              View details
            </button>
            <button  className="px-4 py-2 bg-primary text-white rounded-lg">Apply Now</button>
          </div>
        </div>
    );
};

export default JobCard;