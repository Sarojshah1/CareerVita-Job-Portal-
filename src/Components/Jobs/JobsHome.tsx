import React from 'react';
import JobCard from "./Jobcard/JobCard";

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
interface Job {
  jobId: number;
  title: string;
  job_Type: string;
  postedDate: string;
  location: string;
  salary: string;
  work_Type: string;
  qualification: string;
  description: string;
  expiryDate:string;
  experience:string;
  company: {
    name: string;
  };
}
// const jobData = Array.from({ length: 6 }, (_, index) => ({
//   id: index + 1,
//   title: `Job Title ${index + 1}`,
//   jobtype: 'Fulltime',
//   postday: 'Today',
//   location: 'Kathmandu',
//   salary: `Npr.${40000 + index * 1000}`,
//   worktype: 'Remote',
//   description: `Description for job ${index + 1}: We are looking for a developer that will be the liaison between the company and its current and potential customers. The successful candidate...`,
// }));

const JobsHome: React.FC = () => {
  const navigate = useNavigate();
  const username = 'user';
  const password = 'b586d350-3000-41f6-9217-fb7c7980cfe6';
  const getApiCall=useQuery(
    {
      
      queryKey:["job_GET_ALL_API"],
      queryFn: () => axios.get<Job[]>('http://localhost:8080/api/joblistings',{
        auth: {
          username,
          password
        }}).then((response) => response.data).catch(error => {
        console.error('Error fetching job listings:', error);
        throw error;
      }),
    }
  )
  const jobsToShow = getApiCall.data ? getApiCall.data.slice(0, 6) : [];
  const formatPostDate = (dateString: string): string => {
    const today = new Date();
    const postDate = new Date(dateString);

    if (postDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (postDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        // Return actual date if not today or yesterday
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return postDate.toLocaleDateString('en-US', options);
      }
    }
  };

  const handleclick = () => {
    navigate('/jobs');
  };
    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 p-4">
        <h1 className="text-center text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">All Popular Listed Jobs</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobsToShow.map((job) => (
          <JobCard
            key={job.jobId}
            id={job.jobId}
            title={job.title}
            job_Type={job.job_Type}
            postedDate={formatPostDate(job.postedDate)}
            location={job.location}
            salary={job.salary}
            work_Type={job.work_Type}
            description={job.description}
            experience={job.experience}
            expiryDate={job.expiryDate}
            name={job.company.name}
            qualification={job.qualification}
          />
        ))}
         

          
        </div>
        <div className="mt-6 text-center">
          <button onClick={handleclick} className="px-6 py-2 bg-primary hover:bg-blue-500 text-white rounded-lg">Explore More Jobs</button>
        </div>
      </div>
    );
};

export default JobsHome;