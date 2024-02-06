import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { FcSearch } from 'react-icons/fc';
import { useClientStore, useModal, usePage, useTimeStore } from '../../hooks';
import { ModalClient } from '../components/ModalClient';
import { Navbar } from '../components/Navbar';
import './styles/RegisterClients.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const formData = {
    proyectName: '',
    clientName: '',
    isActiveProject: false
}

const formValidations = {
    proyectName: [(value) => value.length >= 1, 'El campo nombre de proyecto es obligatorio.'],
    clientName: [(value) => value.length >= 1, 'El campo nombre de cliente es obligatorio.'],
}

export const RegisterClients = () => {

    const [isOpenModalClient, openModalClient, closeModalClient] = useModal();

    const { startLoadingProjects } = useTimeStore();

    const { startDeletingProject } = useClientStore();

    const { projects } = useSelector(state => state.time);

    const [clientEdit, setClientEdit] = useState(null);

    const [search, setSearch] = useState('');


    const onSearchChange = ({ target }) => {
        setSearch(target.value)
    }

    const { filterClients } = usePage(projects, search);

    useEffect(() => {
        startLoadingProjects();
    }, [])


    const onUpdateClient = (client) => {
        setClientEdit(client);
        openModalClient();
        console.log(client)        
    }

    const onDeleteClient = (idProject) => {
        startDeletingProject(idProject);
    }

    return (
        <>
            <Navbar />

            <div className="container text-center itemsContainer animate__animated animate__fadeIn animate__faster">
                <div className="row">
                    <section className="home-textC">
                        <div className="col-12">
                            <h2>Aqui podras registrar usuarios clientes nuevos.</h2>
                            <h5>Registra los proyectos nuevos y asignales un cliente.</h5>
                            <br />



                            <div className='search_container'>
                                <div className="col-xs-3 col-lg-3 col-xl-3 col-md-3">
                                    <button className='btn btn-outline-primary mb-4' onClick={openModalClient}>Agregar nuevo cliente</button>
                                    <form className="d-flex" role="search">
                                        <input className="form-control" type="search" name='search' placeholder="Buscar" aria-label="Search" autoComplete='off' onChange={onSearchChange} />
                                        <button className="btn btn-outline-success" type="submit" id='btn-search' disabled><FcSearch /></button>
                                    </form>
                                </div>
                            </div>

                            <div className="row">
                                <div className='col-12 table-items'>
                                    <table className="table table-hover table-bordered table-responsive w-75 p-3 mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre proyecto</th>
                                                <th scope="col">Nombre cliente</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {filterClients().map((e) => (
                                                <tr key={e.proyectId}>
                                                    <th scope="row">{e.proyectId}</th>
                                                    <td>{e.projectName} </td>
                                                    <td>{e.clientName}</td>
                                                    <td>{e.isActive ? 'Activo' : 'Inactivo'}</td>
                                                    <td>
                                                        <div className='col'>
                                                            <button className="btn btn-outline-info" type="submit" onClick={() => onUpdateClient(e)}><CiEdit /> </button>
                                                            &nbsp;
                                                            <button className="btn btn-outline-danger" type="submit" onClick={() => onDeleteClient(e.proyectId)}><AiOutlineDelete /> </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <ModalClient
                clientEdit={clientEdit}
                setClientEdit={setClientEdit}
                isOpenModalClient={isOpenModalClient}
                closeModalClient={closeModalClient}
            />
        </>
    )
}
