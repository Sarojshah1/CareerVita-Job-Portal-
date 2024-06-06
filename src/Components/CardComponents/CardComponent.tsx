import React from 'react';
import { NavLink } from 'react-router-dom';

interface cardProps {
    src: string;
    alt: string;
    category:string;
    jobs:string;
  }

const CardComponent:React.FC<cardProps> = ({ src, alt,category,jobs }) => {
    return (
        <div className="text-start size-58 hover:shadow-lg hover:shadow-blue-400/50 hover:translate-y-2 ">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow hover:bg-zinc-50">
            <img src={src} alt={alt} className="size-12 mb-4 " />
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className='flex'>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 pr-24 ">{jobs}</p>
            <NavLink to={'/'} className="text-primary font-bold">
              →
            </NavLink>
            </div>
          </div>
        </div>
    );
};

export default CardComponent;