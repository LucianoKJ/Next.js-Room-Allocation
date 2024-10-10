'use client'

import classes from "./CustomInputNumber.module.css"
import { useRef } from "react"
import LongPressButton from './LongPressButton'

export default function CustomInputNumber({
    name = "",
    min = 0,
    max = 10,
    step = 1,
    value = 0,
    disabled,
    onChange = () => { },
    onBlur = () => { }
}) {
    const inputRef = useRef()
    const triggerInputEvent = (v) => {
        const { set: nativeInputValueSetter } = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
        const event = new Event('input', { bubbles: true });
        nativeInputValueSetter.call(inputRef.current, v);
        inputRef.current.dispatchEvent(event);
    }
    const triggerInputBlur = () => {
        inputRef.current.focus()
        inputRef.current.blur()
    }
    return (
        <div
            className={classes["wrap"]}
        >
            <LongPressButton
                name="-"
                value={value}
                onTrigger={(v) => triggerInputEvent(Math.max(min, v - step))}
                onBlur={triggerInputBlur}
                disabled={disabled || value <= min}
            />
            <input
                id="test"
                ref={inputRef}
                name={name}
                type="number"
                className={classes["custom-input"]}
                value={value.toString()}
                onChange={(e) => {
                    const newValue = Number(e.target.value)
                    if (newValue <= max && newValue >= min) {
                        onChange(e)
                    }
                }}
                disabled={disabled}
                onBlur={onBlur}
            />
            <LongPressButton
                name="+"
                value={value}
                onTrigger={(v) => triggerInputEvent(Math.min(max, v + step))}
                onBlur={triggerInputBlur}
                disabled={disabled || value >= max}
            />
        </div>
    )
}
