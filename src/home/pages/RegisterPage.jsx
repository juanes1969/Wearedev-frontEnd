import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks'
import { useAuthStore } from '../../hooks/useAuthStore'
import { Navbar } from '../components/Navbar'
import './styles/RegisterPage.css'

const formData = {
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    email: '',
    role: '',
    typeId: '',
    personalId: '',
    password: '',
    photoURL: '',
    charge: '',
    liderId: 0
}

const formValidations = {
    firstName: [(value) => value.length >= 1, 'El campo primer nombre es obligatorio.'],
    firstLastName: [(value) => value.length >= 1, 'El campo primer apellido es obligatorio.'],
    email: [(value) => value.includes('@wearedev.co'), 'El correo debe de tener un dominio weare.'],
    role: [(value) => value.length >= 1, 'El campo rol es obligatorio.'],
    typeId: [(value) => value.length >= 1, 'El campo tipo identificacion es obligatorio.'],
    personalId: [(value) => value.length >= 1, 'El campo numero de identificacion es obligatorio.'],
    password: [(value) => value.length >= 6, 'El campo contraseña debe de tener mas de 6 caracteres.'],
    charge: [(value) => value.length >= 1, 'El campo cargo es obligatorio.']
}

export const RegisterPage = () => {

    const [formSubmited, setFormSubmited] = useState(false);

    const { startRegister, startLoadingLeaders, startLoadingRoles } = useAuthStore();

    const { roles, leaders } = useSelector(state => state.auth);

    const { firstName, secondName, firstLastName, secondLastName, email, role, typeId, personalId, password, photoURL, charge, liderId, onInputChange,
        isFormValid, firstNameValid, firstLastNameValid, emailValid, roleValid, typeIdValid, personalIdValid,
        passwordValid, photoURLValid, chargeValid, liderIdValid, formState, setFormState
    } = useForm(formData, formValidations)

    const onHandleChangeRol = ({ target }) => {
        const nuevoRol = target.value;
        setFormState({
            ...formState,
            [target.name]: nuevoRol
        });
        //Si el rol seleccionado es 'Admin', reseteamos el tipo de administrador seleccionado
        if (target.value !== 'collaborator') {
            setFormState({
                ...formState,
                [target.name]: target.value
            });
        }
    };

    useEffect(() => {
        startLoadingLeaders();
        startLoadingRoles();
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmited(true);
        if (!isFormValid) return;
        startRegister(formState);
    }

    return (
        <>
            <Navbar />

            <section className='home-text-register'>

                <h1>Aqui podras registrar usuarios nuevos.</h1>
                <h5>Registra los usuarios nuevos y asignales el lider actual.</h5>
                <br />
                <div className='rectangle_form'>
                    <form className='form-register animate__animated animate__fadeIn animate__faster' onSubmit={onSubmit}>
                        <div className="row mt-4">
                            <div className="col">
                                <div className="form-floating">
                                    <input type="text" className={`${!!firstNameValid && formSubmited ? 'form-control is-invalid' : 'form-control'} `} name='firstName' value={firstName} placeholder="Primer nombre" autoComplete='off' onChange={onInputChange} />
                                    {
                                        (!!firstNameValid && formSubmited) ?
                                            (<small id="labelTitle" className="form-text text-danger">{firstNameValid}</small>)
                                            : null
                                    }
                                    <label>Primer nombre</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating">
                                    <input type="text" className='form-control' name='secondName' value={secondName} placeholder="Segundo nombre" autoComplete='off' onChange={onInputChange} />
                                    <label>Segundo nombre</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating">
                                    <input type="text" className={`${!!firstLastNameValid && formSubmited ? 'form-control is-invalid' : 'form-control'} `} name='firstLastName' value={firstLastName} placeholder="Primer apellido" autoComplete='off' onChange={onInputChange} />
                                    <label>Primer apellido</label>
                                    {
                                        (!!firstLastNameValid && formSubmited) ?
                                            (<small id="labelTitle" className="form-text text-danger">{firstLastNameValid}</small>)
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row mt-4">
                            <div className="col">
                                <div className="form-floating">
                                    <input type="text" className='form-control' name='secondLastName' value={secondLastName} placeholder="Segundo Apellido" autoComplete='off' onChange={onInputChange} />
                                    <label>Segundo apellido</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating">
                                    <input type="text" className='form-control' name='email' value={email} placeholder="email" autoComplete='off' onChange={onInputChange} />
                                    <label>Email</label>
                                    {
                                        (!!emailValid && formSubmited) ?
                                            (<small id="labelTitle" className="form-text text-danger">{emailValid}</small>)
                                            : null
                                    }
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-floating">
                                    <select className={`${!!typeIdValid && formSubmited ? 'form-control is-invalid' : 'form-control'} `} name='typeId' value={typeId} onChange={onInputChange}>
                                        <option value='0'>Seleccione tipo de identificacion</option>
                                        <option value='CC'>CC</option>
                                    </select>
                                    <label>Tipo identificacion</label>
                                    {
                                        (!!typeIdValid && formSubmited) ?
                                            (<small id="labelTitle" className="form-text text-danger">{typeIdValid}</small>)
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row mt-4">
                            <div className="col">
                                <div className="form-floating">
                                    <input type="number" className={`${!!personalIdValid && formSubmited ? 'form-control is-invalid' : 'form-control'} `} name='personalId' value={personalId} placeholder="Numero de identificacion" autoComplete='off' onChange={onInputChange} />
                                    <label>Numero de identificacion</label>
                                    {
                                        (!!personalIdValid && formSubmited) ?
                                            (<small id="labelTitle" className="form-text text-danger">{personalIdValid}</small>)
                                            : null
                                    }
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-floating">
                                    <input type="password" className={`${!!passwordValid && formSubmited ? 'form-control is-invalid' : 'form-control'} `} name='password' value={password} placeholder="Contraseña" autoComplete='off' onChange={onInputChange} />
                                    <label>Contraseña</label>
                                    {
                                        (!!passwordValid && formSubmited) ?
                                            (<small id="labelTitle" className="form-text text-danger">{passwordValid}</small>)
                                            : null
                                    }
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-floating">
                                    <input type="file" className='form-control' name='photoURL' autoComplete='off' value={photoURL} onChange={onInputChange} />
                                    <label>Foto</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row mt-4">

                            <div className="col">
                                <div className="form-floating">
                                    <input type="text" className={`${!!chargeValid && formSubmited ? 'form-control is-invalid' : 'form-control'} `} name='charge' value={charge} placeholder="Cargo" autoComplete='off' onChange={onInputChange} />
                                    <label>Cargo</label>
                                    {
                                        (!!chargeValid && formSubmited) ?
                                            (<small id="labelTitle" className="form-text text-danger">{chargeValid}</small>)
                                            : null
                                    }
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-floating">
                                    <select className={`${!!roleValid && formSubmited ? 'form-control is-invalid' : 'form-control'} `} name='role' value={role} onChange={onHandleChangeRol}>
                                        <option value='0'>Seleccione un rol</option>
                                        {roles.map((rol) => (
                                            <option
                                                key={rol.id}
                                                value={rol.role}
                                            >
                                                {rol.description}
                                            </option>
                                        ))}
                                    </select>
                                    <label>Rol</label>
                                    {
                                        (!!roleValid && formSubmited) ?
                                            (<small id="labelTitle" className="form-text text-danger">{roleValid}</small>)
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                        <hr />


                        {role === 'collaborator' && (
                            <div className="row mt-4">
                                <div className="col">
                                    <div className="form-floating">
                                        <select className='form-control' name='liderId' value={liderId} onChange={onInputChange}>
                                            <option value='0'>Seleccione su lider</option>
                                            {leaders.map((leader) => (
                                                <option
                                                    key={leader.id}
                                                    value={leader.id}
                                                >
                                                    {leader.firstName} {leader.secondName} {leader.firstLastName}
                                                </option>
                                            ))}
                                        </select>
                                        <label>Lider</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="col-12 buttonsRegister mt-4">
                            <button type="submit" className="btn btn-outline-primary w-100">Registrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
