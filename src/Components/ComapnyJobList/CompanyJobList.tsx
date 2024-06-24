import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Job {
  jobId: number;
  title: string;
  postedDate: string;
  expiryDate: string;
  salary: number;
  location: string;
  workType: string;
  jobType: string;
  experience: string;
  qualification: string;
}

const CompanyJobList: React.FC = () => {
  const { userId } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const companyResponse = await axios.get(
          `http://localhost:8080/api/companies/company/${userId}`
        );
        const companyId = companyResponse.data.data.companyId;

        const response = await axios.get<Job[]>(
          `http://localhost:8080/api/joblistings/company/${companyId}`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [userId]);

  const formatPostDate = (dateString: string): string => {
    const today = new Date();
    const postDate = new Date(dateString);

    if (postDate.toDateString() === today.toDateString()) {
      return "Today";
    } else {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (postDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        return postDate.toLocaleDateString("en-US", options);
      }
    }
  };
  const handleRowClick = (jobId: number) => {
    navigate(`/company/applicants`,{state:{jobId}});
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-zinc-800 rounded-lg min-h-screen">
      <h2 className="text-center text-primary text-3xl font-semibold mb-4 dark:text-white">
        Company Jobs List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-zinc-700 rounded-lg">
          <thead>
            <tr className="w-full bg-primary dark:bg-zinc-600">
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Title
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Job Type
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Salary
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Location
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Work Type
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Experience
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Qualification
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Posted Date
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-white dark:text-zinc-200">
                Application Deadline
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.jobId}
                className="border-b dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer"
                onClick={() => handleRowClick(job.jobId)}
              >
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.title}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.jobType}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.salary}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.location}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.workType}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.experience}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.qualification}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {formatPostDate(job.postedDate)}
                </td>
                <td className="py-2 px-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {formatPostDate(job.expiryDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyJobList;
