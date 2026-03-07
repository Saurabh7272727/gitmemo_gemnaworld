import React from 'react'

const SizeLayOut = ({ children }) => {
    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='w-[97%] h-[86%]'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default SizeLayOut;