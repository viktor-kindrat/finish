import "./Styles/ContactsField.css"
import checkIcon from "./SVG/check.svg"

function ContactsField () {
    return (
        <div className="ContactsField">
            <h3 className="ContactsField__headline"> <span className="ContactsField__headline_number">3</span> Контакти</h3>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Ім'я</div>
                <input type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Прізвище</div>
                <input type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">E-mail</div>
                <input type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__input-group">
                <div className="ContactsField__input-label">Номер телефону</div>
                <input type="text" className="ContactsField__input" />
            </div>
            <div className="ContactsField__checkbox-group">
                <div className="ContactsField__checkbox-box-group">
                    <label htmlFor="ContactField-create-account" className="ContactField__custom-checkbox"><img src={checkIcon} alt="check" /></label>
                    <input className="ContactField__origin-checkbox" type="checkbox" id="ContactField-create-account" />
                </div>
                <div className="ContactsField__checkbox-label">Зарееструвати аккаунт </div>
            </div>
            <button className="ContactsField__btn">Забронювати</button>
        </div>
    )
}

export default ContactsField