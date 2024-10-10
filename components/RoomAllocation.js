'use client'

import { useState } from "react"
import { getDefaultRoomAllocation } from '@/lib/getDefaultRoomAllocation'

import classes from './RoomAllocation.module.css'
import RoomSelect from './RoomSelect'

export default function RoomAllocation({ guest, rooms, onChange }) {
    const [allocation, setAllocation] = useState(() => getDefaultRoomAllocation(guest, rooms))
    const allocatedAdult = allocation.reduce((acc, { adult }) => acc + adult, 0)
    const allocatedChild = allocation.reduce((acc, { child }) => acc + child, 0)

    const changeAllocation = (newAllocation) => {
        setAllocation(newAllocation)
        onChange(newAllocation)
    }
    return (
        <div className={classes["room-allocation"]}>
            <h1>住客人數 : {guest.adult} 位大人，{guest.child} 位小孩 / {rooms.length} 房</h1>
            <p className={classes["not-allocated"]} >
                {guest.adult === allocatedAdult && guest.child === allocatedChild
                    ? "分配完畢"
                    : `尚未分配人數 : ${guest.adult - allocatedAdult} 位大人，${guest.child - allocatedChild} 位小孩`
                }
            </p>
            <div className={classes["selection-group"]}>
                {allocation.map(({ adult, child }, i) => {
                    const { capacity, roomPrice, adultPrice, childPrice } = rooms[i]
                    const adultCapacity = Math.min(capacity - child, guest.adult - (allocatedAdult - adult))
                    const childCapacity = Math.min(capacity - adult, guest.child - (allocatedChild - child))
                    const onAdultChange = (newAdult) => {
                        const newPrice = !newAdult && !child
                            ? 0
                            : roomPrice + newAdult * adultPrice + child * childPrice
                        changeAllocation(allocation.map((v, j) => j === i
                            ? { adult: newAdult, child, price: newPrice }
                            : v
                        ))
                    }
                    const onChildChange = (newChild) => {
                        const newPrice = !adult && !newChild
                            ? 0
                            : roomPrice + adult * adultPrice + newChild * childPrice
                        changeAllocation(allocation.map((v, j) => j === i
                            ? { adult, child: newChild, price: newPrice }
                            : v
                        ))
                    }
                    return (
                        <RoomSelect
                            key={i}
                            name={`room-${i}`}
                            adult={adult}
                            child={child}
                            adultCapacity={adultCapacity}
                            childCapacity={childCapacity}
                            onAdultChange={onAdultChange}
                            onChildChange={onChildChange}
                        />
                    )
                })}
            </div>
        </div>
    );
}
