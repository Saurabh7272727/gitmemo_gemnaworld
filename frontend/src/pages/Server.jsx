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
            <div className="page-frame flex min-h-screen items-center justify-center">
                <div className="panel max-w-xl text-center">
                    <p className="eyebrow">Setting things up</p>
                    <h1 className="mt-3 text-3xl font-bold text-slate-900">Loading your GitMemo profile</h1>
                    <p className="muted-copy mt-3">We’re syncing your GitHub identity and workspace context.</p>
                </div>
            </div>
        )
    }

    if (status == 'error') {
        return (
            <div className="page-frame flex min-h-screen items-center justify-center">
                <div className="panel max-w-xl text-center">
                    <h1 className="text-2xl font-bold text-slate-900">We could not load your profile</h1>
                    <p className="mt-3 text-sm text-rose-600">{String(error)}</p>
                </div>
            </div>
        )
    }

    const conformationSubmit = (id) => {
        if (!id) {
            console.log(data);
            return alert('id are missing');
        }
        localStorage.setItem('userId', id);
        // Also set ownerId from the user data (GitHub ID)
        if (data?.findUserData?.githubId) {
            localStorage.setItem('ownerId', data.findUserData.githubId);
        }
        navi('/gemna_gitmemo.html');
    }

    return (
        <SizeLayOut>
            <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
                <div className='panel p-6 md:p-8'>
                    {
                        isSuccess && data.status == 200 ?
                            <div className='space-y-6'>
                                <div>
                                    <p className='eyebrow'>{signup ? 'First-time onboarding' : 'Welcome back'}</p>
                                    <h1 className='mt-3 text-4xl font-bold text-slate-900'>
                                        {signup ? 'Your workspace is ready to activate.' : 'We found your GitMemo profile.'}
                                    </h1>
                                    <p className='muted-copy mt-3'>
                                        Review the synced GitHub account below, then continue into your collaboration workspace.
                                    </p>
                                </div>
                                <ProfessionalUserProfileCard user={data?.findUserData} />
                                <div className='flex flex-wrap items-center gap-3'>
                                    <button className='btn-primary' onClick={() => conformationSubmit(data?.findUserData?._id)}>
                                        Continue to Workspace
                                    </button>
                                    <span className='text-sm text-slate-500'>{data?.message}</span>
                                </div>
                            </div> : <span>{data?.message}</span>
                    }
                </div>

                <div className='hero-panel p-8 text-white'>
                    <p className='eyebrow'>Account sync</p>
                    <h2 className='mt-3 text-3xl font-bold'>
                        {signup ? 'Fresh profile detected.' : 'Existing member recognized.'}
                    </h2>
                    <p className='muted-copy-dark mt-4'>
                        We use your GitHub profile as the entry point for project identity, GitHub App connection, and contribution history.
                    </p>
                    <div className='mt-8 space-y-3 text-sm text-slate-300'>
                        <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>
                            Status: {fetchStatus === 'fetching' ? 'Refreshing profile data' : 'Ready'}
                        </div>
                        <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>
                            Mode: {signup ? 'New workspace onboarding' : 'Returning workspace access'}
                        </div>
                        {fetchStatus == 'paused' && (
                            <div className='rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-rose-200'>
                                {String(error)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SizeLayOut>
    )
}

export default Server;
