import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

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
  qualification: string;
  experience:string;
  name: string;
  


}

const JobCard:React.FC<jobcomponent> = ({id,title,work_Type,job_Type,description,salary,postedDate,location,expiryDate,experience,name,qualification}) => {
    const navigate = useNavigate();
    const [readMore, setReadMore] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const { userId } = useAuth();
    const [jobSeekerId, setJobSeekerId] = useState<number | null>(null);
    

    useEffect(() => {
      const checkAppliedStatus = async () => {
        try {
          if (jobSeekerId) {
            const response = await axios.get(`http://localhost:8080/api/user-job-listings/check-applied`, {
              params: {
                jobSeekerId,
                jobId: id,
              },
            });
            setIsApplied(response.data); // Update isApplied based on response
          }
        } catch (error) {
          console.error('Error checking applied status:', error);
        }
      };
  
      checkAppliedStatus();
    }, [id, jobSeekerId]);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const truncateDescription = (text: string): string => {
    if (text.length > 30) {
      return text.slice(0,30) + '...';
    }
    return text;
  };

  const handleViewDetails = () => {
    navigate(`/details/${id}`, { state: { title, job_Type, postedDate, location, salary, work_Type, description,expiryDate,experience,name,qualification } });
  };
  const handleApply = async () => {
    const jobSeeker = await axios.get(
      `http://localhost:8080/jobseekers/user/${userId}`);
      console.log(jobSeeker);
      const jobSeekerid=jobSeeker.data.data.jobSeekerId;
      setJobSeekerId(jobSeeker.data.data.jobSeekerId);
      console.log(jobSeekerid);
      console.log(id);
    try {

      await axios.post(`http://localhost:8080/api/user-job-listings`, {
        jobSeekerId: jobSeekerid,
        jobId: id,
        
      });
      setIsApplied(true);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  
    return (
        <div className="border size-90 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow-md hover:shadow-2xl hover:translate-y-2 hover:transition delay-100 hover:bg-white hover:shadow-blue-500 hover:">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{job_Type}• {location} • {work_Type}</p>
          <p className="mt-2 text-gray-700">
        {readMore ? description : truncateDescription(description)}
        {!readMore && description.length > 30 && (
          <button onClick={toggleReadMore} className="text-primary hover:underline focus:outline-none ml-2">
          {readMore ? 'Read less' : 'Read more'}
        </button>
        )}
      </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{salary}</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{postedDate}</span>
          </div>
          <div className="mt-4 flex justify-between">
            <button onClick={handleViewDetails} className="px-4 py-2 bg-white hover:bg-zinc-200  text-zinc-900 dark:text-zinc-100 rounded-lg">
              View details
            </button>
            <button onClick={handleApply}  className="px-4 py-2 bg-primary text-white rounded-lg" disabled={isApplied}> {isApplied ? 'Applied' : 'Apply Now'}</button>
          </div>
        </div>
    );
};

export default JobCard;