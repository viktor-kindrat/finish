import "./Styles/Alert.css";

function Alert({message, actionCaption, action}) {
    return (
        <div className="Alert">
            <div className="Alert__card">
                <h2 className="Alert__message">{message}</h2>
                <button onClick={action} className="Alert__button">{actionCaption}</button>
            </div>
        </div>
    )
}

export default Alert