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
            <div class="loader-wrapper">
                <div class="truck-wrapper">
                    <div class="truck">
                        <div class="truck-container"></div>
                        <div class="glases"></div>
                        <div class="bonet"></div>

                        <div class="base"></div>

                        <div class="base-aux"></div>
                        <div class="wheel-back"></div>
                        <div class="wheel-front"></div>

                        <div class="smoke"></div>
                    </div>
                </div>
            </div>

            <span class="Loader__text" data-text={loaderText ? loaderText : "Завантаження"}></span>
        </div>
    )
}

export default Loader