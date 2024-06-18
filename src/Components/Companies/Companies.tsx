import React, { useEffect, useState } from 'react';
import CompanyCard from './Company_Card/CompanyCard';
import axios from 'axios';

interface Company {
  name: string;
  location: string;
  isOpenPosition: boolean;
  positionCount: number;
  isFeatured: boolean;
  companyId:string;
}

interface Job {
  id: number;
  title: string;
  job_Type: string;
  postedDate: string;
  location: string;
  salary: string;
  work_Type: string;
  description: string;
  expiryDate:string;
  experience:string;
}



// const companiesData = [
//     {
//       companyName: 'F1 SOFT',
//       location: 'Kathmandu, Nepal',
//       isOpenPosition: true,
//       positionCount: 3,
//       isFeatured: true,
//     },
//     {
//       companyName: 'Tech Innovators',
//       location: 'San Francisco, USA',
//       isOpenPosition: false,
//       positionCount: 0,
//       isFeatured: false,
//     },
//     {
//       companyName: 'Global Solutions Ltd.',
//       location: 'London, UK',
//       isOpenPosition: true,
//       positionCount: 5,
//       isFeatured: false,
//     },
//     {
//       companyName: 'MegaTech Enterprises',
//       location: 'Tokyo, Japan',
//       isOpenPosition: true,
//       positionCount: 2,
//       isFeatured: true,
//     },
//     {
//       companyName: 'Digital Nexus',
//       location: 'Sydney, Australia',
//       isOpenPosition: true,
//       positionCount: 1,
//       isFeatured: true,
//     },
//     {
//       companyName: 'Innovate IT Solutions',
//       location: 'Berlin, Germany',
//       isOpenPosition: false,
//       positionCount: 0,
//       isFeatured: false,
//     },
//   ];
  

const Companies:React.FC = () => {
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<Company[]>('http://localhost:8080/api/companies');
  //       console.log(response?.data);
  //       setCompaniesData(response?.data?.data);
  //     } catch (error) {
  //       console.error('Error fetching job data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const username = 'user';
    const password = 'b586d350-3000-41f6-9217-fb7c7980cfe6';
    const fetchCompanies = async () => {
      try {
        const response = await axios.get<Company[]>('http://localhost:8080/api/companies',{
          auth: {
            username,
            password
          }});
        const companies = response?.data?.data;
        // console.log(companies);
        await Promise.all(
          companies.map(async (company:Company) => {
            try {
              const jobListingsResponse = await axios.get<Job[]>(`http://localhost:8080/api/joblistings/company/${company.companyId}`,{
                auth: {
                  username,
                  password
                }});
              const jobListings = jobListingsResponse.data;
              company.isOpenPosition = jobListings.length > 0;
              company.positionCount = jobListings.length;
            } catch (error) {
              console.error(`Error fetching job listings for company ${company.companyId}:`, error);
            }
          })
        );
        setCompaniesData(companies);
      } catch (error) {
        alert('Error fetching company data:');
      }
    };

    fetchCompanies();
  }, []);


    return (
        <div className="min-h-screen bg-zinc-200 dark:bg-zinc-900 p-6">
            <h2 className="text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-6">Top Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companiesData.map((company:Company, index) => (
          <CompanyCard
            key={index} // Ideally use a unique key from your data
            companyName={company.name}
            location={company.location}
            isOpenPosition={company.isOpenPosition}
            positionCount={company.positionCount}
            isFeatured={true}
            companyId={company.companyId}
          />
        ))}

        
        
        </div>
      </div>
    );
};

export default Companies;


