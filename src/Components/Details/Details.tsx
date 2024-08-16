import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';



const Details: React.FC = () => {

    const location = useLocation();
    const job = location.state;
    console.log(job);
    const { userId } = useAuth(); // Assume this hook gives you the userId if logged in
    const [isLoading, setIsLoading] = useState(false);
    const [jobSeekerId, setJobSeekerId] = useState<number | null>(null);
    const navigate=useNavigate()
    const [isApplied, setIsApplied] = useState(false);
    console.log(job.companyId)

    useEffect(() => {
      // console.log(job)
      if (userId) {
        const fetchJobSeekerId = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/jobseekers/user/${userId}`);
            setJobSeekerId(response.data.data.jobSeekerId);
           
              const responseapplied = await axios.get(`http://localhost:8080/api/user-job-listings/check-applied`, {
                params: {
                  jobSeekerId,
                  jobId: job.id,
                },
              });
              console.log(responseapplied)
              setIsApplied(responseapplied.data);
            
          } catch (error) {
            console.error('Error fetching job seeker ID:', error);
          }
        };
  
        fetchJobSeekerId();
      }
    }, [userId]);
    if (!job) {
      return <div>Job details not found</div>;
    }
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

    const applyForJob = async () => {
      if (!userId) {
        // User is not logged in, navigate to login page
        navigate('/login');
        // Show toast message indicating login requirement
        toast.warning('Please login first to apply.');
        return;
      }
  
      setIsLoading(true);
      try {
        await axios.post(`http://localhost:8080/api/user-job-listings`, {
          jobSeekerId,
          jobId: job.id,
        });
        toast.success('Successfully applied for the job.');
      } catch (error) {
        console.error('Error applying for job:', error);
        toast.error('Failed to apply for the job.');
      } finally {
        setIsLoading(false);
      }
    };
    const handleViewCompany = () => {
      navigate(`/view_company`, {
        state: { companyId: job.companyId },
      });
    };

    return (
        <div className="bg-zinc-100 dark:bg-zinc-900 p-4 md:p-8 rounded-lg">
          <div className="bg-primary text-white   text-center text-2xl font-semibold   py-6 rounded w-full">{job.title} ({job.work_Type}) – {job.name}</div>
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-b-lg shadow-lg">
          <div className="flex justify-center space-x-4 mb-4">
            <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 py-2 px-4 rounded hover:shadow-2xl hover:shadow-primary" onClick={handleViewCompany}>View Company</button>
            <button className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded hover:shadow-2xl hover:shadow-primary" onClick={applyForJob}
            disabled={isLoading}> {isApplied ? 'Applied' : isLoading ? 'Loading...' : 'Apply This Job'}</button>
          </div>
          <div className="mb-4">
            <p><strong>Minimum Qualification:</strong> {job.qualification}</p>
            {/* <p><strong>Work Type:</strong> {job.workType}</p> */}
            <p><strong>Experience Length:</strong> {job.experience}</p>
            <p><strong>Job Type:</strong> {job.job_Type}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Application Deadline:</strong>{formatPostDate(job.expiryDate)}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Job description</h3>
           <p>{job.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Laravel Developer Requirements:</h3>
            <ul className="list-disc list-inside">
              <li>A degree in programming, computer science, or a related field.</li>
              <li>Experience working with new Technologies, performing unit testing, and managing APIs such as REST.</li>
              <li>A solid understanding of application design.</li>
              <li>Knowledge of undefinedbase design and querying using SQL.</li>
              <li>Proficiency in HTML and JavaScript. Experience developing in Vue is considered a plus.</li>
              <li>Practical experience using the MVC architecture.</li>
              <li>The ability to work on LAMP development environment.</li>
              <li>Problem-solving skills and critical mindset.</li>
              <li>Great communication skills.</li>
              <li>The desire and ability to learn.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Responsibilities:</h3>
            <ul className="list-disc list-inside">
              <li>Discussing project aims with the client and development team.</li>
              <li>Designing and building web applications using MERN.</li>
              <li>Troubleshooting issues in the implementation and debug builds.</li>
              <li>Working with front-end and back-end developers on projects.</li>
              <li>Testing functionality for users and the backend.</li>
              <li>Ensuring that integrations run smoothly.</li>
              <li>Scaling projects based on client feedback.</li>
              <li>Recording and reporting on work done in Laravel.</li>
              <li>Maintaining web-based applications.</li>
              <li>Presenting work in meetings with clients and management.</li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Details;