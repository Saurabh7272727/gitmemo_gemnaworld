import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import SizeLayOut from '../layout/SizeLayOut.jsx'
import Sidebar from '../../components/SlideBar.jsx';
const AuthPageMain = () => {
    const navi = useNavigate();
    const [active, setActive] = useState("Home");

    useEffect(() => {
        const getTokenUserId = localStorage.getItem("userId");
        if (!getTokenUserId) {
            navi('/login');
        }
    }, []);

    return (
        <SizeLayOut>
            <div className='dashboard-shell min-h-[calc(100vh-9rem)] lg:min-h-[780px]'>
                <div className='flex min-h-[calc(100vh-9rem)] flex-col lg:min-h-[780px] lg:flex-row'>
                    <Sidebar active={active} setActive={setActive} />
                    <div className='flex-1 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.07),transparent_32%),linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.96))] text-slate-900'>
                        <div className='h-full overflow-y-auto p-4 md:p-6 lg:p-8'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </SizeLayOut>
    )
}

export default AuthPageMain;
