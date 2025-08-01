import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const PrimaryButton = () => {
    return (
        <>
        <div className="flex items-center group">
                <button type="submit"  className="bg-primary text-forgrount h-[40px] px-3 py-2 ">Explore Jobs</button>
                <FaArrowRight className="inline-block group-hover:!translate-x-2 duration-200 p-2 text-base h-[40px] w-[40px] bg-primary text-white" />

              </div>
        </>

    );
};

export default PrimaryButton;