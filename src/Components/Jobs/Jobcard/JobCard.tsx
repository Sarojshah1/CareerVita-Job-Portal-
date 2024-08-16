import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { toast } from 'react-toastify';

interface JobCardProps {
  id: number;
  title: string;
  job_Type: string;
  postedDate: string;
  location: string;
  salary: string;
  work_Type: string;
  description: string;
  expiryDate: string;
  qualification: string;
  experience: string;
  name: string;
  companyId:number;
  company: {
    name: string;
    companyId:number;
  };
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  job_Type,
  postedDate,
  location,
  salary,
  work_Type,
  description,
  expiryDate,
  experience,
  name,
  qualification,
  companyId,
}) => {
  const navigate = useNavigate();
  const [readMore, setReadMore] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const { userId } = useAuth();
  const [jobSeekerId, setJobSeekerId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userType = localStorage.getItem('userType');
  console.log(userType)
  // console.log(company.companyId)
  useEffect(() => {
    const checkAppliedStatus = async () => {
      try {
        const jobSeeker = await axios.get(`http://localhost:8080/api/jobseekers/user/${userId}`);
        console.log(jobSeeker)
        const jobSeekerId = jobSeeker.data.data.jobSeekerId;
        setJobSeekerId(jobSeekerId);
        if (jobSeekerId) {
          const response = await axios.get(`http://localhost:8080/api/user-job-listings/check-applied`, {
            params: {
              jobSeekerId,
              jobId: id,
            },
          });
          console.log(response.data)
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
      return text.slice(0, 30) + '...';
    }
    return text;
  };

  const handleViewDetails = () => {
    navigate(`/details/${id}`, {
      state: { id,title, job_Type, postedDate, location, salary, work_Type, description, expiryDate, experience, name, qualification,companyId },
    });
  };

  const handleApply = async () => {
    setIsLoading(true);
    if (!userId) {
      // User is not logged in, navigate to login page
      navigate('/login');
      // Show toast message indicating login requirement
      toast.warning('Please login first to apply.');
      return;
    }
    if (userType !== '1') {
      // User is not a job seeker
      toast.warning('You need to create a Job Seeker account to apply for a job.');
      setIsLoading(false);
      return;
    }

    try {
      // const jobSeeker = await axios.get(`http://localhost:8080/jobseekers/user/${userId}`);
      // const jobSeekerId = jobSeeker.data.data.jobSeekerId;
      // setJobSeekerId(jobSeekerId);
      console.log(jobSeekerId);

      await axios.post(`http://localhost:8080/api/user-job-listings`, {
        jobSeekerId: jobSeekerId,
        jobId: id,
      });
      setIsApplied(true);
      toast.success('Successfully applied for the job.');
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('Failed to apply for the job.');
    }finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="border size-90 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow-md hover:shadow-2xl hover:translate-y-2 hover:transition delay-100 hover:bg-white hover:shadow-blue-500">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{job_Type} • {location} • {work_Type}</p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        {readMore ? description : truncateDescription(description)}
        {description.length > 30 && (
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
        <button onClick={handleViewDetails} className="px-4 py-2 bg-white hover:bg-zinc-200 text-zinc-900 dark:text-zinc-100 rounded-lg">
          View details
        </button>
        <button onClick={handleApply} className="px-4 py-2 bg-primary text-white rounded-lg" disabled={isApplied}>
        {isApplied ? 'Applied' : isLoading ? 'Loading...' : 'Apply Now'}
        
        </button>
      </div>
    </div>
  );
};

export default JobCard;
