import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifs } from "../features/notifs/notifSlice";
import { reset } from "../features/auth/authSlice";
import NotificationCell from "./NotificationCell";

function NotificationContent({reserves}) {

    const dispatch = useDispatch()

    const { notifs} = useSelector((state) => state.notif)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {

        const resid = reserves._id

        dispatch(getNotifs(resid))

        return () => {
            dispatch(reset())
        };

    }, [dispatch, reserves, user]);

    return ( 
    <>
        {notifs.map((notif) => (
            <NotificationCell key={notif._id} notifs={notif}/>
        ))}
        
    </>
    );
}

export default NotificationContent;