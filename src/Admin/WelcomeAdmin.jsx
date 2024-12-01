import React from 'react';

const WelcomeAdmin = () => {
    let name = "tanvir"
    return (
        <div className='h-[100vh] flex justify-center items-center '>

            <div className='text-center -translate-y-[75%]'>
                <h1 className='text-7xl font-bold '>Welcomeee To Admin Pannel {name}</h1>
                <p className='text-2xl mt-11'>Hii Tanvir,Open the Navbar to manage The Website</p>
            </div>
            
        </div>
    );
};

export default WelcomeAdmin;