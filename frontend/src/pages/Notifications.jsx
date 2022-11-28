import '../assets/scss/notifications.scss'
import NotificationCard from '../components/NotificationCard';
import React, { useState } from "react";

function Notifications() {

    const [selectnotif, setNotif]=useState([
        {   
            value: 'unread', 
            name:'Andrei Pagalilauan', 
            subject:'Remedial Class',
            type:'Sent you a schedule request',
            date: 'MM/DD/YY',
            time: '00:00'
        },
        {   
            value: 'unread', 
            name:'Herbert Raza III', 
            subject:'LITES Event',
            type:'Sent you a schedule request',
            date: 'MM/DD/YY',
            time: '00:00'
        },
        {   
            value: 'unread', 
            name:'Justine Carbonel', 
            subject:'Remedial Class',
            type:'Sent you a schedule request',
            date: 'MM/DD/YY',
            time: '00:00'
        },
        {   
            value: 'read', 
            name:'Andrei Pagalilauan', 
            subject:'Remedial Class',
            type:'Sent you a schedule request',
            date: 'MM/DD/YY',
            time: '00:00'
        },
        {   
            value: 'read',
            name:'Andrei Pagalilauan', 
            subject:'Remedial Class',
            type:'Sent you a schedule request',
            date: 'MM/DD/YY',
            time: '00:00'
        },
        {   
            value: 'read',
            name:'Andrei Pagalilauan', 
            subject:'Remedial Class',
            type:'Sent you a schedule request',
            date: 'MM/DD/YY',
            time: '00:00'
        },
    ]);

    return ( 
        <div className="app">
        <div id="home">
        <div className='notifications'>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>

            <div className='n-header'>
                <div className="notif-head">
                    <div className='notif-name'>
                        <p className="notif-header">Notifications</p>
                        <i class='bx bx-notification' ></i>
                    </div>
                    <div className='notif-ctr'>
                        <p>You curently have {selectnotif.length} notifications</p>
                    </div>

                </div>
                
                <div className='select-sort'>
                    <p>Sort by </p>
                    <select>
                        <option>Newest</option>
                        <option>Oldest</option>
                        <option>Unread</option>
                    </select>
                </div>

                <div>
                    <button type='submit'>Mark as read</button>
                </div>


            </div>
            
            <div className="n-top">
                <span/>
                <p>Details</p>
                <span/>
                <p>Date</p>
            </div>
            <NotificationCard select={ selectnotif }/>

        </div>
        </div>
      </div>

     );
}
 
export default Notifications;