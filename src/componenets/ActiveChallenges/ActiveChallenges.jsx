import React, { use } from 'react';
import ChallengeCard from '../challenge/ChallengeCard';

const ActiveChallenges = ({activeChallengesPromise}) => {
    const activeChallenge=use(activeChallengesPromise);
    console.log(activeChallenge);
    return (
        <div className='max-w-full mx-auto'>
            <h1 className='text-5xl'>Active <span className='text-blue-400'>Challenges</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {
            activeChallenge.map(challenge=> <ChallengeCard
            key={challenge._id}
            challenge={challenge}
            ></ChallengeCard>)
            }
            </div>
        </div>
    );
};

export default ActiveChallenges;