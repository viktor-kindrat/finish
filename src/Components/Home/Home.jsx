import "./Styles/Home.css"

import mainImage from "./Images/main.webp"

function Home() {
    return (
        <section className="Home">
            <div className="Home__head-group">
                <img className="Home__bgImage" src={mainImage} alt="main" />
                <h1 className="Home__headline">Бронювання білетів</h1>
            </div>
        </section>
    )
}

export default Home