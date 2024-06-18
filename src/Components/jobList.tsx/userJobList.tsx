import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from "../auth/useAuth";
import axios from "axios";

interface Job {
  id: number;
  title: string;
  jobType: string;
  postedDate: string;
  expiryDate: string;
}


const UserJobList: React.FC = () => {
  const { userId } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobSeekerId, setJobSeekerId] = useState<number | null>(null);

    // const dummyJobs: Job[] = [
      //   { id: 1, title: 'Laravel Developer', jobType: 'Full Time', postedDate: '12/06/2022', applicationDeadline: '12/06/2024' },
      //   { id: 2, title: 'React Developer', jobType: 'Part Time', postedDate: '15/06/2022', applicationDeadline: '12/06/2024' },
      //   { id: 3, title: 'Node.js Developer', jobType: 'Full Time', postedDate: '18/06/2022', applicationDeadline: '12/06/2024' },
      //   { id: 4, title: 'Frontend Developer', jobType: 'Contract', postedDate: '20/06/2022', applicationDeadline: '12/06/2024' },
      //   { id: 5, title: 'UI/UX Designer', jobType: 'Remote', postedDate: '22/06/2022', applicationDeadline: '12/06/2024' },
      //   { id: 6, title: 'Java Developer', jobType: 'Full Time', postedDate: '25/06/2022', applicationDeadline: '12/06/2024' },
      //   { id: 7, title: 'Python Developer', jobType: 'Part Time', postedDate: '28/06/2022', applicationDeadline: '12/06/2024' },
      //   { id: 8, title: 'Backend Engineer', jobType: 'Full Time', postedDate: '30/06/2022', applicationDeadline: '12/06/2024' },
      //   { id: 9, title: 'DevOps Engineer', jobType: 'Contract', postedDate: '02/07/2022', applicationDeadline: '12/06/2024' },
      //   { id: 10, title: 'Software Architect', jobType: 'Remote', postedDate: '05/07/2022', applicationDeadline: '12/06/2024' },
      //   { id: 11, title: 'Software Architect', jobType: 'Remote', postedDate: '05/07/2022', applicationDeadline: '12/06/2024' },
      //   { id: 12, title: 'Software Architect', jobType: 'Remote', postedDate: '05/07/2022', applicationDeadline: '12/06/2024' },
      //   { id: 13, title: 'Software Architect', jobType: 'Remote', postedDate: '05/07/2022', applicationDeadline: '12/06/2024' },
      //   { id: 14, title: 'Software Architect', jobType: 'Remote', postedDate: '05/07/2022', applicationDeadline: '12/06/2024' },
      //   { id: 15, title: 'Software Architect', jobType: 'Remote', postedDate: '05/07/2022', applicationDeadline: '12/06/2024' },
      // ];
      useEffect(() => {
        const fetchJobs = async () => {
          const jobSeeker = await axios.get(
            `http://localhost:8080/jobseekers/user/${userId}`);
            console.log(jobSeeker);
            const jobSeekerId=jobSeeker.data.data.jobSeekerId;
            setJobSeekerId(jobSeekerId);
            console.log(jobSeekerId);
          try {
            const response = await axios.get<Job[]>(`http://localhost:8080/api/user-job-listings/job-seeker/${jobSeekerId}/job-listings`);
            console.log(response);
            setJobs(response?.data?.data);
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
        };
    
        fetchJobs();
      }, [jobSeekerId]);
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
      

      



  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-zinc-800 rounded-lg min-h-screen">
      <h2 className="text-center text-primary text-3xl font-semibold mb-4 dark:text-white">
        My Jobs List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full  bg-white dark:bg-zinc-700 rounded-lg">
          <thead>
            <tr className="w-full   bg-primary dark:bg-zinc-600">
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Title
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Job Type
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Posted Date
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium  text-white dark:text-zinc-200">
                Application Deadline
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {jobs.map((job) => (
              <tr key={job.id} className="border-b dark:border-zinc-600">
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.title}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.jobType}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {formatPostDate(job.postedDate)}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {formatPostDate(job.expiryDate)}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserJobList;

