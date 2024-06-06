import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


type FormValues = {
  username: string;
  email: string;
  password: string;
  userType: string;
};
const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit,formState: { errors } } = useForm<FormValues>();
  const apiCall = useMutation({
    mutationKey: ["SAVE_USER_DATA"],
    mutationFn: (requestData: FormValues) => {
      return axios.post("http://localhost:8080/users", requestData);
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    apiCall.mutate(values, {
      onSuccess(res) {
        const userId = res?.data?.data?.userId;
        console.log(userId);
        alert(res?.data?.message);
        if (values.userType === '1') {
          navigate('/jobseeker',{ state: { userId } });
        } else {
          navigate('/companyProfile',{ state: { userId } });
        }
      },
    });
  };
    return (
        
        <div className="min-h-screen flex flex-col items-center  bg-zinc-100 dark:bg-zinc-900">
        <div className="bg-primary text-white font-semibold text-2xl   text-center  py-6 rounded w-full">Register</div>
        <div className="w-full max-w-2xl bg-white mt-16 dark:bg-zinc-800 rounded shadow-lg p-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Username</label>
                <input type="text" placeholder="Username *"  {...register('username', { required: 'Username is required' })} className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-200"/>
                {errors.username && <p className="text-red-600">{errors.username.message}</p>}
              </div>
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
                <input type="email" placeholder="Email *" {...register('email', { required: 'Email is required' })} className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-200"/>
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Password</label>
                <input type="password" placeholder="Password *"  {...register('password', { required: 'Password is required' })} className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-200"/>
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Roles</label>
                <select {...register('userType', { required: 'Role is required' })} className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-200" required>
                  <option value="">Select</option>
                  <option value="1">Job Seeker</option>
                  <option value="2">employer</option>
                </select>
                {errors.userType && <p className="text-red-600">{errors.userType.message}</p>}
              </div>
            </div>
            <div className="mt-6">
              <button type="submit"   className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Register;