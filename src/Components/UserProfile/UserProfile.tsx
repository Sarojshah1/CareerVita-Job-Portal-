import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';


type ProfileFormValues = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  resume: FileList;
  // userId:string;
};

const UserProfile:React.FC = () => {
  const MAX_FILE_SIZE_MB = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state as { userId: string };
  console.log(userId);
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>();
  const apiCall = useMutation({
    mutationKey: ["SAVE_JOB_SEEKER_DATA"],
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axios.post("http://localhost:8080/jobseekers", formData,{

            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Return the successful response
      } catch (error) {
        console.error('Error submitting profile data:', error);
        // Handle specific errors (e.g., 400 for validation errors, 500 for server errors)
        // and display appropriate messages to the user.
        throw error; // Re-throw the error for React Query to handle it
      }
      // return axios.post("http://localhost:8080/jobseekers", formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    
  // const { userId } = location.state as { userId: string };
    console.log(data);
    console.log(userId)
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('contactNumber', data.contactNumber);
    formData.append('resume', data.resume[0]);
    console.log(formData);
    if (data.resume && data.resume[0]) {
      if (data.resume[0].size > MAX_FILE_SIZE_MB * 1024 * 1024) {

        return;
      }
      formData.append('resume', data.resume[0]);
    }

    try {
      await apiCall.mutateAsync(formData); // Use mutateAsync for asynchronous mutation calls
      alert('Profile data submitted successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error submitting profile data:', error);
      alert('There was an error submitting your profile data.');
    }
  };



    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files && event.target.files[0];
    //     if (file) {

    //       console.log('Selected file:', file);
    //     }
    //   };
    return (
        <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
        <main className="flex-grow w-full flex flex-col items-center">
          <div className="w-full bg-primary py-4">
            <h1 className="text-center text-white text-xl">Create Profile</h1>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-3xl">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-zinc-700">First Name</label>
                <input type="text" id="first-name" {...register('firstName', { required: 'First Name is required' })} className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="First Name *"/>
                {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}

              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-zinc-700">Last Name</label>
                <input type="text" id="last-name" {...register('lastName', { required: 'Last Name is required' })} className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="Last Name *"/>
                {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
              </div>
              <div>
                <label htmlFor="contact-number" className="block text-sm font-medium text-zinc-700">Contact Number</label>
                <input type="text" id="contact-number" {...register('contactNumber', { required: 'Contact Number is required' })} className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" placeholder="Contact Number *"/>
                {errors.contactNumber && <p className="text-red-600">{errors.contactNumber.message}</p>}
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-zinc-700">Resume</label>
                <input type="file" id="resume"{...register('resume', { required: 'Resume is required' })} className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"/>
                {errors.resume && <p className="text-red-600">{errors.resume.message}</p>}
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded">Save Information</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
};

export default UserProfile;

