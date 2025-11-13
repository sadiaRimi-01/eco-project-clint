import React from 'react';
import { Link } from 'react-router';

const ChallengeCard = ({challenge}) => {
  const { title, category, impactMetric, imageUrl } = challenge;


    return (
        <div className="card bg-base-100  shadow-sm">
  <figure className='h-50 overflow-hidden'>
    <img
    className="w-full h-full object-cover "
      src={imageUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p className='text-[#1F2937]'>{impactMetric}</p>
   
    <p className='text-[#1F2937]'>Category: <span className='text-gray-600 text-base'>{category}</span> </p>
    <div className="card-actions justify-end">
      <Link to={'/details'} className="btn bg-green-500 w-full">View Details</Link>
    </div>
  </div>
</div>
    );
};

export default ChallengeCard;