import { useEffect, useState } from "react";
import { useForm, useClientStore } from "../../hooks";
import "../components/styles/ModalClientStyle.css";

const formData = {
    proyectName: '',
    clientName: '',
    isActiveProject: false
}

const formValidations = {
    proyectName: [(value) => value.length >= 1, 'El campo nombre de proyecto es obligatorio.'],
    clientName: [(value) => value.length >= 1, 'El campo nombre de cliente es obligatorio.'],
}

export const ModalClient = ({ clientEdit, setClientEdit, isOpenModalClient, closeModalClient }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [formSubmited, setFormSubmited] = useState(false);

    const handleModalDialogClick = (e) => {
        e.stopPropagation();
    };

    const { startSavingClientAndProject, startEditClientAndProject } = useClientStore();

    const {
        proyectName, clientName, formState, onInputChange, onResetForm, isFormValid,
        proyectNameValid, clientNameValid, setFormState
    } = useForm(formData)

    const handleCancelButton = () => {
        closeModalClient();
        onResetForm();
        setClientEdit(null)
    }

    const onCheckedChange = ({ target }) => {
        const newCheckedState = target.checked;
        setIsChecked(newCheckedState);
        setFormState({
            ...formState,
            [target.name]: newCheckedState
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // setFormSubmited(true);


        if (clientEdit) {

            const id = clientEdit.proyectId;
            const description = formState.proyectName;
            const clientName = formState.clientName;
            const isActive = formState.isActiveProject;

            startEditClientAndProject(id, description, clientName, isActive).then(
                closeModalClient()
            )

        } else {
            const description = formState.proyectName;
            const clientName = formState.clientName;
            const isActive = true;

            startSavingClientAndProject(description, clientName, isActive).then(
                closeModalClient()
            )
        }
    }


    useEffect(() => {
        if (clientEdit) {
            setFormState({
                proyectName: clientEdit.projectName,
                clientName: clientEdit.clientName,
                isActiveProject: clientEdit.isActive,
            });
            setIsChecked(clientEdit.isActive);
        } else {
            setFormState({
                proyectName: "",
                clientName: "",
                isActiveProject: false,
            });
            setIsChecked(false);
        }
    }, [clientEdit]);

    return (
        <>
            <div
                className={`modalInicial ${isOpenModalClient && "modal-abierta"}`}
                onClick={handleCancelButton}>
                <div className="modal-dialog">
                    <div className="modal-content modal-conduct contenido__modal"
                        onClick={handleModalDialogClick}>
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">
                                {clientEdit ? ('Editar cliente') : ('Registrar cliente')}
                            </h3>
                        </div>
                        <hr />
                        <div className="modal-body">
                            <div className="container">
                                <form className="form-change">
                                    <div className="mb-3">
                                        <label htmlFor="projectName" className="form-label">Nombre de proyecto</label>
                                        <input type="text" className="form-control inputChange" name="proyectName" id="projectName" value={proyectName} onChange={onInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="clientName" className="form-label">Nombre de cliente</label>
                                        <input type="text" className="form-control" name="clientName" id="client" value={clientName} onChange={onInputChange} />
                                    </div>

                                    <figcaption className="blockquote-footer">
                                        Si el cliente que buscas no aparece en la lista, selecciona la siguiente opcion
                                    </figcaption>

                                    {
                                        clientEdit ?
                                            (
                                                <div className="mb-3">
                                                    <label htmlFor="checkedNew" className="form-label">Estado</label>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" name="isActiveProject" id="checkedNew" value={isChecked} checked={isChecked} onChange={onCheckedChange} />
                                                        <label className="form-check-label" htmlFor="checkedNew">
                                                            ¿El proyecto esta activo?
                                                        </label>
                                                    </div>
                                                </div>
                                            ) : (null)
                                    }
                                </form>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer modal-btn gap-4">
                            <button type="submit" className="btn btn-outline-primary" onClick={onSubmit}>
                                {clientEdit ? ('Editar cliente') : ('Registrar cliente')}
                            </button>
                            <button
                                type="reset"
                                className="btn btn-outline-danger"
                                onClick={handleCancelButton}
                            >
                                Cancelar registro
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
