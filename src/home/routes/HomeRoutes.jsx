import { Navigate, Route, Routes } from 'react-router-dom'
import { CalendarTest } from '../pages/CalendarTest'
import { ChangePassword } from '../pages/ChangePassword'
import { HomePage } from '../pages/HomePage'
import { KudosPage } from '../pages/KudosPage'
import { ManageTimes } from '../pages/ManageTimes'
import { RegisterClients } from '../pages/RegisterClients'
import { RegisterPage } from '../pages/RegisterPage'
import { AssingProyect } from '../pages/AssingProyect'

export const HomeRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/manage' element={<ManageTimes />} />
            <Route path='/register' element={<CalendarTest />} />
            <Route path='/kudos' element={<KudosPage />} />
            <Route path='/userRegister' element={<RegisterPage />} />
            <Route path='/clientsRegister' element={<RegisterClients />} />
            {/* <Route path='/calendarT' element={<RegisterTime />} /> */}
            <Route path='/assingProyect' element={<AssingProyect />} />
            <Route path='/changePassword' element={<ChangePassword />} />

            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    )
}
