import React from 'react';
import ActiveChallenges from '../componenets/ActiveChallenges/ActiveChallenges';

const activeChallengesPromise=fetch('http://localhost:3000/ActiveChallenges')
.then(res=> res.json());

const Home = () => {
    return (
        <div className='max-w-full mx-auto'> 
           <ActiveChallenges activeChallengesPromise={activeChallengesPromise}></ActiveChallenges>
        </div>
    );
};

export default Home;