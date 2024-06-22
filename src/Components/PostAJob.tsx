import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from './auth/useAuth';

const PostAJob: React.FC = () => {
  const { userId } = useAuth();
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('Full Time');
  const [workType, setWorkType] = useState('Remote');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState<Date | null>(null); // State for date
  const [qualification, setQualification] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  // const companyId = localStorage.getItem('companyId');
  // const parsedCompanyId = companyId ? parseInt(companyId, 10) : undefined;
  console.log(userId);
  const postedDate = new Date().toISOString();
  const initialState = {
    jobTitle: '',
    jobLocation: '',
    jobType: 'Full Time',
    workType: 'Remote',
    salary: '',
    experience: '',
    applicationDeadline: null,
    qualification: '',
    jobDescription: ''
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const company = await axios.get(
        `http://localhost:8080/api/companies/company/${userId}`);
        console.log(company);
        const companyid=company.data.data.companyId;
        console.log(companyid);
      const response = await axios.post('http://localhost:8080/api/joblistings', {
        title: jobTitle,
        location: jobLocation,
        job_Type: jobType,
        work_Type: workType,
        salary: parseInt(salary), 
        experience,
        postedDate:postedDate,
        expiryDate: applicationDeadline, 
        qualification,
        description: jobDescription,
        companyId: companyid,
      });

      console.log('Job posted successfully:', response.data);
      initialState("","","","","","","","","","","","","","","","");


    } catch (error) {
      console.error('Error posting job:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
      <div className="bg-primary text-white font-semibold text-2xl text-center py-6 rounded w-full">Create a Job</div>
      <main className="container mx-auto p-8 bg-white shadow-lg rounded mt-12 w-full max-w-4xl">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="job-title" className="block text-sm font-medium text-zinc-700">Job Title</label>
              <input
                type="text"
                id="job-title"
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="Title *"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="job-location" className="block text-sm font-medium text-zinc-700">Job Location</label>
              <input
                type="text"
                id="job-location"
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="Location *"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="job-type" className="block text-sm font-medium text-zinc-700">Job Type</label>
              <select
                id="job-type"
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label htmlFor="work-type" className="block text-sm font-medium text-zinc-700">Work Type</label>
              <select
                id="work-type"
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-zinc-700">Salary</label>
              <input
                type="text"
                id="salary"
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="Salary *"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-zinc-700">Experience</label>
              <input
                type="text"
                id="experience"
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="Experience *"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="application-deadline" className="block text-sm font-medium text-zinc-700">Application Deadline</label>
              <DatePicker
                id="application-deadline"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                selected={applicationDeadline}
                onChange={(date: Date) => setApplicationDeadline(date)}
                placeholderText="Select application deadline"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div>
              <label htmlFor="Qualification" className="block text-sm font-medium text-zinc-700">Minimum Qualification</label>
              <input
                type="text"
                id="Qualification"
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="Minimum Qualification *"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="job-description" className="block text-sm font-medium text-zinc-700">Job Description</label>
            <textarea
              id="job-description"
              className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
              rows={6}
              placeholder="Job Description *"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </div>
          <div className="text-end">
            <button type="submit" className="bg-primary text-white px-8 py-2 rounded">Post Job</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostAJob;
