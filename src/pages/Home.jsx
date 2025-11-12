import React from 'react';
import ActiveChallenges from '../componenets/ActiveChallenges/ActiveChallenges';
import Banner from '../componenets/banner/Banner';
import LiveStats from '../componenets/LiveStats/LiveStats';

const activeChallengesPromise=fetch('http://localhost:3000/ActiveChallenges')
.then(res=> res.json());

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <LiveStats></LiveStats>
            <div className='max-w-full mx-auto'> 
           <ActiveChallenges activeChallengesPromise={activeChallengesPromise}></ActiveChallenges>
        </div>
        </div>
        
    );
};

export default Home;