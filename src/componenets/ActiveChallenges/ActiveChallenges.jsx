import React, { use } from 'react';
import ChallengeCard from '../challenge/ChallengeCard';
import { Link } from 'react-router';
import StaticSections from '../StaticSections/StaticSections';

const ActiveChallenges = ({activeChallengesPromise}) => {
    const activeChallenge=use(activeChallengesPromise);
    console.log(activeChallenge);
    return (
        <div className='max-w-full mx-auto'>
            <div className="flex justify-between mb-5 mt-5">
       <h1 className='text-5xl'>Active <span className='text-blue-400'>Challenges</span></h1>
        <div className='items-center justify-center'>
          <Link
            to="/challenges"
            className="btn text-white w-[145px] p-2 bg-linear-to-bl from-violet-500 to-fuchsia-500 hover:scale-105 hover:bg-red-600"
          >
            Show All
          </Link>
        </div>
      </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {
            activeChallenge.map(challenge=> <ChallengeCard
            key={challenge._id}
            challenge={challenge}
            ></ChallengeCard>)
            }
            </div>
            <StaticSections></StaticSections>
        </div>
    );
};

export default ActiveChallenges;