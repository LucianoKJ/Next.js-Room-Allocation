'use client'

import { useRef, useEffect } from "react"
import classes from './LongPressButton.module.css'

export default function LongPressButton({
    name = "",
    value = 0,
    onTrigger = () => { },
    onBlur = () => { },
    disabled = true
}) {
    const timer = useRef()
    const latestValue = useRef(value)
    latestValue.current = value

    useEffect(() => {
        const func = () => clearInterval(timer.current)
        document.addEventListener('mouseup', func)
        return () => {
            document.removeEventListener('mouseup', func)
        }
    }, [])

    useEffect(() => {
        if (disabled) clearInterval(timer.current)
    }, [disabled])

    return (
        <button
            className={classes["long-press-btn"]}
            onMouseDown={() => {
                clearInterval(timer.current)
                onTrigger(latestValue.current)
                timer.current = setInterval(() => {
                    onTrigger(latestValue.current)
                }, 100)
            }}
            onBlur={onBlur}
            disabled={disabled}
        >
            {name}
        </button>
    )
}