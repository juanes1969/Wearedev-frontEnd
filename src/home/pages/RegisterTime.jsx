import { addHours } from 'date-fns'
import { useSelector } from 'react-redux'
import { useTimeStore, useUiStore } from '../../hooks'
import { CalendarItem } from '../../ui/components/CalendarItem'
import { CalendarModal } from '../components/CalendarModal'
import { FabDelete } from '../components/FabDelete'
import { Navbar } from '../components/Navbar'
import './styles/RegisterTimes.css'

export const RegisterTime = () => {


    // const { openDateModal } = useUiStore();
    // const { setActiveEvent, hasEventSelected } = useTimeStore();
    // const { isDateModalOpen } = useUiStore();

    // const { user } = useSelector(state => state.auth);

    // const handleClickNew = () => {
    //     setActiveEvent({
    //         title: '',
    //         description: '',
    //         start: new Date(),
    //         end: addHours(new Date(), 2),
    //         isOvertime: false,
    //         userId: user.id,
    //         clientId: null,
    //         proyectId: null,
    //         stateId: 1
    //     });

    //     openDateModal();
    // }

    return (

        <>
            <Navbar />

            

            {/* <div className="container">
                <section className="home-textr">
                    {(hasEventSelected && isDateModalOpen == false) ?
                        <div className="containerDelete">
                            <FabDelete />
                        </div>
                        : null
                    }
                    <div className="row">
                        <div className="col-lg-8 calendarRow">
                            <span>
                                <CalendarItem />
                            </span>
                        </div>
                        <div className="col-lg-4">
                            <span className="btn-register-time">
                                <button className="btn btn-primary mt-5" onClick={handleClickNew}>Registro de tiempos</button>
                            </span>
                        </div>
                    </div>
                </section>
            </div>

            <CalendarModal /> */}
        </>
    )
}
