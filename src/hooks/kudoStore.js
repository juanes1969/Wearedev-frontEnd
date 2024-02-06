import { useDispatch } from "react-redux";
import { onAddNewKudo, onGetKudoByEmail } from '../store/kudos/kudosSlice';
import configApi from "../api/configApi";
import Swal from "sweetalert2";

export const kudoStore = () => {

    const dispatch = useDispatch();

    const startSavingKudo = async ({ description, userSendId, userReceiveEmail, icon, colorIcon, colorCard, templateId }) => {

        console.log(description, userSendId, userReceiveEmail, icon, colorIcon, colorCard, templateId)
        try {

            const data = await configApi.post('/kudo/register', { description, userSendId, userReceiveEmail, icon, colorIcon, colorCard, templateId });

            const newKudo = data.data.data.KUDOS_REGISTER;

            dispatch(onAddNewKudo(newKudo));

            Swal.fire('Kudo enviado correctamente', `El fue enviado de manera correcta a el correo ${userReceiveEmail}`, 'success')
                .then(x => x.isDismissed(
                    window.location.reload()
                ))

        } catch (error) {
            console.log(error);
        }

    }


    const getKudoByEmail = async ({ emailUser }) => {

        try {
            const data = await configApi.get(`/kudo/byEmail/${emailUser}`);

            const kudosbyEmail = data.data.data;

            dispatch(onGetKudoByEmail(kudosbyEmail));

        } catch (error) {
            Swal.fire('Este usuario no tiene kudos', 'A este usuario no le han enviado kudos aun', 'info');
        }
    }

    return {
        //Propiedades

        //Metodos
        startSavingKudo,
        getKudoByEmail
    }
}
