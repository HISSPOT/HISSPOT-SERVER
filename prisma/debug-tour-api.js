import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TOUR_API_KEY = process.env.TOUR_API_KEY;
const BASE_URL = 'https://apis.data.go.kr/B551011/KorService2/detailCommon2';
const INTRO_URL = 'https://apis.data.go.kr/B551011/KorService2/detailIntro2';

const contentId = process.argv[2] || '126508'; // 경복궁

const run = async (label, url, params) => {
  try {
    const res = await axios.get(url, { params });
    console.log(`\n=== ${label} (status ${res.status}) ===`);
    console.log(JSON.stringify(res.data, null, 2).slice(0, 2000));
  } catch (err) {
    console.log(`\n=== ${label} ERROR ===`);
    console.log('status:', err.response?.status);
    console.log('data:', JSON.stringify(err.response?.data, null, 2)?.slice(0, 2000));
    console.log('message:', err.message);
  }
};

await run('detailCommon2', BASE_URL, {
  serviceKey: TOUR_API_KEY,
  contentId,
  MobileOS: 'ETC',
  MobileApp: 'Hisspot',
  _type: 'json',
  numOfRows: 1,
  pageNo: 1,
  defaultYN: 'Y',
  firstImageYN: 'Y',
  addrinfoYN: 'Y',
  mapinfoYN: 'Y',
  overviewYN: 'N',
});

await run('detailIntro2', INTRO_URL, {
  serviceKey: TOUR_API_KEY,
  contentId,
  contentTypeId: 12,
  MobileOS: 'ETC',
  MobileApp: 'Hisspot',
  _type: 'json',
  numOfRows: 1,
  pageNo: 1,
});
