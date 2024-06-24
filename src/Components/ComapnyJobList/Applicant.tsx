import React, { useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface JobSeeker {
    jobSeekerId: number;
    firstName:string;
    lastName:string;
    contactNumber:string;
  
}

const Applicant: React.FC = () => {
    const location = useLocation();
  const { userId } = useAuth();
  const [jobs, setJobs] = useState<JobSeeker[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeContent, setResumeContent] = useState<string | null>(null);
  const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {jobId}=location.state as {jobId:number}
  console.log(jobId)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
       

        const response = await axios.get<JobSeeker[]>(
          `http://localhost:8080/api/user-job-listings/job/${jobId}/job-seekers`
        );
        console.log(response);
        setJobs(response.data.data);
        console.log(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [userId, jobId]);



  const viewResume = async (jobSeekerId: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/jobseekers/${jobSeekerId}/resume`, { responseType: 'arraybuffer' });
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
  const selectApplicant = async (jobSeekerId: number) => {
    setIsLoading(true);
    try {
        // Update backend to mark applicant as selected for interview
        await axios.put(`http://localhost:8080/api/user-job-listings/${jobSeekerId}/selected?selected=true`);
        
        // Update UI state to reflect selection
        setSelectedApplicants((prevSelected) => {
            if (prevSelected.includes(jobSeekerId)) {
                return prevSelected.filter((id) => id !== jobSeekerId);
            } else {
                return [...prevSelected, jobSeekerId];
            }
        });
    } catch (error) {
        console.error('Error selecting applicant for interview:', error);
    }finally {
        setIsLoading(false); // Reset loading state
    }
};

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-zinc-800 rounded-lg min-h-screen">
      <h2 className="text-center text-primary text-3xl font-semibold mb-4 dark:text-white">
        My Jobs List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-zinc-700 rounded-lg">
          <thead>
            <tr className="w-full bg-primary dark:bg-zinc-600">
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                First Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
              Last Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Contact Number
              </th>
              
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Resume
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Select for Interview
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.jobSeekerId} className="border-b dark:border-zinc-600">
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.firstName}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.lastName}
                </td>
                
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.contactNumber}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  <div className="flex space-x-2">
                    <button onClick={() => viewResume(job.jobSeekerId)} className="items-center text-blue-500 hover:text-blue-700">
                      <FaEye />
                    </button>
                  </div>
                </td>

                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                                    <button
                                        onClick={() => selectApplicant(job.jobSeekerId)}
                                        className={`px-4 py-2 rounded-md ${
                                            isLoading
                                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                                : selectedApplicants.includes(job.jobSeekerId)
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-300 text-gray-800'
                                        }`}
                                        disabled={isLoading || selectedApplicants.includes(job.jobSeekerId)}
                                    >
                                        {isLoading ? 'Loading...' : selectedApplicants.includes(job.jobSeekerId) ? 'Selected' : 'Select'}
                                    </button>
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

export default Applicant;
