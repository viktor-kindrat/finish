import "./Styles/TripCard.css"

function TripCard({ setEditorData, data, editorOpened, setEditorOpened, viewOpened, setViewOpened }) {
    let handleEdit = ()=>{
        setEditorOpened(true);
        setEditorData({
            ...data,
            isNew: false
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
                    <button onClick={() => setViewOpened(true)} className="TripCard__controll-btn TripCard__controll-btn_green">Подробиці</button>
                    <button onClick={handleEdit} className="TripCard__controll-btn TripCard__controll-btn_orange">Редагувати</button>
                    <button className="TripCard__controll-btn TripCard__controll-btn_red">Видалити</button>
                </div>
            </div>
        </article>
    )
}

export default TripCard