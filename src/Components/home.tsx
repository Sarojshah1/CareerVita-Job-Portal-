import banner from "../assets/banner3.png";
import { FaArrowRight } from "react-icons/fa";
import Categories from "./Categories";
import JobsHome from "./Jobs/JobsHome";
import { useNavigate } from "react-router-dom";
import Companies from "./Companies/Companies";
// import primaryButton from './shared/primaryButton'

const Home:React.FC = () => {
  const navigate = useNavigate();

  const handleclick = () => {
    navigate('/jobs');
  };
  
    return (
      <>
      <div className="relative bg-bannercolor">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center min-h-[600px]">
            <div className="space-y-7 text-dark order-2 sm:order-1">
              <h1 className="text-5xl">Your Dream</h1>
              <span className="text-primary text-5xl ">Job Is Waiting</span>
              
              <h2 className="text-3xl">5000+ Jobs</h2>
              <div>
              <div className="flex items-center group">
                <button type="submit" onClick={handleclick} className="bg-primary text-forgrount h-[40px] px-3 py-2 ">Explore Jobs</button>
                <FaArrowRight className="inline-block group-hover:!translate-x-2 duration-200 p-2 text-base h-[40px] w-[40px] bg-primary text-white" />

              </div>

              
              </div>

            </div>
            
            <div className="order-2 sm:order-1">
              <img src={banner} alt="" className="w-full sm:scale-125 sm:translate-y-12" />
            </div>

          </div>

        </div>
      </div>
      <Categories/>
      <JobsHome/>
      <Companies />
      </>
    );
};

export default Home;