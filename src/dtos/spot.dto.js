export const spotResponseDto = (spot) => ({
  id: spot.id,
  name: spot.name,
  description: spot.description,
  latitude: spot.latitude,
  longitude: spot.longitude,
  address: spot.address,
  imageUrl: spot.imageUrl,
  king: spot.king
    ? { id: spot.king.id, name: spot.king.name, orderNum: spot.king.orderNum }
    : undefined,
  distance: spot.distance,
});
