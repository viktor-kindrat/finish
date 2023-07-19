import viberIcon from "./Images/viber.webp"
import whatsappIcon from "./Images/whatsapp.webp"
import phoneIcon from "./SVG/phone.svg"

function HeaderNavDesktop (){
    return (
        <div className="Header__nav-wrap">
                <nav className="Header__nav">
                    <ul className="Header__nav-list">
                        <li className="Header__nav-list-item Header__nav-list-item_selected">Головна</li>
                        <li className="Header__nav-list-item">Пошук</li>
                        <li className="Header__nav-list-item">Як забронювати?</li>
                        <li className="Header__nav-list-item">Мій акаунт</li>
                    </ul>
                </nav>
                <div className="Header__contacts">
                    <a href="/" className="Header__contacts-item"><img height={35} src={viberIcon} alt="viber" className="Header__contacts-item-image" /></a>
                    <a href="/" className="Header__contacts-item"><img height={35} src={whatsappIcon} alt="whatsapp" /></a>
                    <a href="tel:+380666990301" className="Header__phone">
                        <div className="Header__phone-icon-wrapper">
                            <img height={25} src={phoneIcon} alt="" className="Header__phone-icon" />
                        </div>
                        <div className="Header__phone-info-wrapper">
                            <h3 className="Header__headline">Допомога</h3>
                            <p className="Header__phone-text">+38(066) 699 03 01</p>
                        </div>
                    </a>
                </div>
            </div>
    )
}

export default HeaderNavDesktop