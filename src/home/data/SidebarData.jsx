// import * as AiIcons from 'react-icons/ai';

import { AiOutlineHome } from 'react-icons/ai';
import { BiWinkSmile } from 'react-icons/bi';
import { LiaBusinessTimeSolid } from 'react-icons/lia';
import { MdOutlinePersonSearch } from 'react-icons/md';

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiOutlineHome className='icon' />,
        cName: 'nav-link'
    },
    {
        title: 'Gestionar tiempos',
        path: '/manage',
        icon: <MdOutlinePersonSearch className='icon' />,
        cName: 'nav-link',
        show: 's'
    },
    {
        title: 'Registrar tiempos',
        path: '/register',
        icon: <LiaBusinessTimeSolid className='icon' />,
        cName: 'nav-linkf'
    },
    {
        title: 'Enviar kudos',
        path: '/kudos',
        icon: <BiWinkSmile className='icon' />,
        cName: 'nav-link'
    },
    // {
    //     title: 'Cerrar sesion',
    //     path: '/',
    //     icon: <RiLogoutBoxLine className='icon'/>,
    //     cName: 'nav-link'
    // }
]