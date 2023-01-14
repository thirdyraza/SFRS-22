import { useEffect } from 'react';
import { FaInfo } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifs, reset } from '../features/notifs/notifSlice';
import '../assets/scss/popup.scss'

function closeLogs(){
    document.getElementById('popup_logs').style.cssText = 'display:none';
    document.getElementById('close').style.cssText = 'display:flex';
    document.getElementById('open_popup').style.cssText = 'opacity: 100%';
}

function PopupLogs() {

    const dispatch = useDispatch()
    const {notifs} = useSelector((state) => state.notif)
    const {reservation} = useSelector((state) => state.reserves)

    useEffect(() => {

        const resid = reservation._id

        dispatch(getNotifs(resid))

        return () => {
            dispatch(reset())
        };

    }, [dispatch, reservation]);

  return (
    <div className='testing-popup' onClick={closeLogs}>
        <div id='popup_logs'>
            <div className='confirmation_popup'>
                <div className='confirmation_header'>
                    <FaInfo className='icon' id='iconLogs'/>
                </div>
                <div className='logs-cont'>
                    <h2>Reservation logs</h2>
                    <br />
                    {notifs.length > 0 ? (<>
                        {notifs.map((notifs) => (
                            <div className="logs-items" key={notifs._id}>
                                <p className='log-sign'>{notifs.sign}</p>
                                <p className='log-upd'>{notifs.updatedAt}</p>
                            </div>
                        ))}
                    </>
                    ) : (
                        <h3 className='logs-emp'> There are no update logs for this reservation</h3>
                    )}
                    <br />
                    <p className='log-crtd-txt'>Created At</p>
                    <p className='log-crtd'>{reservation.createdAt}</p>
                </div>
            </div>
        </div>
    </div>  )
}

export default PopupLogs