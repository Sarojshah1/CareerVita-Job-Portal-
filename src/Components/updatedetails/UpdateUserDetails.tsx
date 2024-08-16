import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  resume: FileList;
};

const UpdateUserProfile: React.FC = () => {
  const MAX_FILE_SIZE_MB = 10;
  const navigate = useNavigate();
  //   const location = useLocation();
  const { userId } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>();

  const [jobSeekerId, setJobSeekerId] = useState<string | null>(null);

  // Fetch existing job seeker data if the user is authenticated
  const { data: jobSeekerData, isLoading: isLoadingJobSeekerData } = useQuery({
    queryKey: ["jobSeekerData", userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobseekers/user/${userId}`
      );
      return response.data.data;
    },
  });

  // Prefill the form fields with the fetched data if it exists
  useEffect(() => {
    if (jobSeekerData) {
      setValue("firstName", jobSeekerData.firstName);
      setValue("lastName", jobSeekerData.lastName);
      setValue("contactNumber", jobSeekerData.contactNumber);
      console.log(jobSeekerData.jobSeekerId);
      setJobSeekerId(jobSeekerData.jobSeekerId); // Assume the jobSeekerData has an id field for jobSeekerId
    }
  }, [jobSeekerData, setValue]);

  const apiCall = useMutation({
    mutationKey: ["UPDATE_JOB_SEEKER_DATA"],
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/jobseekers/${jobSeekerId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data; // Return the successful response
      } catch (error) {
        console.error("Error submitting profile data:", error);
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
    const formData = new FormData();
    formData.append("userId", userId);
    // formData.append('', jobSeekerId);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("contactNumber", data.contactNumber);
    if (data.resume && data.resume[0]) {
      if (data.resume[0].size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert("File size exceeds the maximum limit.");
        return;
      }
      formData.append("resume", data.resume[0]);
    }

    try {
      await apiCall.mutateAsync(formData);
      alert("Profile data updated successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error submitting profile data:", error);
      alert("There was an error submitting your profile data.");
    }
  };

  if (isLoadingJobSeekerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center">
      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full bg-primary py-4">
          <h1 className="text-center text-white text-xl">Update Profile</h1>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-3xl">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-zinc-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="First Name *"
              />
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-zinc-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                {...register("lastName", { required: "Last Name is required" })}
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="Last Name *"
              />
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="contact-number"
                className="block text-sm font-medium text-zinc-700"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contact-number"
                {...register("contactNumber", {
                  required: "Contact Number is required",
                })}
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="Contact Number *"
              />
              {errors.contactNumber && (
                <p className="text-red-600">{errors.contactNumber.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-zinc-700"
              >
                Resume
              </label>
              <input
                type="file"
                id="resume"
                {...register("resume", { required: "Resume is required" })}
                className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2"
                placeholder="upload pdf file"
              />
              {errors.resume && (
                <p className="text-red-600">{errors.resume.message}</p>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 rounded-2xl bg-red flex justify-center">
              <p className="text-sm text-white mt-2 text-center">
                *Note: If you update your resume here, it will automatically
                replace the resume for all jobs you have previously applied to.
                This means that any employer reviewing your applications will
                see your updated resume. Please ensure that your new resume
                reflects the information you want all employers to see.
              </p>
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded"
              >
                Update Information
              </button>
            </div>
           
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateUserProfile;
