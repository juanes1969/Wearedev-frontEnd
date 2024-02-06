import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useSelector } from "react-redux";
import Select from 'react-select';
import { useProjectStore } from "../../hooks";
import { Navbar } from "../components/Navbar";
import './styles/AssingProyect.css';


export const AssingProyect = () => {

    const { startLoadingEmployes, startLoadingProjectsAvalible, startAllLoadingProjectAssined, startSavingAssingProject, startUpdateProjectAssignement } = useProjectStore();

    const { projectsAvalible, allProjecstAssined } = useSelector(state => state.project);

    const { employes } = useSelector(state => state.leader);

    const [selectEmploye, setSelectEmploye] = useState([]);

    const [selectProjects, setSelectProjects] = useState([]);

    const handleChangeEmployes = (selectEmploye) => {
        setSelectEmploye(selectEmploye);
    };

    const handleChangeProjects = (selectProjects) => {
        setSelectProjects(selectProjects);
    };

    const onDisabledAssined = (proyectId) => {

        startUpdateProjectAssignement(proyectId);
    }

    const onAssingProject = (e) => {
        e.preventDefault();

        const proyectId = selectProjects.map((project) => {
            return project.proyectId;
        });

        const userId = selectEmploye[0].id

        startSavingAssingProject({ userId, proyectId })
    }

    useEffect(() => {
        startLoadingProjectsAvalible();
        startLoadingEmployes();
        startAllLoadingProjectAssined();
    }, []);


    return (
        <>
            <Navbar />

            <div className="container text-center itemsContainer animate__animated animate__fadeIn animate__faster">
                <div className="row">
                    <section className="home-textm-assing">
                        <div className="col-12">
                            <h2>Aqui podras asignar los proyectos a los diferentes empleados.</h2>
                            <br />
                            <h6>En Esta pantalla podras asignar uno o mas proyectos a cada empleado</h6>
                        </div>

                        <div className="container_select">
                            <div className="row g-3">
                                <div className="row g-3 containerEmploye">
                                    <div className="col-auto">
                                        <label htmlFor="selectEmploye">Seleccione un empleado</label>
                                        <br />
                                        <Select
                                            isMulti
                                            options={employes}
                                            value={selectEmploye}
                                            onChange={handleChangeEmployes}
                                            placeholder="Selecciona un empleado"
                                            getOptionLabel={(option) => option.firstName + ' ' + option.secondName + ' ' + option.firstLastName + ' ' + option.secondLastName}
                                            getOptionValue={(option) => option.id}
                                            components={{
                                                DropdownIndicator: () => <BsArrowDown />,
                                                ClearIndicator: () => <BsArrowUp />,
                                            }}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <label htmlFor="selectProyect">Seleccione un proyecto</label>
                                        <br />
                                        <Select
                                            isMulti
                                            options={projectsAvalible}
                                            value={selectProjects}
                                            onChange={handleChangeProjects}
                                            placeholder="Selecciona un proyecto"
                                            getOptionLabel={(option) => option.projectName}
                                            getOptionValue={(option) => option.proyectId}
                                            components={{
                                                DropdownIndicator: () => <BsArrowDown />,
                                                ClearIndicator: () => <BsArrowUp />,
                                            }}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <label htmlFor="btnAssing">Asigna un proyecto</label>
                                        <br />
                                        <input className="btn btn-outline-primary" type="submit" placeholder="Buscar" aria-label="Search" value="Asignar proyecto" id="btnAssing" onClick={onAssingProject} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12 table-items'>
                                        <table className="table table-hover table-bordered table-responsive w-75 p-3 mt-5">
                                            <thead>
                                                <tr>
                                                    <th scope="col"># Documento</th>
                                                    <th scope="col">Nombre Empleado</th>
                                                    <th scope="col">Nombre Proyecto</th>
                                                    <th scope="col">Nombre Cliente</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allProjecstAssined.map((e) => (

                                                    (!selectEmploye.length || selectEmploye.some(emp => emp.id === e.userId)) &&
                                                    (!selectProjects.length || selectProjects.some(proj => proj.proyectId === e.proyectId)) && (
                                                        <tr key={e.id}>
                                                            <th scope="row">{e.personalId}</th>
                                                            <td>{e.firstName} {e.secondName} {e.firstLastName}</td>
                                                            <td>{e.projectName} </td>
                                                            <td>{e.clientName}</td>
                                                            <td>{e.isActive ? 'Activo' : 'Inactivo'}</td>
                                                            <td>
                                                                <div className="col">
                                                                    <button className="btn btn-outline-danger" type="submit" disabled={e.isActive ? false : true}
                                                                        onClick={() => onDisabledAssined(e.id)}>
                                                                        <AiOutlineDelete />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </>
    )
}