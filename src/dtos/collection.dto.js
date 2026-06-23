export const collectionResponseDto = (collection) => ({
  id: collection.id,
  collectedAt: collection.collectedAt,
  king: {
    id: collection.king.id,
    name: collection.king.name,
    orderNum: collection.king.orderNum,
    cardImageUrl: collection.king.cardImageUrl,
  },
});
