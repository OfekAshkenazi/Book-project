const { useState, useEffect, useRef } = React

import { eventBusService } from "../services/event-bus.service.js"

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const setTimeOutId = useRef(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            /// first layer of code
            setMsg(msg)
            /// then protection
            if (setTimeOutId.current) {
                clearInterval(setTimeOutId.current)
                setTimeOutId.current = null
            }
            setTimeOutId.current = setTimeout(onCloseMsg, 3000)
        })
        return unsubscribe
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return <div className={"user-msg " + msg.type}>
        {/* <button onClick={onCloseMsg}>X</button> */}
        {msg.txt}
    </div>
}