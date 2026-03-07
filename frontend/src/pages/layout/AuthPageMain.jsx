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
        <>
            <SizeLayOut>
                <div className='w-full h-full flex justify-center items-center'>
                    <Sidebar active={active} setActive={setActive} />
                    <Outlet />
                </div>
            </SizeLayOut>
        </>
    )
}

export default AuthPageMain;