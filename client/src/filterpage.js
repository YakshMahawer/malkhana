import React, { useState } from "react";
import Axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import Path from "./path";
import "./path.css"
import './filter.css'
import Empty from './empty.png'

const Filter = () => {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [id, setId] = useState();
    const [chooseDate, setChooseDate] = useState('any');
    const [chooseCategory, setChooseCategory] = useState('all');
    const [chooseStatus, setChooseStatus] = useState('any');
    const [oneDate, setOneDate] = useState();
    const [toDate, setToDate] = useState();
    const [fromDate, setFromDate] = useState();
    const handleToday = async () => {
        await Axios.post("http://localhost:5000/findToday", {
            ps: location.state
        }).then(res => {
            setData(res.data);
            console.log(res.data);
        })
    }

    const handleAll = async () => {
        await Axios.post("http://localhost:5000/findAll", {
            ps: location.state
        }).then(res => {
            setData(res.data);
        })
    }

    const handleSearch = async () => {
        await Axios.post("http://localhost:5000/search", {
            searchId: id,
        }).then(res => {
            setData(res.data);
        })
    }

    const handleFilter = async () => {
        await Axios.post("http://localhost:5000/filter", {
            date: chooseDate,
            category: chooseCategory,
            status: chooseStatus,
            ps: location.state,
            oneDate: oneDate,
            toDate: toDate,
            fromDate: fromDate
        }).then(res => {
            setData(res.data);
            console.log(res.data);
        })
    }

    function formatDateToReadable(dateTimeString) {
        const date = new Date(dateTimeString);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        };
        return date.toLocaleString("en-US", options);
      }

    return(
        <div className="filter_div">
            <Path cur_page = "Dashboard" cur_path = "Home / Dashboard /" />
            <div className="filtered_data">
                <div className="filter_top_buttons">
                    <button className="filter_top_button" onClick={handleToday}>TODAY</button>
                    <button className="filter_top_button" onClick={handleAll}>ALL DATA</button>
                </div>
                <div className="filter_workspace">
                    <div className="data_show_filter">
                        {
                            (data === null || data.length === 0)?<div className="empty_data_filter"><img src={Empty}/><p className="empty_data_text">No Data Found</p></div>:
                            <div>
                            {
                                data.map((item, index) => (
                                    <div className="filter_ddata visitor_data">
                                        <div>Case ID: {item.case_id}</div>
                                        <div className="remove_type">Item Type: {item.type}</div>
                                        <div>Entry At: {formatDateToReadable(item.created_at)}</div>
                                        <div>Stored At: {item.stored_comp.toUpperCase()}</div>
                                        <div>Malkhana Name: {item.malkhana_name}</div>
                                        <div>Depositor Name: {item.depositor_name}</div>
                                    </div>
                                ))
                            }
                            </div>
                        }
                    </div>
                    <div className="filter_form">
                        <input type="number" className="find_filter" placeholder="FIND ITEM BY ITEMID" onChange={(e) => {setId(e.target.value)}}/>
                        <button onClick={handleSearch}>SEARCH</button>
                        <select name="date" id="" onChange={(e) => {setChooseDate(e.target.value)}}>
                            <option value="any">Any Date</option>
                            <option value="one">Enter specific Date</option>
                            <option value="tofrom">Enter Range of Dates</option>
                        </select>
                        {
                            (chooseDate === 'one')?<input type="date" name="one_date" id="" onChange={(e) => {setOneDate(e.target.value)}}/>:""
                        }
                        {
                            (chooseDate === 'tofrom')?
                            <div>
                                <p>From:</p>
                                <input type="date" onChange={(e) => {setFromDate(e.target.value)}}/>
                                <p>To:</p>
                                <input type="date" onChange={(e) => {setToDate(e.target.value)}}/>
                            </div>:""
                        }
                        <select name="category" id="" onChange={(e) => {setChooseCategory(e.target.value)}}>
                            <option value="all">All Category</option>
                            <option value="drugs">Drugs</option>
                            <option value="weapon">Weapon</option>
                            <option value="liquid">Liquid</option>
                            <option value="document">Document</option>
                            <option value="bevidence">Biological Evidence</option>
                            <option value="ornament">Cash / Jewellery</option>
                            <option value="fragile">Fragile</option>
                        </select>
                        <select name="status" id="" onChange={(e) => {setChooseStatus(e.target.value)}}>
                            <option value="any">Any</option>
                            <option value="in">Current Inside</option>
                            <option value="Item At FSL">Out For FSL</option>
                            <option value="Removed">Deleted</option>
                        </select>
                        <button onClick={handleFilter}>FILTER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;