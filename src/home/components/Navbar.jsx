import { useState } from "react";
import { BsMoon, BsSun } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { RiLogoutBoxLine } from 'react-icons/ri';
import logo from '../../assets/LogoAzulPaginaWeb.png';
import { SidebarData } from '../data/SidebarData';
import { HeaderNav } from "./HeaderNav";
import { SocialItems } from "./SocialItems";
import './styles/NavbarStyle.css';
import { useAuthStore } from "../../hooks/useAuthStore";
import Swal from "sweetalert2";

export const Navbar = () => {

    const [closeSidebar, setCloseSidebar] = useState(true);

    const darkMode = () => {
        document.body.classList.toggle('dark');
    }

    const toggleMenu = () => {
        setCloseSidebar(!closeSidebar);
    }

    const closeMenu = () => {
        setCloseSidebar(true);
    }

    const { startLogout, user } = useAuthStore();

    const { rolesArray } = user;


    const closeSession = () => {
        // Swal.fire({
        //     title: "Cerrar sesion",
        //     showDenyButton: true,
        //     showCancelButton: true,
        //     confirmButtonText: "Cerrar sesion",
        //     denyButtonText: `Quedarme en la sesion actual`
        // }).then((result) => {
        //     /* Read more about isConfirmed, isDenied below */
        //     if (result.isConfirmed) {
        //         startLogout();
        //     } else if (result.isDenied) {
        //         window.location.href = '/'
        //     }
        // });
        Swal.fire({
            title: "Cerrar sesion",
            text: "¿Desea cerrar su sesion actual?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, deseo cerrar mi sesion.",
            cancelButtonText: "No, quedarme en la sesion actual."
        }).then((result) => {
            if (result.isConfirmed) {
                startLogout();
                Swal.fire({
                    title: "Sesion cerrada con exito",
                    text: "Tu sesion fue cerrada con exito, vuelve a ingresar tus datos.",
                    icon: "success"
                }).then(x => x.isDismissed)
            } else if (result.isDenied) {
                window.location.href = '/'
            }
        });
    }

    return (
        <>
            <nav className={`sidebar ${closeSidebar ? 'close' : ''}`}>
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={logo} alt='logoBlanco' />
                        </span>

                        <div className="text header-text">
                            <span className="name">Weare Dev Crece</span>
                            <span className="profession">Pendientes de ti</span>

                        </div>
                    </div>

                    <IoIosArrowForward className='toggle' onClick={toggleMenu} />

                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="meun-link p-0">
                            {rolesArray[0] === 'admin' || rolesArray[0] === 'leader' ?
                                (SidebarData.map((item, index) => {
                                    return (
                                        <li key={index} className={`${item.cName}`}>
                                            <a href={`${item.path}`}>
                                                {item.icon}
                                                <span className="text nav-text">{item.title}</span>
                                            </a>
                                        </li>
                                    );
                                })) :
                                (SidebarData.filter(item => !item.show).map((item, index) => {
                                    return (
                                        <li key={index} className={`${item.cName}`}>
                                            <a href={`${item.path}`}>
                                                {item.icon}
                                                <span className="text nav-text">{item.title}</span>
                                            </a>
                                        </li>
                                    );
                                }))}
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="">
                            <a href="#" onClick={closeSession}>
                                <RiLogoutBoxLine className='icon' />
                                <span className="text nav-text">Cerrar sesión</span>
                            </a>
                        </li>

                        <li className="mode">
                            <div className="moon-sun">
                                <i className='moon'><BsMoon className='icon' /></i>
                                <i className='sun'><BsSun className='icon' /></i>
                            </div>


                            <div className="toggle-switch" onClick={darkMode}>
                                <span className="switch"></span>
                            </div>
                        </li>
                    </div>
                </div>
            </nav>

            <HeaderNav closeMenu={closeMenu} />
            {/* <SocialItems /> */}

        </>

    )
}
