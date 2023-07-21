import "./Styles/BookingMenu.css"

import PassangersList from "../PassangersList/PassangersList"
import PlacesSet from "../PlacesSet/PlacesSet"
import ContactsField from "../ContactsField/ContactsField"

function BookingMenu ({id}){
    return (
        <div className="BookingMenu" data-id={id}>
            <PassangersList />
            <PlacesSet />
            <ContactsField />
        </div>
    )
}

export default BookingMenu