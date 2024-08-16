import React, { ChangeEvent, useEffect, useState } from 'react';
import JobCard from './Jobcard/JobCard';
import axios from 'axios';

interface Job {
  jobId: number;
  title: string;
  jobType: string;
  postedDate: string;
  location: string;
  salary: string;
  
workType: string;
  qualification: string;
  description: string;
  expiryDate: string;
  experience: string;
  company: {
    name: string;
    companyId:number;
  };
}

const Jobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jobData, setJobData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const username = 'user';
    const password = 'b586d350-3000-41f6-9217-fb7c7980cfe6';
    const fetchData = async () => {
      try {
        const response = await axios.get<Job[]>('http://localhost:8080/api/joblistings', {
          auth: {
            username,
            password,
          },
        });
        console.log(response)

        // Sort the job data by postedDate in descending order
        const sortedData = response.data.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        setJobData(sortedData);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchData();
  }, []);
console.log(jobData)
const isJobExpired = (expiryDate: string): boolean => {
  return new Date(expiryDate) < new Date();
};
  const filteredJobs = jobData
  .filter(job => !isJobExpired(job.expiryDate))
  .filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return postDate.toLocaleDateString('en-US', options);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 p-4">
      <div className="flex bg-zinc-200 text-white justify-center text-center py-6 rounded w-full mb-12">
        <input
          type="text"
          placeholder="Search by job title..."
          className="border text-black rounded-l-lg p-2 w-1/2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="bg-primary w-28 text-white p-2 rounded-r-lg">Search</button>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.jobId}
            id={job.jobId}
            title={job.title}
            job_Type={job.jobType}
            postedDate={formatPostDate(job.postedDate)}
            location={job.location}
            salary={job.salary}
            work_Type={job.workType}
            description={job.description}
            expiryDate={job.expiryDate}
            experience={job.experience}
            name={job.company.name}
            qualification={job.qualification}
            companyId={job.company.companyId} company={{
              name: '',
              companyId: 0
            }}          />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
