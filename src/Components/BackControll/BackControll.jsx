import "./Styles/BackControll.css"

import BackControlItem from "./BackControlItem";
import BuiltInLoader from "../UI/BuiltInLoader/BuiltInLoader";

import { useNavigate } from "react-router-dom";

import { useEffect, useState, useRef, useContext } from "react";
import hrefContext from "../../Context/ServerHostnameContext";

function BackControll({ getCookie, setCookie, userData, setUserData, alertData, setAlertData, SERVER }) {
    let [pending, setPending] = useState(true);
    let [trigger, setTrigger] = useState(false)
    let storage = useRef(undefined);
    let server = useContext(hrefContext).server;

    let go = useNavigate()

    useEffect(() => {
        fetch(`${server}book/admin/get-all-cancelations`, { headers: { Authorization: `Baerer ${getCookie("userToken")}` } })
            .then(res => res.json())
            .then(data => {
                if (data.errorMessage?.toLowerCase().includes("token")) {
                    setAlertData({
                        delay: 0.9, show: true, message: "Схоже термін дії вашого входу минув. Увійдіть знову!", actionCaption: "Увійти знову",
                        action: () => {
                            setUserData(undefined);
                            go("/authorization");
                            sessionStorage.clear();
                        }
                    })
                    return
                }
                storage.current = data.data;
                setPending(false)
            })
            .catch(e => console.log(e))
    }, [trigger, getCookie, go, server, setAlertData, setUserData])

    return (
        <section className="BackControll">
            <h2 className="BackControll__headline">Повернення</h2>
            <div className="BackControll__container">
                {
                    storage.current && !pending ?
                        storage.current.length !== 0 ? storage.current.map(item =>
                            <BackControlItem key={item._id} data={item} {...{ getCookie, setAlertData, setUserData, SERVER, trigger, setTrigger }} />
                        ) : "Нових скасувань немає"
                        : <BuiltInLoader />
                }
            </div>
        </section>
    )
}

export default BackControll