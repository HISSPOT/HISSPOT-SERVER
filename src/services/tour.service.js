import axios from 'axios';

const TOUR_API_BASE = 'https://apis.data.go.kr/B551011/TarRlteTarService1';

export const getNearbyTouristSpots = async (areaCode, sigunguCode) => {
  const params = {
    serviceKey: process.env.TOUR_API_KEY,
    numOfRows: 3,
    pageNo: 1,
    MobileOS: 'ETC',
    MobileApp: 'HISSPOT',
    _type: 'json',
    contentTypeId: 12,
    areaCode,
    sigunguCode,
  };

  const { data } = await axios.get(`${TOUR_API_BASE}/areaBasedList1`, { params });
  const items = data?.response?.body?.items?.item ?? [];
  return items.slice(0, 3).map((item) => ({
    contentId: item.contentid,
    name: item.title,
    address: item.addr1,
    imageUrl: item.firstimage || item.firstimage2 || null,
    latitude: item.mapy,
    longitude: item.mapx,
  }));
};
