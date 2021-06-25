import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type useCounterProps = {
    timeOut: boolean
    setTimeOut: Dispatch<SetStateAction<boolean>>
    activeCount: () => void
}

export function useCounter(): useCounterProps {
    const [timeOut, setTimeOut] = useState<boolean>(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOut(false)
        }, 10000)
        return () => {
            clearInterval(interval)
        }
    }, [timeOut])

    function activeCount() {
        setTimeOut(true)
    }

    return { timeOut, setTimeOut, activeCount }
}
