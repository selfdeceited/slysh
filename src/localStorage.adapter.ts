import { broadcast } from "./broadcast"

interface SetOptions {
    val: boolean
    messageText?: string
    enableBroadcast?: boolean
}

const lsKey = "slysh.arrived"

const setAs = ({ val, messageText, enableBroadcast}: SetOptions) => {
    localStorage.setItem(lsKey, String(val))
    if (enableBroadcast ?? true)
        broadcast(messageText)
}

export const arrived = () => setAs({ val: true, messageText: "Пришел" })
export const departed = () => setAs({ val: false, messageText: "Ушел" })

export const hasArrived = () => {
    var here = localStorage.getItem(lsKey)
    if (here != void 0) {
        return Boolean(here)
    } else {
        setAs({ val: true, enableBroadcast: false })
    }
}