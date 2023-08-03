import "./Styles/Alert.css";

import { useEffect } from "react";
import { gsap } from "gsap";

function Alert({delay, show, message, actionCaption, action, close }) {
    useEffect(() => {
        if (show) {
            let tl = gsap.timeline()
            tl.set("body", { delay: delay, overflowY: "hidden" })
                .set(".Alert", { display: "flex" })
                .to(".Alert", { opacity: 1, duration: 0.3 })
        }
    }, [show, delay])
    let handleClick = () => {
        let tl = gsap.timeline()
        tl.to(".Alert", { opacity: 0, duration: 0.3 })
            .set(".Alert", { display: "none" })
            .set("body", { overflowY: "auto" })
            .then(()=>{
                close();
                action();
            });
    }
    return (
        <div className="Alert">
            <div className="Alert__card">
                <h2 className="Alert__message">{message}</h2>
                <button onClick={handleClick} className="Alert__button">{actionCaption}</button>
            </div>
        </div>
    )
}

export default Alert