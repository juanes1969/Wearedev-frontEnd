import { AiOutlineDelete } from 'react-icons/ai'
import { useTimeStore } from '../../hooks';

export const FabDelete = () => {

    const { startDeletingEvent } = useTimeStore();

    const handleDelete = () => {
        startDeletingEvent();
    }
    return (
        <button className='btn btn-danger fab-danger' onClick={handleDelete}>

            <AiOutlineDelete />

        </button>
    )
}
