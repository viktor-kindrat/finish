import "./Styles/Autobus.css";

import { useEffect, useMemo } from "react";

function Autobus({ type, places, clickTrigger, setClickTrigger, count, selected, setSelected }) {

    let id = useMemo(()=>{
        return Math.floor(Date.now() + Math.random() * 10000)
    }, [])

    useEffect(() => {
        let handleAdminClick = (e) => {
            let places = document.querySelectorAll(`.Autobus_${id} .Autobus__place`);
            places.forEach(el => {
                el.classList.remove("Autobus__place_selected")
            })
            e.target.classList.toggle("Autobus__place_selected")
            setClickTrigger(e.target.innerText)
        }
        let handleUserClick = (e) => {
            let newSelected = [...selected, e.target.innerText];
            if (selected.indexOf(e.target.innerText) !== -1) {
                newSelected = newSelected.filter((item, index) => item !== e.target.innerText)
            }
            if (newSelected.length === count + 1) {
                newSelected.shift()
            }
            setSelected(newSelected)
        }

        let bookedPlaces = places.map(place => `${place.placeNumber}`)

        if (type === "ADMIN") {
            if (document.querySelector(`.Autobus_${id} .Autobus__place`)) {
                let places = document.querySelectorAll(`.Autobus_${id} .Autobus__place`);
                places.forEach(el => {
                    el.classList.remove("Autobus__place_selected")
                    el.classList.remove("Autobus__place_red")
                    el.classList.remove("Autobus__place_green")
                    if (bookedPlaces.indexOf(el.innerText) !== -1) {
                        el.classList.add("Autobus__place_red")
                    }
                    el.addEventListener("click", handleAdminClick)
                })
            }
        } else {
            if (document.querySelector(`.Autobus_${id} .Autobus__place`)) {
                let places = document.querySelectorAll(`.Autobus_${id} .Autobus__place`);
                console.log(places)
                places.forEach(el => {
                    el.classList.remove("Autobus__place_selected")
                    el.classList.remove("Autobus__place_red")
                    el.classList.remove("Autobus__place_green")
                    if (bookedPlaces.indexOf(el.innerText) !== -1) {
                        el.classList.add("Autobus__place_red")
                        console.log(el)
                    } else {
                        el.addEventListener("click", handleUserClick)
                    }
                })
            }
        }

        return () => {
            if (type === "ADMIN") {
                if (document.querySelector(`.Autobus_${id} .Autobus__place`)) {
                    let places = document.querySelectorAll(`.Autobus_${id} .Autobus__place`);
                    places.forEach(el => {
                        el.removeEventListener("click", handleAdminClick)
                    })
                }
            } else {
                if (document.querySelector(`.Autobus_${id} .Autobus__place`)) {
                    let places = document.querySelectorAll(`.Autobus_${id} .Autobus__place`);
                    places.forEach(el => {
                        el.removeEventListener("click", handleUserClick)
                    })
                }
            }

        }
        // eslint-disable-next-line
    }, [type, places, setClickTrigger, count, selected, setSelected, id])

    useEffect(() => {
        if (type === "USER") {
            let places = document.querySelectorAll(`.Autobus_${id} .Autobus__place`);
            places.forEach(el => {
                if (selected.indexOf(el.innerText) !== -1) {
                    el.classList.add("Autobus__place_green")
                } else {
                    el.classList.remove("Autobus__place_green")
                }
            })
        }
    }, [selected, type, id])

    return (
        <div className={`Autobus Autobus_${id}`}>
            <div className="Autobus__container">
                <div className="Autobus__column Autous__column_left">
                    <div className="Autobus__group">
                        <div className="Autobus__place">1</div>
                        <div className="Autobus__place">2</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">5</div>
                        <div className="Autobus__place">6</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">9</div>
                        <div className="Autobus__place">10</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">11</div>
                        <div className="Autobus__place">12</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">15</div>
                        <div className="Autobus__place">16</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">19</div>
                        <div className="Autobus__place">20</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__tech-space">Table</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">23</div>
                        <div className="Autobus__place">24</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">27</div>
                        <div className="Autobus__place">28</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">31</div>
                        <div className="Autobus__place">32</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">33</div>
                        <div className="Autobus__place">34</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">35</div>
                        <div className="Autobus__place">36</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">39</div>
                        <div className="Autobus__place">40</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__tech-space">Table</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">43</div>
                        <div className="Autobus__place">44</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">47</div>
                        <div className="Autobus__place">48</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">51</div>
                        <div className="Autobus__place">52</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">55</div>
                        <div className="Autobus__place">56</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">60</div>
                        <div className="Autobus__place">61</div>
                    </div>
                </div>
                <div className="Autobus__column Autous__column_center">
                    <div className="Autobus__group">
                        <div className="Autobus__place">59</div>
                    </div>
                </div>
                <div className="Autobus__column Autous__column_right">
                    <div className="Autobus__group">
                        <div className="Autobus__place">3</div>
                        <div className="Autobus__place">4</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">7</div>
                        <div className="Autobus__place">8</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__entrance">Entrance</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">13</div>
                        <div className="Autobus__place">14</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__tech-space">Table</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">17</div>
                        <div className="Autobus__place">18</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">21</div>
                        <div className="Autobus__place">22</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">25</div>
                        <div className="Autobus__place">26</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">29</div>
                        <div className="Autobus__place">30</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__tech-space">WC</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">37</div>
                        <div className="Autobus__place">38</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__entrance">Exit</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__tech-space">Table</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">41</div>
                        <div className="Autobus__place">42</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">45</div>
                        <div className="Autobus__place">46</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">49</div>
                        <div className="Autobus__place">50</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">53</div>
                        <div className="Autobus__place">54</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">57</div>
                        <div className="Autobus__place">58</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">62</div>
                        <div className="Autobus__place">63</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Autobus