import "./Styles/AllUsersData.css"

import locationIcon from "./SVG/from.svg"
import userIcon from "./SVG/user.svg"
import placeNumberIcon from "./SVG/place.svg"
import printIcon from "./SVG/print.svg"
import phoneNumberIcon from "./SVG/phone.svg"
import calendarIcon from "./SVG/calendar.svg"

function AllUsersData({ passangers, allTrips, tripId }) {
    return (
        <div className="AllUsersData">
            <div className="AllUsersData__head">
                <h3 className="AllUsersData__headline">Пасажири</h3>
                <button onClick={()=>window.print()} className="AllUsersData__btn"><img src={printIcon} alt="print" />Друкувати</button>
            </div>
            <div className="AllUserData__container">
                {
                    (passangers && passangers?.length > 0) ? [...passangers].sort((a, b) => parseInt(a.placeNumber) - parseInt(b.placeNumber)).map((item, index) => {
                        return (
                            <div key={index} className="AllUsersData__user">
                                <div className="AllUserData__info">
                                    <h4 className="AllUserData__subheadline">{item.userDetails.surname} {item.userDetails.name}</h4>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={placeNumberIcon} alt="Місце" />
                                        <span className="AllUserData__thin">Місце:</span> {item.placeNumber}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={userIcon} alt="Тип" />
                                        <span className="AllUserData__thin">Тип білету:</span> {item.age === "adult" ? "Дорослий" : "Дитячий"}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={locationIcon} alt="З" />
                                        <span className="AllUserData__thin">Місце посадки:</span> {item.userDetails.name === "броньовано" ? "невідомо" : item.userDetails.from.country} {item.userDetails.name === "броньовано" ? "" : "-"} {item.userDetails.name === "броньовано" ? "" : item.userDetails.from.city}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={locationIcon} alt="До" />
                                        <span className="AllUserData__thin">Місце висадки:</span> {item.userDetails.name === "броньовано" ? "невідомо" : item.userDetails.to.country} {item.userDetails.name === "броньовано" ? "" : "-"}  {item.userDetails.name === "броньовано" ? "" : item.userDetails.to.city}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={phoneNumberIcon} alt="Номер телефону" />
                                        <span className="AllUserData__thin">Телефон:</span> {item.initiatorContacts.phone}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={calendarIcon} alt="Номер телефону" />
                                        <span className="AllUserData__thin">Відправлення:</span> {new Date(allTrips.filter(item=>item._id === tripId)[0].stations.filter(station=>(station.city === item.userDetails.from.city && station.country === item.userDetails.from.country))[0].arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={calendarIcon} alt="Номер телефону" />
                                        <span className="AllUserData__thin">Прибуття:</span> {new Date(allTrips.filter(item=>item._id === tripId)[0].stations.filter(station=>(station.city === item.userDetails.to.city && station.country === item.userDetails.to.country))[0].arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p className="AllUsersData__eror-msg">Ніхто ще не забронював жодного місця</p>
                }
            </div>
        </div>
    )
}

export default AllUsersData