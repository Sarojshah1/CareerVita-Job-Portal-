import React from 'react';

const PostAJob: React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
             <div className="bg-primary text-white font-semibold text-2xl  text-center  py-6 rounded w-full">Create a Job</div>
        <main className="container mx-auto p-8 bg-white shadow-lg rounded mt-12 w-full max-w-4xl">

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="job-title" className="block text-sm font-medium text-zinc-700">Job Title</label>
                <input type="text" id="job-title" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="Title *"/>
              </div>
              <div>
                <label htmlFor="job-location" className="block text-sm font-medium text-zinc-700">Job Location</label>
                <input type="text" id="job-location" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="Location *"/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="job-type" className="block text-sm font-medium text-zinc-700">Job Type</label>
                <select id="job-type" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2">
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label htmlFor="work-type" className="block text-sm font-medium text-zinc-700">Work Type</label>
                <select id="work-type" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2">
                  <option>Remote</option>
                  <option>On-site</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-zinc-700">Salary</label>
                <input type="text" id="salary" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="Salary *"/>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-zinc-700">Experience</label>
                <input type="text" id="experience" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="Experience *"/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="application-deadline" className="block text-sm font-medium text-zinc-700">Application Deadline</label>
              <input type="text" id="application-deadline" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="Job application deadline *"/>
            </div>
              <div>
                <label htmlFor="Qualification" className="block text-sm font-medium text-zinc-700">Minimum Qualification</label>
                <input type="text" id="Qualification" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="Minimum Qualification *"/>
              </div>
            </div>
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-zinc-700">Job Description</label>
              <textarea id="job-description" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" rows={6} placeholder="Job Description *"/>
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