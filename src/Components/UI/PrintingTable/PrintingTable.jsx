import "./Styles/PrintingTable.css"

function PrintingTable({passangers, allTrips, tripId}){
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

    console.log("printing log", passangers, allTrips, tripId)

    return (
        <div className="PrintingTable">
            <table cellspaceing="0" className="PrintingTable__table-body">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>звідки</th>
                        <th>куди</th>
                        <th>номер місця</th>
                        <th>ПІБ</th>
                        <th>номер телефону</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        (passangers && passangers?.length > 0) ? [...passangers].sort((a, b) => {
                            if (`${a.userDetails.name === "броньовано" ? "невідомо" : a.userDetails.from.country} ${a.userDetails.name === "броньовано" ? "" : "-"} ${a.userDetails.name === "броньовано" ? "" : a.userDetails.from.city}` < 
                                `${b.userDetails.name === "броньовано" ? "невідомо" : b.userDetails.from.country} ${b.userDetails.name === "броньовано" ? "" : "-"} ${b.userDetails.name === "броньовано" ? "" : b.userDetails.from.city}`) return -1;
                            if (`${a.userDetails.name === "броньовано" ? "невідомо" : a.userDetails.from.country} ${a.userDetails.name === "броньовано" ? "" : "-"} ${a.userDetails.name === "броньовано" ? "" : a.userDetails.from.city}` > 
                                `${b.userDetails.name === "броньовано" ? "невідомо" : b.userDetails.from.country} ${b.userDetails.name === "броньовано" ? "" : "-"} ${b.userDetails.name === "броньовано" ? "" : b.userDetails.from.city}`) return 1;
                            return 0;
                          }).map((item, index) => {
                            return (
                                <tr>
                                    <td>{new Date([...allTrips].filter(item => item._id === tripId)[0].stations.filter(station => (station.city === item.userDetails.to.city && station.country === item.userDetails.to.country))[0].arrivalDate).toLocaleString()}</td>
                                    <td>{item.userDetails.name === "броньовано" ? "невідомо" : item.userDetails.from.country} {item.userDetails.name === "броньовано" ? "" : "-"} {item.userDetails.name === "броньовано" ? "" : item.userDetails.from.city}</td>
                                    <td>{item.userDetails.name === "броньовано" ? "невідомо" : item.userDetails.to.country} {item.userDetails.name === "броньовано" ? "" : "-"}  {item.userDetails.name === "броньовано" ? "" : item.userDetails.to.city}</td>
                                    <td>{item.placeNumber}</td>
                                    <td>{item.userDetails.surname} {item.userDetails.name}</td>
                                    <td>{normalizeInput(item.initiatorContacts.phone)}</td>
                                </tr>
                            )
                        }) : ""
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PrintingTable