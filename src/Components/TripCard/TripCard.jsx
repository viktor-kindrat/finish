import "./Styles/TripCard.css"

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
            message: "Ви впевнені що хочете видалити цей рейс?",
            confirmCaption: "Так",
            rejectCaption: "Ні",
            confirmAction: () => {
                let sendData = { id: data._id };
                SERVER("Видаляємо", "POST", "book/admin/remove-trip", "application/json", sendData, getCookie("userToken"))
                    .then(data => {
                        if (data.errorMessage?.toLowerCase().includes("token")) {
                            setAlertData({
                                delay: 0.9, show: true, message: "Схоже термін дії вашого входу минув. Увійдіть знову!", actionCaption: "Увійти знову",
                                action: () => {
                                    setUserData(undefined);
                                    sessionStorage.clear()
                                }
                            })
                            return
                        }
                        if (data.errorMessage?.toLowerCase().includes("validation")) {
                            setAlertData({ delay: 0.9, show: true, message: "Схоже деякі поля залишились порожніми, або заповнені некоректно! Перевірте все ще раз та спробуйте знову.", actionCaption: "закрити", action: () => { } })
                            return
                        }
                        setAlertData({
                            delay: 0.9, show: true, message: data.message, actionCaption: "Закрити", action: () => setTrigger(!trigger)
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
                    <div className="TripCard__info TripCard__info_bold">{new Date(data.stations[0].arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</div>
                    <div className="TripCard__info">{data.stations[0].country} - {data.stations[0].city}<br />({data.stations[0].location.caption})</div>
                </div>
                <div className="TripCard__sign">
                    &#8594;
                </div>
                <div className="TripCard__group">
                    <div className="TripCard__info TripCard__info_bold">{new Date(data.stations[data.stations.length - 1].arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}</div>
                    <div className="TripCard__info">{data.stations[data.stations.length - 1].country} - {data.stations[data.stations.length - 1].city}<br />({data.stations[data.stations.length - 1].location.caption})</div>
                </div>
            </div>
            <div className="TripCard__controll">
                <h3 className="TripCard__headline">{data.name}</h3>
                <div className="TripCard__places-info"><span className="TripCard__places-info_green">{data.places.length}</span>/<span className="TripCard__places-info_red">63</span></div>
                <div className="TripCard__controll-btn-place">
                    <button onClick={handleView} className="TripCard__controll-btn TripCard__controll-btn_green">Подробиці</button>
                    <button onClick={handleEdit} className="TripCard__controll-btn TripCard__controll-btn_orange">Редагувати</button>
                    <button onClick={handleRemove} className="TripCard__controll-btn TripCard__controll-btn_red">Видалити</button>
                    <button onClick={handleClone} className="TripCard__controll-btn TripCard__controll-btn_blue">Клонувати</button>
                </div>
            </div>
        </article>
    )
}

export default TripCard