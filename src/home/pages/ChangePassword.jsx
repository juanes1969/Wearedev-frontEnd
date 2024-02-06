import { Navbar } from '../components/Navbar'
import './styles/ChangePassword.css'

export const ChangePassword = () => {
    return (
        <>
            <Navbar />

            <div className="container text-center itemsContainer animate__animated animate__fadeIn animate__faster">
                <div className="row">
                    <section className="home-text-changepass">
                        <div className="col-12">
                            <h2>Aqui podras cambiar la contraseña de tu usuario.</h2>

                        </div>

                        <div className="col-12 rectangeCenter">
                            <div className='form-rectangle mt-5'>


                                <form className='form-change'>
                                    <h5>Actualiza tu contraseña.</h5>
                                    <br />
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña actual</label>
                                        <input type="password" className="form-control inputChange" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword2" className="form-label">Nueva contraseña</label>
                                        <input type="password" className="form-control inputChange" id="exampleInputPassword2" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword3" className="form-label">Confirme Nueva contraseña</label>
                                        <input type="password" className="form-control inputChange" id="exampleInputPassword3" />
                                    </div>
                                    <div className='d-grid gap-3 mt-4 buttonChange'>
                                        <button type="submit" className="btn btn-outline-primary">Cambiar contraseña</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </>
    )
}
