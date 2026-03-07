import React, { useLayoutEffect, useState } from 'react';
import SizeLayOut from './layout/SizeLayOut.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import API from '../api/api.user.data.js';
import ProfessionalUserProfileCard from '../components/ProfileShower.jsx';

const Server = () => {
    const navi = useNavigate();
    const [query, setQuery] = useSearchParams(); // query.get \\ setQuery:fun have pass object of query
    const [signup, setSignUp] = useState(false)

    const api = new API();
    useLayoutEffect(() => {
        if (query.get('signup') && query.get('userId')) {
            setSignUp(true);
        }
    }, []);

    const { status, fetchStatus, data, error, isSuccess } = useQuery({
        queryKey: ['fetch-user-data'],
        queryFn: () => api.apiPost('/auth/user/profile', { userId: query.get('userId') }),
        gcTime: 5 * 60 * 1000,
        staleTime: 3 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2
    })

    if (status == 'pending') {
        return (
            <div>Loading...........</div>
        )
    }

    if (status == 'error') {
        return (
            <div>{error}</div>
        )
    }

    const conformationSubmit = (id) => {
        if (!id) {
            console.log(data);
            return alert('id are missing');
        }
        localStorage.setItem('userId', id);
        navi('/gemna_gitmemo.html');
    }

    return (
        <>
            <SizeLayOut>
                <div className='w-full h-full bg-stone-300 rounded-md bg-gradient-to-br from-slate-50 to-slate-200 drop-shadow-2xl'>
                    {
                        isSuccess && data.status == 200 ?
                            <div className='flex justify-center flex-col gap-y-4 w-full h-fit'>
                                <ProfessionalUserProfileCard user={data?.findUserData} />
                                <button onClick={() => conformationSubmit(data?.findUserData?._id)}>
                                    Next
                                </button>
                            </div> : <span>{data?.message}</span>
                    }
                </div>
                {
                    fetchStatus == 'fetching' && <span className='text-red-700 font-medium'>refreshing...</span>
                }
                {
                    fetchStatus == 'paused' && <span className='text-red-700 font-medium'>{error}</span>
                }
                {
                    signup &&
                    <div className='text-red-700 font-medium'>
                        First time see by user {"<====="}
                    </div>
                }
                {
                    !signup &&
                    <div className='text-red-700 font-medium'>
                        Already have a account
                    </div>
                }
            </SizeLayOut>
        </>
    )
}

export default Server;