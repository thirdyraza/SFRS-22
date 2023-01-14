import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifs } from "../features/notifs/notifSlice";
import { reset } from "../features/auth/authSlice";
import PopupLogs from "./PopupLogs";
import '../assets/scss/popup.scss'

function Logs({reserve}) {

    const dispatch = useDispatch()

    const { notifs } = useSelector((state) => state.notif)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {

        const resid = reserve._id

        dispatch(getNotifs(resid))

        return () => {
            dispatch(reset())
        };

    }, [dispatch, reserve, user]);

    return (
    <div id="popup_logs">
        {notifs.length > 0 ? (<>
            {notifs.map((notif) => (
            <PopupLogs key={notif._id} notifs={notif}/>
            ))}
        </>) : (
            <h3 className="none">No Notifications Found</h3>
        )}
        
    </div>
    );
}

export default Logs