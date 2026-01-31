import {createContext, useCallback, useContext, useMemo, useState} from "react";
import UiMessage from "../components/UiMessage/UiMessage";


const NotificationContext = createContext(null);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications должен использоваться внутри NotificationProvider');
    }
    return context;
};


export const NotificationProvider = ({children}) => {
    const [message, setMessage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const showNotification = useCallback((text, duration = 3000) => {

        setMessage(text);
        setIsVisible(true);

        const hideTimer = setTimeout(() => {
            setIsVisible(false);

            setTimeout(() => {
                setMessage(null);
            }, 500);

        }, duration);

        return () => clearTimeout(hideTimer);
    }, [message]);

    const contextValue = useMemo(() => ({
        showNotification,
    }), [showNotification]);

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}


            {message && (
                    <UiMessage text={message} className={isVisible ? 'visible' : 'hidden'} />
            )}
        </NotificationContext.Provider>
    );
}