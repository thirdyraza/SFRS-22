import React, { useState } from "react";
import SelectInput from "./SelectInput";
import '../assets/scss/MainForm.scss';

const MainForm=() =>{


    const [selectleft, setSelect1]=useState([
        {   
            label:'Organization', 
            placeholder:'Select Organization', 
            type:'text',
            error:'Please select Organization'
        },
        {
            label:'Building', 
            placeholder:'Select Building', 
            type:'text',
            error:'Please select Building'
        },
    ]);

    const [selectright,setSelect2]=useState([
        {   
            label:'Department', 
            placeholder:'Select Department', 
            type:'text',
            error:'Please select Department'
        },
        {
            label:'Room', 
            placeholder:'Select Room', 
            type:'text',
            error:'Please select Room'
        },
    ]);

    return(
    <div className="app">
        <div id="home">
        <div>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                <div className="form-container">
                    <form>
                        <h2>ACTIVITY VENUE RESERVATION FORM</h2>
                        <div className="note">
                            <h3 class="note_header">NOTE:</h3>
                            <div class="note_content">
                                <p>1. Venue/s for acitivities has/have to be reserved a week before the actual conduct of the activity.</p>
                                <p>2. This form shall only be used for duly approved activities which will be conducted inside the University Campus.</p>
                                <p>3. Extra copies shall be given to ever approving bodies.</p>
                            </div>
                        </div>
                        <div className="purpose">
                            <label>Purpose</label>
                            <textarea placeholder="State your Purpose"/>
                        </div>
                        <div id="btnAttach" className="btnForm">
                            <p className="btn-text">Attach Files</p>
                            <i class='bx bxs-file' ></i>
                        </div>

                        <div className="input-container">
                            <div className="selectleft">
                                <SelectInput select={selectleft}/>
                            </div>
                            <div className="selectright">
                                <SelectInput select={selectright}/>
                            </div>
                        </div>

                        <div className="selectbottom">
                            <div className="in">
                                <label>Date</label>
                                <select type="text" placeholder="MM/DD/YY">
                                    <option>Default Value</option>
                                </select>
                            </div>

                            <div className="in">
                                <label>Time</label>

                                <div className="time-container">
                                    
                                    <select type="text" placeholder="MM/DD/YY">
                                        <option>Default Value</option>
                                    </select>
                                    <p id="time-span">to</p>
                                    <select type="text" placeholder="MM/DD/YY">
                                        <option>Default Value</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="equipment-container">  
                            <div className="in">
                                <label>Equipment</label>
                                <select type="text" placeholder="MM/DD/YY">
                                    <option>Default Value</option>
                                </select>
                            </div>
                            <div className="in">
                                <label>Quantity</label>
                                <select type="text" placeholder="MM/DD/YY">
                                    <option>Default Value</option>
                                </select>
                            </div>
                            <div id="btnAdd">
                                <i class='bx bxs-plus-circle'></i>
                            </div>
                        </div>


                        <br/>
                        <div id="btnSubmit"className="btnForm">
                            <p className="btn-text">Submit</p>
                            <i class='bx bx-check-circle' ></i>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
            
    )
}

export default MainForm;