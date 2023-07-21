import "./Styles/BookingMenu.css"

import PassangersList from "../PassangersList/PassangersList"
import PlacesSet from "../PlacesSet/PlacesSet"
import ContactsField from "../ContactsField/ContactsField"

function BookingMenu (){
    return (
        <div className="BookingMenu">
            <PassangersList />
            <PlacesSet />
            <ContactsField />
        </div>
    )
}

export default BookingMenu