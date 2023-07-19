import "./Styles/HeaderNavMobile.css"
import tgIcon from "../Images/telegram.webp";
import whatsappIcon from "../Images/whatsapp.webp";
import viberIcon from "../Images/viber.webp"


function HeaderNavMobile (){
    return (
        <div className="HeaderNavMobile">
            <div className="HeaderNavMobile__section">
                <h2 className="HeaderNavMobile__headline">Контакти</h2>
                <div className="HeaderNavMobile__info">
                    <p className="HeaderNavMobile__info-data">+38 (065) 641-48-46</p>
                    <p className="HeaderNavMobile__info-data">+38 (065) 641-48-46</p>
                    <p className="HeaderNavMobile__info-data HeaderNavMobile__info-data_bold">help@mail.com</p>
                </div>
            </div>
            <div className="HeaderNavMobile__section">
                <h2 className="HeaderNavMobile__headline">Треба допомога?</h2>
                <div className="HeaderNavMobile__info">
                    <div className="HeaderNavMobile__info-caption">Вкажіть свій контактний телефон і наш спеціаліст зв'яжеться з Вами</div>
                    <input type="tel" placeholder="+38(___)___-__-__" className="HeaderNavMobile__input" />
                    <button className="HeaderNavMobile__btn">Відправити</button>
                </div>
            </div>
            <div className="HeaderNavMobile__socials">
                <a href="/" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={tgIcon} alt="telegram" />
                </a>
                <a href="/" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={whatsappIcon} alt="whatsapp" />
                </a>
                <a href="/" className="HeaderNavMobile__socials-item">
                    <img height={80} className="HeaderNavMobile__socials-icon" src={viberIcon} alt="viber" />
                </a>
            </div>
            <div className="HeaderNavMobile__footer">
                <a href="/">Политика конфиденциальности</a> | <a href="/">Безопасная оплата</a> | <a href="/">FAQ</a>
            </div>
        </div>
    )
}

export default HeaderNavMobile