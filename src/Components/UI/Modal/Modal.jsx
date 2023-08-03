import "./Styles/Modal.css"

import { gsap } from "gsap"
import { useEffect } from "react"

function Modal({ show, delay, message, confirmCaption, rejectCaption, confirmAction, rejectAction, close }) {
    useEffect(() => {
        if (show) {
            let tl = gsap.timeline()
            tl.set("body", { delay: delay, overflowY: "hidden" })
                .set(".Modal", { display: "flex" })
                .to(".Modal", { opacity: 1, duration: 0.3 })
        } else {
            let tl = gsap.timeline()
            tl.to(".Modal", { opacity: 0, duration: 0.3 })
                .set(".Modal", { display: "none" })
                .set("body", { overflowY: "auto" })
        }
    }, [show, delay])

    return (

        <div className="Modal">
            <div className="Modal__card">
                <h2 className="Modal__message">{message}</h2>
                <div className="Modal__btn-place">
                    <button onClick={() => {
                        close()
                        confirmAction()
                    }} className="Modal__button Modal__button_confirm">{confirmCaption}</button>
                    <button onClick={() => {
                        close()
                        rejectAction()
                    }} className="Modal__button Modal__button_reject">{rejectCaption}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal