import "./Styles/Autobus.css";

import { useEffect } from "react";

function Autobus({type, places, clickTrigger, setClickTrigger}) {
    useEffect(()=>{
        let handleAdminClick = (e)=>{
            let places = document.querySelectorAll(".Autobus__place");
            places.forEach(el=>{
                el.classList.remove("Autobus__place_selected")
            })
            e.target.classList.toggle("Autobus__place_selected")
            setClickTrigger(e.target.innerText)
        }

        console.log(places)
        
        let bookedPlaces = places.map(place=>`${place.placeNumber}`)
        
        if (type === "ADMIN") {
            if (document.querySelector(".Autobus__place")){
                let places = document.querySelectorAll(".Autobus__place");
                places.forEach(el=>{
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
            if (document.querySelector(".Autobus__place")){
                let places = document.querySelectorAll(".Autobus__place");
                places.forEach(el=>{
                    el.classList.remove("Autobus__place_selected")
                    el.classList.remove("Autobus__place_red")
                    el.classList.remove("Autobus__place_green")
                    if (bookedPlaces.indexOf(el.innerText) !== -1) {
                        el.classList.add("Autobus__place_red")
                    }
                    // el.addEventListener("click", handleAdminClick)
                })
            }
        }
        
        return ()=>{
            if (type === "ADMIN") {
                if (document.querySelector(".Autobus__place")){
                    let places = document.querySelectorAll(".Autobus__place");
                    places.forEach(el=>{
                        el.removeEventListener("click", handleAdminClick)
                    })
                }
            }
            
        }
    }, [type, places])
    return (
        <div className="Autobus">
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
                        <div className="Autobus__tech-space">Столик</div>
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
                        <div className="Autobus__tech-space">Столик</div>
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
                        <div className="Autobus__entrance">Вхід</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">13</div>
                        <div className="Autobus__place">14</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__tech-space">Столик</div>
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
                        <div className="Autobus__tech-space">Туалет</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__place">37</div>
                        <div className="Autobus__place">38</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__entrance">Вихід</div>
                    </div>
                    <div className="Autobus__group">
                        <div className="Autobus__tech-space">Столик</div>
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