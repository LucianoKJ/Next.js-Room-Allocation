import classes from './RoomSelect.module.css'
import CustomInputNumber from './CustomInputNumber'

export default function RoomSelect({ name, adult, child, adultCapacity, childCapacity, onAdultChange, onChildChange }) {
    return (
        <div className={classes["room-select-wrap"]}>
            <h2 className={classes.total}>房間 : {adult + child} 人</h2>
            <div className={classes["category-wrap"]}>
                <h3>
                    大人
                    <p className={classes.age}>年齡 20+</p>
                </h3>
                <CustomInputNumber
                    name={`${name}-adult`}
                    value={adult}
                    max={adultCapacity}
                    disabled={!adultCapacity}
                    onChange={(e) => {
                        const newAdult = Number(e.target.value)
                        onAdultChange(newAdult)
                    }}
                />
            </div>
            <div className={classes["category-wrap"]}>
                <h3>小孩</h3>
                <CustomInputNumber
                    name={`${name}-child`}
                    value={child}
                    max={childCapacity}
                    disabled={!childCapacity}
                    onChange={(e) => {
                        const newChild = Number(e.target.value)
                        onChildChange(newChild)
                    }}
                />
            </div>
        </div>
    )
}