import '../style/Loading.css'

export const CheckingAuth = () => {
    return (
        <div className="container loadingContainer">
            <div className="itemContainer">
                <div className="spinner-border m-5 text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}
