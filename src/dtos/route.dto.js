export const routeResponseDto = (route) => ({
  id: route.id,
  name: route.name,
  description: route.description,
  imageUrl: route.imageUrl,
  distance: route.distance,
  duration: route.duration,
  spots: route.routeSpots?.map((rs) => ({
    order: rs.order,
    spot: {
      id: rs.spot.id,
      name: rs.spot.name,
      latitude: rs.spot.latitude,
      longitude: rs.spot.longitude,
      imageUrl: rs.spot.imageUrl,
    },
  })),
});
