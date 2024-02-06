import { useState } from 'react';
import { BsDatabaseAdd, BsGear, BsPersonGear } from 'react-icons/bs';
import { FiUserPlus } from 'react-icons/fi';
import { MdOutlineAssignment } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import profilePictureImageExample from '../../assets/profile-picture-image.png';
import { useAuthStore } from '../../hooks/useAuthStore';
import './styles/NavbarStyle.css';

export const HeaderNav = ({ closeMenu }) => {

    const { user } = useAuthStore();
    const { firstName, secondName, firstLastName, rolesArray, photoURL } = user;

    const [closeheader, setCloseHeader] = useState(false);

    const toggleHeaderMenu = () => {
        setCloseHeader(!closeheader);
    }

    return (
        <section className="home" onClick={closeMenu}>
            <header className='header'>
                <div className="text mt-2">
                    <p>{firstName} {secondName} {firstLastName}</p>
                </div>
                <div className="logo" onClick={toggleHeaderMenu}>
                    <img src={profilePictureImageExample} alt="fotoPerfil" />

                    <div className={`menu ${closeheader ? 'active' : ''}`} >
                        <ul className='mt-0 mb-0 p-0'>
                            <li><BsPersonGear className='headerIcon' /> <a>Mi perfil</a></li>
                            {rolesArray[0] === 'admin' ?
                                (<li><FiUserPlus className='headerIcon' /> <a href='/userRegister'>Gestionar usuarios</a></li>) :
                                null
                            }
                            {rolesArray[0] === 'admin' ?
                                (<li><BsDatabaseAdd className='headerIcon' /> <a href='/clientsRegister'>Gestionar clientes</a></li>) :
                                null
                            }
                            {rolesArray[0] === 'admin' ?
                                (<li><MdOutlineAssignment className='headerIcon' /> <a href='/assingProyect'>Asignar proyectos</a></li>) :
                                null
                            }
                            <li><RiLockPasswordLine className='headerIcon' /><a href='/changePassword'>Cambiar contraseña</a></li>
                            <li><BsGear className='headerIcon' /> <a>Configuración</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </section>
    )
}
