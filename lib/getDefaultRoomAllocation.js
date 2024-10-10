export const getDefaultRoomAllocation = (guest, rooms) => {
    const getMinPrice = ({ adult, child }, rooms, roomIndex = 0) => {
        let minTotalPrice = Infinity
        let defaultRooms = []

        if (roomIndex >= rooms.length) {
            if (!adult && !child) minTotalPrice = 0
            return { minTotalPrice, defaultRooms }
        }

        const { roomPrice, adultPrice, childPrice, capacity } = rooms[roomIndex]

        for (let i = 0; i <= adult; i++) {
            for (let j = 0; j <= child; j++) {
                if (!i && j || i + j > capacity) continue

                const currentPrice = !i && !j
                    ? 0
                    : roomPrice + adultPrice * i + childPrice * j

                const {
                    minTotalPrice: _minTotalPrice,
                    defaultRooms: _defaultRooms
                } = getMinPrice(
                    { adult: adult - i, child: child - j },
                    rooms,
                    roomIndex + 1
                )

                if (currentPrice + _minTotalPrice < minTotalPrice) {
                    minTotalPrice = currentPrice + _minTotalPrice
                    defaultRooms = [{ adult: i, child: j, price: currentPrice }, ..._defaultRooms]
                }
            }
        }
        return { minTotalPrice, defaultRooms }
    }

    return getMinPrice(guest, rooms).defaultRooms
}