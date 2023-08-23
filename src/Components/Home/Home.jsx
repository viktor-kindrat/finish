import { useState, useEffect } from "react";
import "./Styles/Home.css";
import mainImage from "./Images/main.webp";
import mainBetterImage from "./Images/mainBetterQual.webp";
import HomeBooking from "./HomeBooking"
import SearchingResult from "../SearchingResult/SearchingResult";

import { Routes, Route, useLocation } from "react-router-dom"

const places = {
    "Україна": ["Київ", "Чернівці", "Коломия", "Франківськ", "Стрий", "Львів", "Мукачево"],
    "Франція": ["Канни", "Ніцці", "Антіб", "Монако", "Ментон"],
    "Італія": ["Санремо", "Імперія", "Аласіо", "Альбенга", "Вентимілія неділя", "Лоано", "Петра", "Фінале", "Савона", "Верона", "Мілан"],
};

function Home({userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER}) {
    let [peoples, setPeoples] = useState({ adults: 1, children: 0 })
    let [from, setFrom] = useState({ country: "Пункт відправлення", place: "" });
    let [to, setTo] = useState({ country: "Місце прибуття", place: "" });
    let [date, setDate] = useState("");

    let [searchingData, setSearchingData] = useState(undefined)
    let [triggerSearch, setTriggerSearch] = useState(false)
    let [passangerOpened, setPassangerOpened] = useState(false);

    let location = useLocation()

    useEffect(()=>{
        let changeImageHandler = (e)=>{
            if (document.querySelector(".Home__bgImage")){
                document.querySelector(".Home__bgImage").src = mainBetterImage
            }
        }

        document.querySelector(".Home__bgImage")?.addEventListener("load", changeImageHandler)

        return ()=>{
            document.querySelector(".Home__bgImage")?.removeEventListener("load", changeImageHandler)
        }
    }, [location])

    return (
        <section className="Home">
            <Routes>
                <Route path="/" element={
                    <>
                        <div className="Home__head-group">
                            <img loading="lazy" className="Home__bgImage" src={mainImage} alt="main" />
                            <h1 className="Home__headline">Україна - Італія - Франція</h1>
                        </div>
                        <HomeBooking {...{ triggerSearch, setTriggerSearch, searchingData, setSearchingData, date, setDate, places, peoples, setPeoples, from, setFrom, to, setTo, passangerOpened, setPassangerOpened }} />
                    </>
                } />
                <Route path="/search" element={
                    <>
                        <HomeBooking {...{ triggerSearch, setTriggerSearch, searchingData, setSearchingData, date, setDate, places, peoples, setPeoples, from, setFrom, to, setTo, passangerOpened, setPassangerOpened }} />
                        <SearchingResult{...{ searchingData, setSearchingData, triggerSearch, setTriggerSearch, userData, setUserData, alertData, setAlertData, modalData, setModalData, getCookie, setCookie, SERVER }} />
                    </>
                } />
            </Routes>

        </section>
    );
}

export default Home;
