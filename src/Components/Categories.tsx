import React from 'react';
import image from "../assets/image.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import CardComponent from './CardComponents/CardComponent';

const Categories: React.FC = () => {
    const img = [image, image1, image2, image3, image4, image5, image6, image7];
    const category = ["Design", "Sales", "Marketing", "Finance", "Technology", "Engineering", "Business", "Human Resource"];
    const jobs = ["256+ jobs Available", "500+ jobs Available", "323+ jobs Available", "12+ jobs Available", "50+ jobs Available", "441+ jobs Available", "210+ jobs Available", "100+ jobs Available"];

    return (
        <div className="container mx-auto p-4 bg-zinc-200">
            <h2 className="text-center text-2xl font-bold mb-4">Popular Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {img.map((src, index) => (
                    <CardComponent 
                        key={index}
                        src={src} 
                        alt={category[index]} 
                        category={category[index]} 
                        jobs={jobs[index]} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Categories;
