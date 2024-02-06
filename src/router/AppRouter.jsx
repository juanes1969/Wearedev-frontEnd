import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { HomeRoutes } from '../home/routes/HomeRoutes';
import { useEffect } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import { CheckingAuth } from '../ui/components/CheckingAuth';

export const AppRouter = () => {



    const { checkAuthToken, status } = useAuthStore();


    useEffect(() => {
        checkAuthToken();
    }, [])

    // const { checkAuthToken, status } = useAuthStore();
    // //const authStatus = 'not-authenticated'

    // useEffect(() => {
    //     checkAuthToken()
    // }, [])

    if (status === 'checking') {
        return (
            <CheckingAuth />
        )
    }



    return (
        <Routes>

            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={< AuthRoutes />} />
                            <Route path="/*" element={<Navigate to="auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="*" element={<HomeRoutes />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}
