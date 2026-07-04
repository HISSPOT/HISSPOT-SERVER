import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TAG_DATA = [
  ['태조', '전주 경기전', '전각', '건국 시조', '전주'],
  ['정종', '의정부지 상설 전통문화행사', '문화행사', '전통문화', '의정부'],
  ['태종', '치악산국립공원', '국립공원', '자연유산', '강원도'],
  ['세종', '홍릉시험림(홍릉숲)', '숲·산림', '과학문화', '한글창제'],
  ['문종', '고구려대장간마을', '역사마을', '전통공예', '구리'],
  ['단종', '영월 청령포', '유배지', '역사 비극', '영월'],
  ['세조', '말티재 전망대(말티고개)', '전망대', '자연경관', '보은'],
  ['예종', '행주산성', '산성', '역사유적', '고양'],
  ['성종', '창덕궁과 후원 [유네스코 세계유산]', '궁궐', '유네스코', '서울'],
  ['연산군', '교동도 대룡시장', '전통시장', '섬여행', '강화도'],
  ['중종', '봉은사', '사찰', '불교문화', '강남'],
  ['인종', '원당종마목장 (렛츠런팜 원당)', '목장', '자연체험', '고양'],
  ['명종', '2025 양주관아지에서 만나는 특별한 주말', '관아지', '역사유적', '양주'],
  ['선조', '경복궁', '궁궐', '임진왜란', '서울'],
  ['광해군', '수성동계곡', '계곡', '자연경관', '종로'],
  ['인조', '남한산성도립공원 [유네스코 세계유산]', '산성', '유네스코', '광주'],
  ['효종', '강진 전라병영성', '성곽', '북벌정책', '강진'],
  ['현종', '종묘 [유네스코 세계유산]', '종묘', '유네스코', '서울'],
  ['숙종', '북한산성', '산성', '역사유적', '북한산'],
  ['경종', '창경궁 명정전', '궁궐', '역사유적', '서울'],
  ['영조', '서울 문묘와 성균관', '교육기관', '유교문화', '종로'],
  ['정조', '수원 화성 [유네스코 세계유산]', '성곽', '유네스코', '수원'],
  ['순조', '헌인릉 생태경관보전지역(오리나무림)', '릉', '생태경관', '서초'],
  ['헌종', '창덕궁 낙선재', '궁궐', '전각', '서울'],
  ['철종', '용흥궁', '궁궐', '강화도령', '강화'],
  ['고종', '덕수궁 밤의 석조전', '궁궐', '근대유산', '서울'],
  ['순종', '국립고궁박물관', '박물관', '황실유물', '경복궁'],
];

const main = async () => {
  let updated = 0;
  for (const [kingName, spotName, tag2, tag3, tag4] of TAG_DATA) {
    const king = await prisma.king.findFirst({ where: { name: kingName } });
    if (!king) {
      console.log(`[SKIP] king not found: ${kingName}`);
      continue;
    }
    const kingSpots = await prisma.kingSpot.findMany({ where: { kingId: king.id }, include: { spot: true } });
    if (kingSpots.length === 0) {
      console.log(`[SKIP] kingSpot not found for ${kingName}`);
      continue;
    }
    if (kingSpots.length > 1) {
      console.log(`[SKIP] ${kingName} has ${kingSpots.length} kingSpots, ambiguous — 수동으로 확인 필요 (예상: "${spotName}")`);
      continue;
    }
    const kingSpot = kingSpots[0];
    await prisma.kingSpot.update({
      where: { id: kingSpot.id },
      data: { tag1: '조선시대', tag2, tag3, tag4 },
    });
    updated++;
    console.log(`[OK] ${kingName} -> "${kingSpot.spot.name}" (예상: "${spotName}")`);
  }
  console.log(`완료: ${updated}/${TAG_DATA.length}`);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
