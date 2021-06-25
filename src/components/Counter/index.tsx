/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'

export function Counter(): JSX.Element {
    const [timer, setTimer] = useState(10)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer => timer - 1)
        }, 1000)
        return (): void => {
            clearInterval(interval)
        }
    }, [])

    return <>{timer < 10 ? `00:0${timer}` : `00:${timer}`}</>
}
