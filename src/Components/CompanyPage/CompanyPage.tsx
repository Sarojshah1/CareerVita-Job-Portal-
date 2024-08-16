import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
  expiryDate: string;
  experience: string;
  company: {
    name: string;
  };
}

interface Company {
  name: string;
  logoUrl: string;
  description: string;
  location: string;
  email: string;
  phone: string;
}


const CompanyPage: React.FC = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [jobData, setJobData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { companyId } = location.state as { companyId: string };
  console.log(companyId)

  useEffect(() => {
    // Simulate fetching data with dummy data
    setIsLoading(true);
    const fetchCompanyData = async () => {
        try {
          const companyResponse = await axios.get(`http://localhost:8080/api/companies/${companyId}`); 
          console.log(companyResponse)

          setCompany({...companyResponse.data.data,logoUrl: `https://robohash.org/${companyResponse.data.name}.png?timestamp=${new Date().getTime()}`});
  
          const jobResponse = await axios.get(`http://localhost:8080/api/joblistings/company/${companyId}`);
          console.log(jobResponse) 
          setJobData(jobResponse.data)
        } catch (error) {
          console.error('Error fetching company data:', error);
        }finally {
            setIsLoading(false);
          }
      };
    
      fetchCompanyData()
  }, [companyId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>Company data not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img src={company.logoUrl} alt={company.name} className="h-20 w-20 rounded-full mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{company.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{company.location}</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">About Us</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">{company.description}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Job Listings</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {jobData.map((job) => (
              <div key={job.jobId} className="bg-primary dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-white dark:text-gray-100">{job.title}</h3>
                <p className="text-white dark:text-gray-400">{job.job_Type} • {job.location}</p>
                <p className="text-white dark:text-gray-300 mt-2">{job.description}</p>
                <p className="text-white dark:text-gray-400 mt-2">Salary: Npr. {job.salary}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">Email: {company.user.email}</p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">Phone: +977 98-00000000</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
