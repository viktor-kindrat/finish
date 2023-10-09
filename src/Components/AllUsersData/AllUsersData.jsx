import "./Styles/AllUsersData.css"
import { useRef, useState } from "react"

import locationIcon from "./SVG/from.svg"
import userIcon from "./SVG/user.svg"
import placeNumberIcon from "./SVG/place.svg"
import printIcon from "./SVG/print.svg"
import phoneNumberIcon from "./SVG/phone.svg"
import calendarIcon from "./SVG/calendar.svg"
import aditionalInfoIcon from "./SVG/aditionalInfo.svg"

import PrintingTable from "../UI/PrintingTable/PrintingTable"

function AllUsersData({ passangers, allTrips, tripId }) {
    const resetPhoneNumber = (formattedValue) => {
        if (!formattedValue) return formattedValue;
        const digitsOnly = formattedValue.replace(/[^\d]/g, '');
        return digitsOnly;
    };

    const normalizeInput = (value) => {
        if (!value) return value;
        let currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;
        if (cvLength >= 12) currentValue = currentValue.slice(0, 12);
        let formattedValue = '+';
        if (cvLength < 5) {
            formattedValue += currentValue;
        } else if (cvLength < 6) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2)})`;
        } else if (cvLength < 9) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5)}`;
        } else if (cvLength < 11) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8)}`;
        } else {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8, 10)}-${currentValue.slice(10)}`;
        }
        return formattedValue;
    };

    let sortedPassangers = useRef([...passangers].sort((a, b) => {
        return parseInt(resetPhoneNumber(b.initiatorContacts.phone)) - parseInt(resetPhoneNumber(a.initiatorContacts.phone))
    }))

    let [resultingPassangers, setResultingPassangers] = useState(sortedPassangers.current)

    let handleSearch = (e)=>{
        let input = e.target;
        let value = input.value.toLowerCase().trim()
        
        let filteredPassangers = [...sortedPassangers.current].filter((item) => {
            return item.userDetails.name.toLowerCase().indexOf(value) !== -1 ||
                   item.userDetails.surname.toLowerCase().indexOf(value) !== -1 ||
                   item.initiatorContacts.phone.indexOf(value) !== -1 || 
                   normalizeInput(item.initiatorContacts.phone).indexOf(value) !== -1 || 
                   resetPhoneNumber(item.initiatorContacts.phone).indexOf(value) !== -1 || 
                   `+${resetPhoneNumber(item.initiatorContacts.phone)}`.indexOf(value) !== -1 || 
                   resetPhoneNumber(item.initiatorContacts.phone).substring(1).indexOf(value) !== -1 || 
                   item.initiatorContacts.email.indexOf(value) !== -1 ||
                   value.indexOf(item.userDetails.name.toLowerCase()) !== -1 ||
                   value.indexOf(item.userDetails.surname.toLowerCase()) !== -1 ||
                   value.indexOf(item.initiatorContacts.phone) !== -1 || 
                   value.indexOf(normalizeInput(item.initiatorContacts.phone)) !== -1 || 
                   value.indexOf(resetPhoneNumber(item.initiatorContacts.phone)) !== -1 || 
                   value.indexOf(`+${resetPhoneNumber(item.initiatorContacts.phone)}`) !== -1 || 
                   value.indexOf(resetPhoneNumber(item.initiatorContacts.phone).substring(1)) !== -1 || 
                   value.indexOf(item.initiatorContacts.email) !== -1 
        })

        setResultingPassangers(filteredPassangers)
    }

    return (
        <div className="AllUsersData">
            <div className="AllUsersData__head">
                <h3 className="AllUsersData__headline">Пасажири</h3>
                <button onClick={() => window.print()} className="AllUsersData__btn"><img src={printIcon} alt="print" />Друкувати</button>
            </div>
            <div className="AllUsersData__search">
                <div className="AllUsersData__search-input-container">
                    <label htmlFor="searchUserInAllUserList" className="AllUsersData__search-input-label">Пошук пасажира</label>
                    <input onChange={handleSearch} type="text" id="searchUserInAllUserList" className="AllUsersData__search-input" />
                </div>
            </div>
            <div className="AllUserData__container">
                {
                    (passangers && passangers?.length > 0) ? resultingPassangers.map((item, index) => {
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
                                        <span className="AllUserData__thin">Телефон:</span> {normalizeInput(item.initiatorContacts.phone)}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={calendarIcon} alt="Номер телефону" />
                                        <span className="AllUserData__thin">Відправлення:</span> {new Date([...allTrips].filter(item => item._id === tripId)[0].stations.filter(station => (station.city === item.userDetails.from.city && station.country === item.userDetails.from.country))[0].arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={calendarIcon} alt="Номер телефону" />
                                        <span className="AllUserData__thin">Прибуття:</span> {new Date([...allTrips].filter(item => item._id === tripId)[0].stations.filter(station => (station.city === item.userDetails.to.city && station.country === item.userDetails.to.country))[0].arrivalDate).toLocaleString("uk-UA", { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" }).replace(/(.*), (\d+) (.*), (\d+:\d+)/, "$4 $1, $2 $3")}
                                    </div>
                                    <div className="AllUserData__user-field">
                                        <img height={20} width={20} src={aditionalInfoIcon} alt="Додаткова інформація" />
                                        <span className="AllUserData__thin">Додаткова інформація:</span> {item.additionalInformation ? item.additionalInformation : "-"}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p className="AllUsersData__eror-msg">Ніхто ще не забронював жодного місця</p>
                }
            </div>
            <PrintingTable passangers={sortedPassangers.current} allTrips={allTrips} tripId={tripId} />
        </div>
    )
}

export default AllUsersData