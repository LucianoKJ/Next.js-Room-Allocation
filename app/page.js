'use client'

import classes from "./page.module.css";
import RoomAllocation from '@/components/RoomAllocation'

export default function Home() {
  const guest = { adult: 10, child: 2 }
  const rooms = [
    { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
    { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
    { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
    { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 }
  ]
  return (
    <div className={classes.wrap}>
      <RoomAllocation
        guest={guest}
        rooms={rooms}
        onChange={(result) => { console.log(result) }}
      />
    </div>
  );
}
