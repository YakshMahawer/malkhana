import React, {useState} from "react";
import Path from "./path";
import Axios from 'axios';
import "./item_map.css"
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

const SuperMapVehicle = () => {
    const [tat, setTat] = useState(true);
    const [data, setData] = useState(null);
    const location = useLocation();
    const handleMap = async () => {
        await Axios.post("http://localhost:5000/findVehicleMap", {
            ps: "Manjalpur"
        }).then(res => {
            setData(res.data);
        })
    }

    const handleJp = async () => {
        await Axios.post("http://localhost:5000/findVehicleMap", {
            ps: "JP Road"
        }).then(res => {
            setData(res.data);
        })
    } 

    const handleSay = async () => {
        await Axios.post("http://localhost:5000/findVehicleMap", {
            ps: "Sayajiganj"
        }).then(res => {
            setData(res.data);
        })
    } 

    const handleRao = async () => {
        await Axios.post("http://localhost:5000/findVehicleMap", {
            ps: "Raopura"
        }).then(res => {
            setData(res.data);
        })
    } 

    const handleGot = async () => {
        await Axios.post("http://localhost:5000/findVehicleMap", {
            ps: "Gotri"
        }).then(res => {
            setData(res.data);
        })
    } 

    const handleMan = async () => {
        await Axios.post("http://localhost:5000/findVehicleMap", {
            ps: "Manjalpur"
        }).then(res => {
            setData(res.data);
        })
    } 

    if(tat){
        handleMap();
        setTat(false);
    }
    return(
        <div className="super_vmap_div">
            <Path cur_page = "Parking Map" cur_path = "Home / Map / Parking Map /" />
            <div className="map_vehicle filtered_data">
            <div className="map_buttons">
                <button onClick={handleMan}>MANJALPUR</button>
                <button onClick={handleJp}>JP ROAD</button>
                <button onClick={handleSay}>SAYAJIGANJ</button>
                <button onClick={handleRao}>RAOPURA</button>
                <button onClick={handleGot}>GOTRI</button>
            </div>
            {
                (data === null)?"Loading":
                <div className="map_vehicle_main">
                    <div className="top">
                        <div className="grid_container_7">
                            <div class={(data.x1)?"fl":"et"}>X1</div>
                            <div class={(data.x2)?"fl":"et"}>X2</div>
                            <div class={(data.x3)?"fl":"et"}>X3</div>
                            <div class={(data.x4)?"fl":"et"}>X4</div>
                            <div class={(data.x5)?"fl":"et"}>X5</div>
                            <div class={(data.x6)?"fl":"et"}>X6</div>
                            <div class={(data.x7)?"fl":"et"}>X7</div>
                            <div class={(data.x8)?"fl":"et"}>X8</div>
                            <div class={(data.x9)?"fl":"et"}>X9</div>
                            <div class={(data.x10)?"fl":"et"}>X10</div>
                            <div id="parking_space"></div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="grid_container_8">
                            <div class={(data.y1)?"fl":"et"}>Y1</div>
                            <div class={(data.y2)?"fl":"et"}>Y2</div>
                            <div class={(data.y3)?"fl":"et"}>Y3</div>
                            <div class={(data.y4)?"fl":"et"}>Y4</div>
                        </div>
                        <div className="grid_container_9">
                            <div class={(data.z1)?"fl":"et"}>Z1</div>
                            <div class={(data.z2)?"fl":"et"}>Z2</div>
                            <div class={(data.z3)?"fl":"et"}>Z3</div>
                        </div>
                    </div>
                </div>

            }
            </div>
        </div>
    )
}

export default SuperMapVehicle;