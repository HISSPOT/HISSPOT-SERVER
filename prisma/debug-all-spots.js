import { getAllSpotsService } from '../src/services/spot.service.js';

const main = async () => {
  const result = await getAllSpotsService('test-user-001');
  console.log('총 마커 수:', result.length);
  console.log(result.filter((s) => s.kingId === 7));
};

main().catch(console.error);
