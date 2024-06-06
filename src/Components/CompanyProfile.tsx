import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';



type CompanyFormValues = {
  name: string;
  industry: string;
  location: string;
  description: string;
  userId:string;
};

const CompanyProfile:React.FC = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const { userId } = location.state as { userId: string };
    const { register, handleSubmit, formState: { errors } } = useForm<CompanyFormValues>();
    const apiCall = useMutation({
      mutationKey: ["SAVE_COMPANY_DATA"],
      mutationFn: (formData: CompanyFormValues) => {
        // try {
         return axios.post("http://localhost:8080/api/companies", formData);
          // return response.data;
        // } catch (error) {
        //   console.error('Error submitting company data:', error);
        //   throw error; 
        // }
      },
    });
    const onSubmit: SubmitHandler<CompanyFormValues> = (values) => {
      values.userId=userId;
      // const formData = new FormData();
      // formData.append('userId', userId);
      // formData.append('name', data.name);
      // formData.append('industry', data.industry);
      // formData.append('location', data.location);
      // formData.append('description', data.description);
  
      try {
       apiCall.mutate(values,{
        onSuccess(res){
          alert(res?.data?.message)
          navigate('/')

        }

        }); 
        // alert('Company data submitted successfully.');
        // navigate('/');
      } catch (error) {
        console.error('Error submitting company data:', error);
        alert('There was an error submitting your company data.');
      }
    };
  

    return (
        <div className="min-h-screen flex flex-col items-center bg-zinc-100 dark:bg-zinc-900">
             <div className="bg-primary text-white font-bold  text-center  py-6 rounded w-full">Company Profile</div>
                  <main className="flex-grow w-full max-w-2xl mx-auto mt-8">
                    <div className="bg-white dark:bg-zinc-800 p-12 rounded shadow-lg mt-16">
                      <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Company Name</label>
                            <input type="text" id="company-name"  placeholder="Company Name *" {...register('name', { required: 'Company Name is required' })} className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700 dark:text-zinc-300" required/>
                            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="industry" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Industry</label>
                            <input type="text" id="industry" placeholder="Industry *" {...register('industry', { required: 'Industry is required' })} className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700 dark:text-zinc-300" required/>
                            {errors.industry && <p className="text-red-600">{errors.industry.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Location</label>
                            <input type="text" id="location" {...register('location', { required: 'Location is required' })} placeholder="Location *" className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700 dark:text-zinc-300" required/>
                            {errors.location && <p className="text-red-600">{errors.location.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
                            <input type="text" id="description" {...register('description')} placeholder="Description" className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700 dark:text-zinc-300"/>
                          </div>
                        </div>
                        <div className="flex justify-center mt-16">
                        <button type="submit"   className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Save Information</button>
                        </div>
                      </form>
                    </div>
                  </main>
                </div>
    );
};

export default CompanyProfile;