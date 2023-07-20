import { useState } from "react";
import "./Styles/Home.css";
import mainImage from "./Images/main.webp";
import HomeBooking from "./HomeBooking"
import SearchingResult from "../SearchingResult/SearchingResult";

const places = {
    "Україна": ["Київ", "Чернівці", "Коломия", "Франківськ", "Стрий", "Львів", "Мукачево"],
    "Франція": ["Канни", "Ніцці", "Антіб", "Монако", "Ментон"],
    "Італія": ["Санремо", "Імперія", "Аласіо", "Альбенга", "Вентимілія неділя", "Лоано", "Петра", "Фінале", "Савона", "Верона", "Мілан"],
};

function Home() {
    let [peoples, setPeoples] = useState({ adults: 1, children: 0 })
    let [from, setFrom] = useState({ country: "Пункт відправлення", place: "" });
    let [to, setTo] = useState({ country: "Місце прибуття", place: "" });
    let [passangerOpened, setPassangerOpened] = useState(false);
    let [searching, setSearching] = useState(false)

    return (
        <section className="Home">
            <div className="Home__head-group">
                <img className="Home__bgImage" src={mainImage} alt="main" />
                <h1 className="Home__headline">Бронювання білетів</h1>
            </div>
            <HomeBooking {...{searching, setSearching, places, peoples, setPeoples, from, setFrom, to, setTo, passangerOpened, setPassangerOpened}} />
            {searching ? <SearchingResult {...{peoples}} /> : ""}
        </section>
    );
}

export default Home;
