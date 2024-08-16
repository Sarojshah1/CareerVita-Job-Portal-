import React, { useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { useAuth } from "../auth/useAuth";
import Modal from 'react-modal';
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
  // const [jobSeeker, setJobSeeker] = useState<JobSeeker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeContent, setResumeContent] = useState<string | null>(null);
      useEffect(() => {
        const fetchJobs = async () => {
          const jobSeeker = await axios.get(
            `http://localhost:8080/api/jobseekers/user/${userId}`);
            console.log(jobSeeker);
            const jobSeekerId=jobSeeker.data.data.jobSeekerId;
            setJobSeekerId(jobSeekerId);
            // setJobSeeker(jobSeeker.data.data)
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
            const options:Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            return postDate.toLocaleDateString('en-US', options);
          }
        }
      };

      const viewResume = async (jobSeekerId: number) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/jobseekers/${jobSeekerId}/resume`, { responseType: 'arraybuffer' });
          const file = new Blob([response.data], { type: response.headers['content-type'] });
          const fileURL = URL.createObjectURL(file);
          setResumeContent(fileURL);
          setIsModalOpen(true);
        } catch (error) {
          console.error('Error fetching resume:', error);
        }
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setResumeContent(null);
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
                Resume
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
                    <button onClick={() => jobSeekerId && viewResume(jobSeekerId)} className=" items-center text-blue-500 hover:text-blue-700">
                      <FaEye />
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Resume Viewer"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        {resumeContent && (
          <iframe src={resumeContent} className="w-full h-full" title="Resume Viewer" />
        )}
        <button onClick={closeModal} className="absolute top-0 right-0 p-2 text-white">Close</button>
      </Modal>
    </div>
  );
};

export default UserJobList;

