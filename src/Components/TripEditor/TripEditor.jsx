import "./Styles/TripEditor.css"

import addIcon from "./SVG/plus.svg"

import TripEditorCard from "./TripEditorCard"

function TripEditor({ trigger, setTrigger, setUserData, alertData, setAlertData, getCookie, setCookie, SERVER, setModalData, modalData, emptyEditorData, editorOpened, setEditorOpened, editorData, setEditorData }) {
    let handlePushNewStation = (e) => {
        let newEditorData = { ...editorData };
        let lastStation = newEditorData.stations.pop();
        let newStation = {
            id: newEditorData.stations.length,
            country: "",
            city: "",
            location: {
                caption: "",
                longitude: 30.519707783342987,
                latitude: 50.40651654819113
            },
            arrivalDate: "",
            price: {
                adult: 0,
                child: 0
            }
        }
        newEditorData.stations.push(newStation);
        lastStation.id = newEditorData.stations.length;
        newEditorData.stations.push(lastStation)
        setEditorData(newEditorData)
    }

    const normalizeInput = (value) => {
        if (!value) return value;
        let currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;
        if (cvLength >= 12) currentValue = currentValue.slice(0, 12);
        let formattedValue = '+';
        if (cvLength < 5) {
            formattedValue += currentValue;
        } else if (cvLength < 6) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2)})`;
        } else if (cvLength < 9) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5)}`;
        } else if (cvLength < 11) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8)}`;
        } else {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8, 10)}-${currentValue.slice(10)}`;
        }
        return formattedValue;
    };

    let handleChangePhone = (e) => {
        setEditorData({ ...editorData, phoneNumber: normalizeInput(e.target.value) })
    }

    let handleChangeData = (e) => {
        let data = { ...editorData };
        data[e.target.name] = e.target.value;
        setEditorData(data);
    }

    let handleCancelEdit = () => {
        setEditorOpened(false)
        setEditorData({ ...emptyEditorData })
    }

    let saveData = () => {
        SERVER("Saving trip...", "POST", "book/admin/create-trip", "application/json", editorData, getCookie("userToken"))
            .then(data => {
                if (data.errorMessage?.toLowerCase().includes("token")) {
                    setAlertData({
                        delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in again",
                        action: () => {
                            setUserData(undefined);
                            sessionStorage.clear()
                        }
                    })
                    return
                }
                if (data.errorMessage?.toLowerCase().includes("validation")) {
                    setAlertData({ delay: 0.9, show: true, message: "It seems some fields are empty or filled incorrectly! Please check again.", actionCaption: "Close", action: () => { } })
                    return
                }
                setAlertData({
                    delay: 0.9, show: true, message: data.message, actionCaption: "To Trips", action: () => {
                        setEditorData(emptyEditorData);
                        setEditorOpened(false)
                        setTrigger(!trigger)
                    }
                })
            })
    }

    let updateData = () => {
        SERVER("Saving trip...", "POST", "book/admin/edit-trip", "application/json", { ...editorData, id: editorData._id }, getCookie("userToken"))
            .then(data => {
                if (data.errorMessage?.toLowerCase().includes("token")) {
                    setAlertData({
                        delay: 0.9, show: true, message: "Your session has expired. Please log in again!", actionCaption: "Log in again",
                        action: () => {
                            setUserData(undefined);
                            sessionStorage.clear()
                        }
                    })
                    return
                }
                if (data.errorMessage?.toLowerCase().includes("validation")) {
                    setAlertData({ delay: 0.9, show: true, message: "It seems some fields are empty or filled incorrectly! Please check again.", actionCaption: "Close", action: () => { } })
                    return
                }
                setAlertData({
                    delay: 0.9, show: true, message: data.message, actionCaption: "To Trips", action: () => {
                        setEditorData(emptyEditorData);
                        setEditorOpened(false)
                        setTrigger(!trigger)
                    }
                })
            })
    }

    let handleSave = (e) => {
        setModalData({
            delay: 0,
            show: true,
            message: "Are you sure the entered data is correct?",
            confirmCaption: "Yes",
            rejectCaption: "No",
            confirmAction: () => {
                setModalData({
                    delay: 0, show: true, message: "Save this trip?", confirmCaption: "Yes", rejectCaption: "No",
                    confirmAction: () => {
                        editorData.isNew ? saveData() : updateData();
                        setModalData({ ...modalData, show: false, delay: 0 })
                    },
                    resetAction: () => {
                        setModalData({ ...modalData, show: false, delay: 0 })
                    }
                })
            },
            rejectAction: () => { },
        })
    }
    return (
        <div className="TripEditor">
            <button onClick={handleCancelEdit} className="TripEditor__save-btn TripEditor__save-btn_outlined">&#8592; Back</button>
            <div className="TripEditor__card">
                <h2 className="TripEditor__headline">New Trip</h2>
                <div className="TripEditor__card-content">
                    <div className="TripEditor__input-conatiner">
                        <div className="TripEditor__input-label">Trip Name</div>
                        <input onChange={handleChangeData} value={editorData.name} name="name" type="text" className="TripEditor__input" />
                    </div>
                    <div className="TripEditor__input-conatiner">
                        <div className="TripEditor__input-label">Driver</div>
                        <input onChange={handleChangeData} value={editorData.driver} name="driver" type="text" className="TripEditor__input" />
                    </div>
                    <div className="TripEditor__input-conatiner">
                        <div className="TripEditor__input-label">Phone Number</div>
                        <input onChange={handleChangePhone} value={editorData.phoneNumber} name="phoneNumber" type="text" className="TripEditor__input" />
                    </div>
                </div>
            </div>
            <div className="TripEditor__wrap">
                <TripEditorCard finish={false} {...{ data: editorData.stations[0], editorData, setEditorData }} />
                <div className="TripEditor__container">
                    {
                        editorData.stations.map((el, id) =>
                            (id === 0 || id === editorData.stations.length - 1) ? "" : <TripEditorCard finish={false} key={id} {...{ data: el, editorData, setEditorData }} />
                        )
                    }
                </div>
                <button onClick={handlePushNewStation} className="TripEditor__add-btn"> Add Stop <img height={12} src={addIcon} alt="" /></button>
                <TripEditorCard finish={true} {...{ data: editorData.stations[editorData.stations.length - 1], editorData, setEditorData }} />
            </div>
            <button onClick={handleSave} className="TripEditor__save-btn">Save</button>
        </div>
    )
}

export default TripEditor