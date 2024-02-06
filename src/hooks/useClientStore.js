import Swal from "sweetalert2";
import configApi from "../api/configApi";

export const useClientStore = () => {


    const startSavingClientAndProject = async (description, clientName, isActive) => {

        try {
            const dataId = await configApi.get(`/client/listClientName/${clientName}`);
            const idClient = dataId.data.data.clientId;

            if (idClient === 0) {
                //Ejecuta cliente y proyecto                
                const resp = await configApi.post(`/client/registerClient`, { description: clientName });

                const idCreated = resp.data.data.id;

                await configApi.post(`/project/registerProyect`, { description: description, clientId: [idCreated], isActive: isActive });

                Swal.fire('Felicidades', 'Se ah creado tu cliente y tu proyecto de manera correcta', 'success').then(x => x.isDismissed(
                    window.location.reload()
                ))
            } else {
                await configApi.post(`/project/registerProyect`, { description: description, clientId: [idClient], isActive, isActive });

                Swal.fire('Felicidades', 'Se ah creado tu proyecto de manera correcta', 'success').then(x => x.isDismissed(
                    window.location.reload()
                ))
            }

        } catch (error) {
            console.log(error);
        }
    }

    const startEditClientAndProject = async (id, description, clientName, isActive) => {
        try {
            const dataId = await configApi.get(`/client/listClientName/${clientName}`);

            const idClient = dataId.data.data.clientId;

            if (idClient === 0) {

                const resp = await configApi.post(`/client/registerClient`, { description: clientName });

                const idCreated = resp.data.data.id;

                await configApi.put(`/project/updateProject`, { id: id, description: description, clientId: idCreated, isActive: isActive });

                Swal.fire('Felicidades', 'Se ah actualizado tu proyecto y se ah creado un nuevo cliente', 'success').then(x => x.isDismissed(
                    window.location.reload()
                ))
            } else {
                await configApi.put(`/project/updateProject`, { id: id, description: description, clientId: idClient, isActive: isActive });

                Swal.fire('Felicidades', 'Actualizacion exitosa', 'success').then(x => x.isDismissed(
                    window.location.reload()
                ))

            }

        } catch (error) {
            console.log(error);
        }
    }

    const startDeletingProject = async (idProject) => {
        try {
            Swal.fire({
                title: "Eliminar projecto",
                text: "¿Quieres eliminar este proyecto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar eliminado",
                cancelButtonText: "No, deseo conservarlo"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await configApi.put(`/project/updateState/${idProject}`);
                    Swal.fire({
                        title: "Felicidades!!",
                        text: "Projecto eliminado con exito.",
                        icon: "success"
                    }).then(x => x.isDismissed(
                        window.location.reload()
                    ))
                } else if (result.isDenied) {
                    window.location.href = '/clientsRegister'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    return {
        //Propiedades

        //Metodos
        startSavingClientAndProject,
        startDeletingProject,
        startEditClientAndProject
    }
}
