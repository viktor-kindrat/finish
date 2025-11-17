import "./Styles/TripCard.css"

import rightArrow from "./SVG/right.svg"

function TripCard({ setViewData, setModalData, setUserData, setAlertData, trigger, setTrigger, SERVER, setCookie, getCookie, setEditorData, data, editorOpened, setEditorOpened, viewOpened, setViewOpened }) {
    let handleEdit = () => {
        setEditorOpened(true);
        setEditorData({
            ...data,
            isNew: false
        })
    }

    let handleRemove = () => {
        setModalData({
            delay: 0,
            show: true,
            message: "Are you sure you want to delete this trip?",
            confirmCaption: "Yes",
            rejectCaption: "No",
            confirmAction: () => {
                let sendData = { id: data._id };
                SERVER("Deleting...", "POST", "book/admin/remove-trip", "application/json", sendData, getCookie("userToken"))
                    .then(data => {
                        if (data.errorMessage?.toLowerCase().includes("token")) {
                            setAlertData({
                                delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in again",
                                action: () => {
                                    setUserData(undefined);
                                    sessionStorage.clear()
                                }
                            })
                            return
                        }
                        if (data.errorMessage?.toLowerCase().includes("validation")) {
                            setAlertData({ delay: 0.9, show: true, message: "It seems some fields are empty or filled incorrectly! Please check again.", actionCaption: "Close", action: () => { } })
                            return
                        }
                        setAlertData({
                            delay: 0.9, show: true, message: data.message, actionCaption: "Close", action: () => setTrigger(!trigger)
                        })
                    })
            },
            rejectAction: () => { },
        })
    }

    let handleView = ()=>{
        setViewData(data)
        setViewOpened(true)
    }

    let handleClone = ()=>{
        setEditorOpened(true);
        setEditorData({
            ...data,
            places: [],
            isNew: true
        })
    }
    return (
        <article className="TripCard">
            <div className="TripCard__locations">
                <div className="TripCard__group">
                    <div className="TripCard__info TripCard__info_bold">{new Date(data.stations[0].arrivalDate).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</div>
                    <div className="TripCard__info">{data.stations[0].country} - {data.stations[0].city}<br />({data.stations[0].location.caption})</div>
                </div>
                <div className="TripCard__sign">
                    <img height={20} width={20} src={rightArrow} alt="->" />
                </div>
                <div className="TripCard__group">
                    <div className="TripCard__info TripCard__info_bold">{new Date(data.stations[data.stations.length - 1].arrivalDate).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</div>
                    <div className="TripCard__info">{data.stations[data.stations.length - 1].country} - {data.stations[data.stations.length - 1].city}<br />({data.stations[data.stations.length - 1].location.caption})</div>
                </div>
            </div>
            <div className="TripCard__controll">
                <h3 className="TripCard__headline">{data.name}</h3>
                <div className="TripCard__places-info"><span className="TripCard__places-info_green">{data.places.length}</span>/<span className="TripCard__places-info_red">63</span></div>
                <div className="TripCard__controll-btn-place">
                    <button onClick={handleView} className="TripCard__controll-btn TripCard__controll-btn_green">Details</button>
                    <button onClick={handleEdit} className="TripCard__controll-btn TripCard__controll-btn_orange">Edit</button>
                    <button onClick={handleClone} className="TripCard__controll-btn TripCard__controll-btn_blue">Clone</button>
                    <button onClick={handleRemove} className="TripCard__controll-btn TripCard__controll-btn_red">Delete</button>
                </div>
            </div>
        </article>
    )
}

export default TripCard