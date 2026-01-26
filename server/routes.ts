
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { api } from "@shared/routes";
import { companions as companionsTable } from "@shared/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // === Routes ===

  app.get(api.routes.list.path, async (req, res) => {
    const routes = await storage.getRoutes();
    res.json(routes);
  });

  app.get(api.routes.get.path, async (req, res) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) return res.status(404).json({ message: "無效的 ID" });
    const route = await storage.getRoute(id);
    if (!route) return res.status(404).json({ message: "找不到路線" });
    res.json(route);
  });

  app.post(api.routes.create.path, async (req, res) => {
    try {
      const input = api.routes.create.input.parse(req.body);
      const route = await storage.createRoute(input);
      res.status(201).json(route);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // === Companions ===

  app.get(api.companions.list.path, async (req, res) => {
    const companions = await storage.getCompanions();
    res.json(companions);
  });

  // === Votes ===

  app.get(api.votes.list.path, async (req, res) => {
    const votes = await storage.getVotes();
    res.json(votes);
  });

  app.post(api.votes.create.path, async (req, res) => {
    try {
      const input = api.votes.create.input.parse(req.body);
      const vote = await storage.createVote(input);
      res.status(201).json(vote);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // === Seeding ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const routes = await storage.getRoutes();
  if (routes.length === 0) {
    console.log("Seeding routes...");

    // ============ 美洲 ============
    await storage.createRoute({
      name: "阿帕拉契山徑",
      description: "世界長距離步道的啟蒙，自阿帕拉契山脈開展的理想主義，橫跨美國東部14個州的經典步道。",
      locationName: "美國東部",
      lat: 35.5653,
      lng: -83.4988,
      lengthKm: 3500,
      altitudeM: 2037,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "planned",
      region: "美洲"
    });

    await storage.createRoute({
      name: "太平洋屋脊步道",
      description: "美國太平洋岸的西部荒野之旅，從墨西哥邊境延伸至加拿大，穿越加州、俄勒岡與華盛頓州。",
      locationName: "美國西部",
      lat: 40.7608,
      lng: -122.3781,
      lengthKm: 4265,
      altitudeM: 4009,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "美洲"
    });

    await storage.createRoute({
      name: "大陸分水嶺步道",
      description: "人跡最少、挑戰最高的美國長距離步道，沿著洛磯山脈的分水嶺前行。",
      locationName: "美國洛磯山脈",
      lat: 39.1139,
      lng: -106.4453,
      lengthKm: 4989,
      altitudeM: 4352,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "美洲"
    });

    await storage.createRoute({
      name: "加拿大全國步道",
      description: "全世界最長的遊憩型步道，連接加拿大大西洋、太平洋和北冰洋三大海岸。",
      locationName: "加拿大",
      lat: 45.4215,
      lng: -75.6972,
      lengthKm: 28000,
      altitudeM: 1500,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "美洲"
    });

    await storage.createRoute({
      name: "布魯斯步道",
      description: "保護尼加拉斷崖沿線多元生態與地景，加拿大最古老且最長的標示步道。",
      locationName: "加拿大安大略省",
      lat: 44.3895,
      lng: -80.9406,
      lengthKm: 900,
      altitudeM: 518,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "美洲"
    });

    await storage.createRoute({
      name: "美國大鐵道綠道",
      description: "走過美國鐵道運輸史，將廢棄鐵路改建為步道與自行車道的創新典範。",
      locationName: "美國全境",
      lat: 38.9072,
      lng: -77.0369,
      lengthKm: 3500,
      altitudeM: 200,
      difficulty: "Easy",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "美洲"
    });

    await storage.createRoute({
      name: "大西洋森林步道",
      description: "以步道守護南美洲雨林，連接巴西沿海的大西洋森林保護區。",
      locationName: "巴西",
      lat: -23.5505,
      lng: -46.6333,
      lengthKm: 4400,
      altitudeM: 800,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "美洲"
    });

    await storage.createRoute({
      name: "印加古道路網",
      description: "以古道作為生態保育廊道，連接秘魯馬丘比丘的神聖印加帝國遺跡。",
      locationName: "秘魯",
      lat: -13.1631,
      lng: -72.5450,
      lengthKm: 43,
      altitudeM: 4215,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "planned",
      region: "美洲"
    });

    await storage.createRoute({
      name: "百內國家公園W環狀線步道",
      description: "荒蕪與秩序共存的世界，智利巴塔哥尼亞最著名的健行路線。",
      locationName: "智利巴塔哥尼亞",
      lat: -50.9423,
      lng: -73.4068,
      lengthKm: 80,
      altitudeM: 850,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "planned",
      region: "美洲"
    });

    // ============ 歐洲 ============
    await storage.createRoute({
      name: "聖雅各之路",
      description: "世界最知名的長距離朝聖之路，從法國或西班牙各地通往聖地牙哥德孔波斯特拉。",
      locationName: "西班牙",
      lat: 42.8805,
      lng: -8.5455,
      lengthKm: 800,
      altitudeM: 1500,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "visited",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "GR大健行步道系統",
      description: "洋溢法國人文風情的路線，如血管般密布的步道，流動著細微無聲的感動。",
      locationName: "法國",
      lat: 46.2276,
      lng: 2.2137,
      lengthKm: 60000,
      altitudeM: 1800,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "聖奧拉夫朝聖之路",
      description: "古老的北歐朝聖之路，每一步，都朝自己的心更靠近。",
      locationName: "挪威",
      lat: 63.4305,
      lng: 10.3951,
      lengthKm: 643,
      altitudeM: 400,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "歐洲長距離步道E-Path",
      description: "綿延不盡的歐洲自然風光，跨越多國的長距離步道網絡。",
      locationName: "歐洲全境",
      lat: 48.8566,
      lng: 2.3522,
      lengthKm: 80000,
      altitudeM: 2000,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "西高地步道",
      description: "充滿蘇格蘭特色的荒野及古堡風情，從格拉斯哥通往威廉堡的經典路線。",
      locationName: "蘇格蘭",
      lat: 56.8198,
      lng: -5.1052,
      lengthKm: 154,
      altitudeM: 548,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "奔寧之路",
      description: "英國通行權與國家步道的起點，縱貫英格蘭中北部的脊樑。",
      locationName: "英國",
      lat: 54.4791,
      lng: -2.1149,
      lengthKm: 429,
      altitudeM: 893,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "西南海岸步道",
      description: "行走在戶外的自然史博物館，英國最長的國家步道。",
      locationName: "英國西南部",
      lat: 50.7184,
      lng: -3.5339,
      lengthKm: 1014,
      altitudeM: 35000,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "匈牙利國家藍色步道",
      description: "歐洲第一條長距離步道，橫跨匈牙利全境的經典路線。",
      locationName: "匈牙利",
      lat: 47.4979,
      lng: 19.0402,
      lengthKm: 1168,
      altitudeM: 1014,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1551354139-e4b5cbf5b8e7?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "國王小徑",
      description: "與麋鹿、極光相遇的北歐風情，瑞典最著名的長距離步道。",
      locationName: "瑞典拉普蘭",
      lat: 68.3602,
      lng: 18.8310,
      lengthKm: 440,
      altitudeM: 1174,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "planned",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "阿爾卑斯山—亞得里亞海步道",
      description: "滿足心靈與味蕾的美食徒步，從阿爾卑斯山脈延伸至亞得里亞海岸。",
      locationName: "奧地利、斯洛維尼亞、義大利",
      lat: 46.3628,
      lng: 14.0937,
      lengthKm: 750,
      altitudeM: 2864,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "蘇丹小徑",
      description: "跨越鄂圖曼帝國，兼容並蓄的人文之路，連接巴爾幹半島的歷史古道。",
      locationName: "巴爾幹半島",
      lat: 41.9981,
      lng: 21.4254,
      lengthKm: 2000,
      altitudeM: 1200,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "法蘭奇納古道",
      description: "英吉利海峽到地中海的羅馬朝聖之路，穿越法國與義大利的歷史長廊。",
      locationName: "法國、義大利",
      lat: 43.7696,
      lng: 11.2558,
      lengthKm: 1900,
      altitudeM: 1000,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "歐洲"
    });

    await storage.createRoute({
      name: "艾格納提亞大道",
      description: "東羅馬帝國的交通命脈，橫跨巴爾幹半島的古羅馬道路。",
      locationName: "希臘、北馬其頓、土耳其",
      lat: 40.6401,
      lng: 22.9444,
      lengthKm: 1120,
      altitudeM: 800,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "歐洲"
    });

    // ============ 亞洲 ============
    await storage.createRoute({
      name: "濟州偶來步道",
      description: "亞洲健行文化的開創者，環繞濟州島海岸線的步道系統，從家門口的小路走向區域和平與和解。",
      locationName: "濟州島，韓國",
      lat: 33.3617,
      lng: 126.5292,
      lengthKm: 437,
      altitudeM: 150,
      difficulty: "Easy",
      imageUrl: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "visited",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "熊野古道",
      description: "東方最著名的宗教朝聖之路，從宗教朝聖到多元融合的文化路徑。",
      locationName: "和歌山縣，日本",
      lat: 33.8402,
      lng: 135.7730,
      lengthKm: 100,
      altitudeM: 1000,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "visited",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "四國遍路",
      description: "徒步參拜八十八間寺廟，走出人類自我實踐的歷程。",
      locationName: "四國，日本",
      lat: 33.8418,
      lng: 132.7656,
      lengthKm: 1200,
      altitudeM: 500,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "陸奧潮風步道",
      description: "體驗震災復興的堅韌力量，漫流在生命的縱走線上，連接東日本大地震受災區。",
      locationName: "東北地方，日本",
      lat: 39.7037,
      lng: 141.1527,
      lengthKm: 1000,
      altitudeM: 200,
      difficulty: "Easy",
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "日本長距離自然步道系統",
      description: "徒步旅行保護大自然，從入山修行走向災後復興的步道網絡。",
      locationName: "日本全境",
      lat: 35.6762,
      lng: 139.6503,
      lengthKm: 27000,
      altitudeM: 3000,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "JAPAN TRAIL",
      description: "從沖繩至北海道，縱貫日本的偉大步道，連接日本南北的夢想路線。",
      locationName: "日本全境",
      lat: 36.2048,
      lng: 138.2529,
      lengthKm: 10000,
      altitudeM: 3776,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "九州偶來步道",
      description: "老幼都能親近的步道，將韓國偶來精神帶入日本九州。",
      locationName: "九州，日本",
      lat: 33.2382,
      lng: 131.6126,
      lengthKm: 300,
      altitudeM: 500,
      difficulty: "Easy",
      imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "宮城偶來步道",
      description: "蘊含人類與自然共生的意義，連結宮城縣自然與文化的步道。",
      locationName: "宮城縣，日本",
      lat: 38.2688,
      lng: 140.8721,
      lengthKm: 60,
      altitudeM: 300,
      difficulty: "Easy",
      imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "日本信越步道",
      description: "美式荒野體驗與日式節制風格的完美結合，穿越長野與新潟縣界。",
      locationName: "長野、新潟，日本",
      lat: 36.8562,
      lng: 138.3086,
      lengthKm: 110,
      altitudeM: 1300,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "京都一周步道",
      description: "盡攬古都文化與自然體驗，環繞京都市區的山徑步道。",
      locationName: "京都，日本",
      lat: 35.0116,
      lng: 135.7681,
      lengthKm: 84,
      altitudeM: 600,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "visited",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "麥理浩徑",
      description: "香港第一條遠足徑，在異鄉實踐對公眾通行權的美好想像。",
      locationName: "香港",
      lat: 22.3193,
      lng: 114.1694,
      lengthKm: 100,
      altitudeM: 957,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "visited",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "淡蘭國家綠道",
      description: "北台灣百年發展的歷史蹤跡，連接淡水與宜蘭的古道群。",
      locationName: "北台灣",
      lat: 24.9914,
      lng: 121.5667,
      lengthKm: 200,
      altitudeM: 1000,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "visited",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "山海圳國家綠道",
      description: "你家我家門口，就是玉山登山口，山海故道的奇幻之旅。",
      locationName: "台南至玉山，台灣",
      lat: 23.4703,
      lng: 120.9574,
      lengthKm: 177,
      altitudeM: 3952,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "visited",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "樟之細路",
      description: "穿越客家庄，極具生活感的步道，走進常民生活裡的浪漫。",
      locationName: "桃竹苗，台灣",
      lat: 24.6861,
      lng: 120.9605,
      lengthKm: 380,
      altitudeM: 800,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "visited",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "台灣國家級綠道",
      description: "小島上繽紛綻放的夢想之路，串連台灣各地的國家級長距離步道網絡。",
      locationName: "台灣全島",
      lat: 23.6978,
      lng: 120.9605,
      lengthKm: 1000,
      altitudeM: 3000,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "中國長距離步道系統",
      description: "古老步道的新挑戰，連接中國各地的山川古道。",
      locationName: "中國全境",
      lat: 39.9042,
      lng: 116.4074,
      lengthKm: 10000,
      altitudeM: 5000,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "蒙古偶來步道",
      description: "廣袤草原任我行，將偶來精神帶入蒙古大草原。",
      locationName: "蒙古",
      lat: 47.9214,
      lng: 106.9055,
      lengthKm: 200,
      altitudeM: 1500,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "智異山環山道",
      description: "朝鮮半島第一條長距離步道，環繞韓國靈山智異山。",
      locationName: "韓國全羅道",
      lat: 35.3373,
      lng: 127.7314,
      lengthKm: 270,
      altitudeM: 1915,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "環韓國步道",
      description: "徒步環繞南韓一整圈，串聯韓國全國的步道網絡。",
      locationName: "韓國全境",
      lat: 37.5665,
      lng: 126.9780,
      lengthKm: 4500,
      altitudeM: 1000,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "呂基亞之路",
      description: "土耳其古文明的時光隧道，沿著地中海岸追尋古呂基亞文明。",
      locationName: "土耳其",
      lat: 36.2165,
      lng: 29.6392,
      lengthKm: 540,
      altitudeM: 1969,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "黎巴嫩山岳步道",
      description: "獨特的中東風情與自然生態，穿越黎巴嫩的雪松林與古老村莊。",
      locationName: "黎巴嫩",
      lat: 34.0038,
      lng: 35.9982,
      lengthKm: 440,
      altitudeM: 3088,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "跨高加索步道",
      description: "高峰連綿的生態寶庫，橫跨喬治亞與亞塞拜然的山脈步道。",
      locationName: "高加索地區",
      lat: 42.3154,
      lng: 43.3569,
      lengthKm: 3000,
      altitudeM: 5033,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "跨不丹步道",
      description: "連結不丹的過去、現在與未來，穿越幸福國度的高山步道。",
      locationName: "不丹",
      lat: 27.5142,
      lng: 90.4336,
      lengthKm: 400,
      altitudeM: 5320,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1580181010571-dcfa47c6024e?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "以色列國家步道",
      description: "走過以色列錯綜複雜的歷史之路，從北部加利利到南部紅海。",
      locationName: "以色列",
      lat: 31.7683,
      lng: 35.2137,
      lengthKm: 1100,
      altitudeM: 1208,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1544181093-c712b1fc8b69?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "喜馬拉雅大步道",
      description: "三千公尺高山上的嚴峻挑戰，橫跨尼泊爾全境的史詩級步道。",
      locationName: "尼泊爾",
      lat: 28.3949,
      lng: 84.1240,
      lengthKm: 1700,
      altitudeM: 6145,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "planned",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "亞伯拉罕步道",
      description: "串聯中東各國的古老文化路徑，追隨先知亞伯拉罕的足跡。",
      locationName: "中東地區",
      lat: 31.5,
      lng: 35.0,
      lengthKm: 300,
      altitudeM: 1000,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "貝加爾湖步道",
      description: "環湖一周的生態守護圈，環繞世界最深淡水湖的步道。",
      locationName: "俄羅斯西伯利亞",
      lat: 53.5587,
      lng: 108.1650,
      lengthKm: 2000,
      altitudeM: 800,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    await storage.createRoute({
      name: "絲路與歐亞之路",
      description: "跨越地理、國界與政治的藩籬，追尋古絲路的歷史足跡。",
      locationName: "歐亞大陸",
      lat: 39.9042,
      lng: 75.0,
      lengthKm: 8000,
      altitudeM: 4000,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1516496636080-14fb876e029d?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "亞洲"
    });

    // ============ 大洋洲 ============
    await storage.createRoute({
      name: "蒂阿拉羅瓦步道",
      description: "貫穿紐西蘭南北島的長路，邁向遙遠那端的長路。",
      locationName: "紐西蘭",
      lat: -41.2866,
      lng: 174.7756,
      lengthKm: 3000,
      altitudeM: 1723,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&q=80",
      isFavorite: true,
      status: "planned",
      region: "大洋洲"
    });

    await storage.createRoute({
      name: "比布蒙步道",
      description: "途經22個國家公園的澳洲式叢林漫遊，西澳最著名的長距離步道。",
      locationName: "西澳大利亞",
      lat: -33.8688,
      lng: 116.0173,
      lengthKm: 1000,
      altitudeM: 600,
      difficulty: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "planned",
      region: "大洋洲"
    });

    await storage.createRoute({
      name: "澳洲國家步道",
      description: "穿越澳洲東部高地的千里之路，從昆士蘭延伸至維多利亞州。",
      locationName: "澳洲東部",
      lat: -33.8688,
      lng: 151.2093,
      lengthKm: 5330,
      altitudeM: 2228,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "大洋洲"
    });

    // ============ 非洲 ============
    await storage.createRoute({
      name: "非洲之緣",
      description: "極致壯闘的非洲荒野體驗，穿越南非至埃及的非洲縱貫步道夢想。",
      locationName: "非洲全境",
      lat: -33.9249,
      lng: 18.4241,
      lengthKm: 12000,
      altitudeM: 5895,
      difficulty: "Hard",
      imageUrl: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80",
      isFavorite: false,
      status: "wishlist",
      region: "非洲"
    });
  }

  const companions = await storage.getCompanions();

  // 同步旅伴資料（可重複執行、保持一致）
  // - 刪除：小明
  // - 更名：小華 -> 鄺妹
  // - 更名：小美 -> 小豬
  const hasName = (name: string) => companions.some((c) => c.name === name);

  if (hasName("小明")) {
    await db.delete(companionsTable).where(eq(companionsTable.name, "小明"));
  }

  if (hasName("小華")) {
    await db
      .update(companionsTable)
      .set({ name: "鄺妹", avatarUrl: "https://i.pravatar.cc/150?u=kuangmei" })
      .where(eq(companionsTable.name, "小華"));
  } else if (!hasName("鄺妹") && companions.length === 0) {
    // 只有在完全沒 seed 過時才補建（避免誤新增）
    await storage.createCompanion({ name: "鄺妹", avatarUrl: "https://i.pravatar.cc/150?u=kuangmei" });
  }

  if (hasName("小美")) {
    await db
      .update(companionsTable)
      .set({ name: "小豬", avatarUrl: "https://i.pravatar.cc/150?u=xiaozhu" })
      .where(eq(companionsTable.name, "小美"));
  } else if (!hasName("小豬") && companions.length === 0) {
    await storage.createCompanion({ name: "小豬", avatarUrl: "https://i.pravatar.cc/150?u=xiaozhu" });
  }

  // 若 DB 原本完全沒有旅伴，補齊預設名單（已是新版）
  if (companions.length === 0) {
    console.log("Seeding companions...");
    // 這裡不再建立「小明」
    // 以新版名稱建立，若上面 else-if 已建立則不重複（理論上不會走到這裡）
    await storage.createCompanion({ name: "鄺妹", avatarUrl: "https://i.pravatar.cc/150?u=kuangmei" });
    await storage.createCompanion({ name: "小豬", avatarUrl: "https://i.pravatar.cc/150?u=xiaozhu" });
  }
}
