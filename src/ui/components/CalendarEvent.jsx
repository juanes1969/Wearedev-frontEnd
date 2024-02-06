
export const CalendarEvent = ({ event, onChangeApprovalTimeByid, ids }) => {

    const { title, hoursDiary, stateId } = event;

    return (
        <>
            <div className="text-center" >
                <input type='checkbox' className='form-check-input' checked={ids.includes(event.id)} value={event.id} onChange={onChangeApprovalTimeByid} disabled={stateId === 2 || stateId === 3 ? true : false} />
            </div>
            <strong style={{ pointerEvents: 'none' }}>{title}</strong>
            <br />
            <div className="text-center" style={{ pointerEvents: 'none' }}>
                <span> {hoursDiary}</span>
            </div>

        </>
    )
}
