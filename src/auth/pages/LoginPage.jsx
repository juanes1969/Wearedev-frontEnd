import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import logo from '../../assets/LogoAzulPaginaWeb.png';
import { useAuthStore, useForm } from '../../hooks';
import './styles/LoginStyles.css';


export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);

    const { email, password, onInputChange } = useForm({
        email: '',
        password: ''
    });

    const onSubmit = (event) => {
        event.preventDefault();

        startLogin({ email, password });

    }

    useEffect(() => {

        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticacion.', errorMessage, 'error');
        }

    }, [errorMessage]);

    return (
        <div className="row g-0">
            <div className="col-lg-7 d-none-d-lg-block">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item min-vh-100 img-1 active">
                            {/* <img src={img1} className="d-block w-100" alt="..." /> */}
                        </div>
                        <div className="carousel-item min-vh-100 img-2">
                            {/* <img src={img3} className="d-block w-100" alt="..." /> */}
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="col-lg-5 d-flex flex-column aling-items-end min-vh-100">
                <div className='px-lg-5 pt-lg-4 pb-lg-3 p-4 w-100 mb-auto'>
                    <img src={logo} alt="logoPagina" className="img-fluid" />
                </div>
                <div className='px-lg-5 py-lg-4 p-4 w-100 aling-self-center'>
                    <h2 className='font-weight-bold mb-4'>Bienvenido a WeAre Dev Crece</h2>
                    <form className='mb-5' onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label font-weight-bold">Email</label>
                            <input type="email" className="form-control crtl1 " placeholder='Ingresa tu email' id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={email} onChange={onInputChange} autoComplete='off' required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="exampleInputPassword1" className="form-label font-weight-bold">Contraseña</label>
                            <div className='input-icon-eye'>
                                <input type={showPassword ? 'text' : 'password'} className="form-control crtl1" placeholder='Ingresa tu contraseña' id="exampleInputPassword1" name='password' value={password} onChange={onInputChange} autoComplete='off' required />
                                {
                                    showPassword ?
                                        <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} /> :
                                        <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                                }                                
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-primary btn-login w-100">Iniciar sesión</button>
                    </form>

                    <p className='text-center'>Si aun no tienes cuenta contacta con tu lider directo.</p>
                </div>
                <div className='text-center mb-0 px-lg-5 pt-lg-3 pb-lg-4 p-4 w-100 mt-auto'>
                    <p>Políticas y procesamientos de datos personales</p><p>Términos y condiciones</p>
                </div>
            </div>
        </div>
    )
}
