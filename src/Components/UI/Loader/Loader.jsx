import "./Styles/Loader.css";

import { useEffect } from "react";
import { gsap } from "gsap";

function Loader({ loaderText, shown }) {
    useEffect(() => {
        if (shown) {
            let tl = gsap.timeline()
            tl.set("body", { overflowY: "hidden" })
                .set(".Loader", { display: "flex" })
                .to(".Loader", { opacity: 1, duration: 0.3 })
        } else {
            setTimeout(() => {
                let tl = gsap.timeline()
                tl.to(".Loader", { opacity: 0, duration: 0.3 })
                    .set(".Loader", { display: "none" })
                    .set("body", { overflowY: "auto" })
            }, 1000);
        }
    }, [shown])

    useEffect(() => {
        gsap.set(".Loader", { opacity: 0 })
        gsap.set(".Loader", { display: "none" })
        gsap.set("body", { overflowY: "auto" })
    }, [])
    return (
        <div className="Loader">
            <div className="loader-wrapper">
                <div className="truck-wrapper">
                    <div className="truck">
                        <div className="truck-container"></div>
                        <div className="glases"></div>
                        <div className="bonet"></div>

                        <div className="base"></div>

                        <div className="base-aux"></div>
                        <div className="wheel-back"></div>
                        <div className="wheel-front"></div>

                        <div className="smoke"></div>
                    </div>
                </div>
            </div>

            <span className="Loader__text" data-text={loaderText ? loaderText : "Loading"}></span>
        </div>
    )
}

export default Loader