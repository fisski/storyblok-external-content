import { IContentService } from "./IContentService.js";

export class FakeContentService implements IContentService {
  async getContent() {
    const items = [
      {
        id: 514544,
        title: "Winning Run - Taiga Hasegawa (JPN)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/29/mh7b93J6rckVd7c5CgYLve0YWZm7UMUy-1693352924222.jpg",
      },
      {
        id: 514537,
        title: "Silver Run - Cameron Spalding (CAN)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/29/5oFjVNBsDOvyfkXIvwEIhTmtz9HsCztX-1693353392666.jpg",
      },
      {
        id: 514538,
        title: "Bronze Run - Yuto Miyamura (JPN)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/29/ZWxF80hwccZG5O1JduVZehHP8XZb1Xl9-1693353592895.jpg",
      },
      {
        id: 514525,
        title: "Winning Run - Lucia Georgalli (NZL)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/29/OuhZagF27KMjX4rOOQS8wJxPtPELr2gq-1693349134339.jpg",
      },
      {
        id: 514528,
        title: "Silver Run - Fanny Piantanida Chiesa (ITA)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/UfRKeSaY4OL3cz2XvIweIrHytWfwwOD5-1693354478791.jpg",
      },
      {
        id: 514531,
        title: "Bronze Run - Ally Hickman (GBR)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/GsUM9FTJYfL52gABCtUdU5prjhPW4R48-1693354904957.jpg",
      },
      {
        id: 514797,
        title: "Bronze Run  - Leo Landroe (NOR)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/0FXA0kOgRAdhGVZo3ntq1bOGele9idEQ-1693405549227.jpg",
      },
      {
        id: 514798,
        title: "Silver Run - Fadri Rhyner (SUI)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/mWMZO65G1XkXqNLYtoeFUUQYpR6rxU9z-1693405652646.jpg",
      },
      {
        id: 514793,
        title: "Winning Run - Charlie Beatty (CAN)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/zMAxFWbH7VSjz5GmWndaQpBwiK74TU0N-1693405814817.jpg",
      },
      {
        id: 514804,
        title: "Bronze Run - Mischa Thomas (NZL)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/SUgqOy6caP34f2M2qkHRbIP9KRoCywgh-1693405946389.jpg",
      },
      {
        id: 514803,
        title: "Silver Run - Flora Tabanelli (ITA)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/EauE47Lke3PEISAnuWYYKNXgD0IPrigq-1693406130119.jpg",
      },
      {
        id: 514800,
        title: "Winning Run - Muriel Mohr (GER)",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/anAAZGlAOxpDrS944mfZ2xYRGU3l475R-1693406291656.jpg",
      },
      {
        id: 514794,
        title: "Airtime of the Day - Jaakko Koskinen (FIN) sending it!",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/aI6Bkdfy8h5VB2hDAGRZbjrsXM1rjO60-1693406578636.jpg",
      },
      {
        id: 514594,
        title:
          "FIS Park & Pipe Junior World Championships Cardrona 2023 - Slopestyle Finals",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/30/Gd8AXVKeNAjgVELOIFQCwBMgccrPwZ6k-1693383739592.jpg",
      },
      {
        id: 511636,
        title:
          "Local Hero: Valentino Guseli wins Big Air Show at Edmonton World Cup 2022",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/25/6XdqHZKpoqsbwp9bHRaL24EcfXJd8Jq4-1692977174978.png",
      },
      {
        id: 511641,
        title:
          "Flashback: Jasmine Baird celebrates Big Air victory on home soil in Edmonton",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/21/rCoqvwTxCGj84F2FeszqfTtmhjmkVXZr-1692627359614.jpg",
      },
      {
        id: 511649,
        title:
          "Local Hero: 18-year-old Ruby Star Andrews grabs Slopestyle Podium in Mammoth Mountain",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/21/8m1ELsuAZTlSxhvbcy98jS3X32KqEf5y-1692628147406.jpg",
      },
      {
        id: 511652,
        title:
          "Flashback: Valentino Guseli wins Silver at the World Champs Bakuriani 2023 in Men's Halfpipe",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/21/WudoroQ2JvlLIpIRamjhhuFY0qV8eZlX-1692629123164.jpg",
      },
      {
        id: 511653,
        title:
          "Flashback: Megan Oldham's Silver Run Women's Slopestyle Bakuriani 2023",
        thumbnailUrl:
          "https://dve-images.imggaming.com/original/p/2023/08/21/10xHgICbcX0X5fxhdJPUGFxUev2rNNrR-1692629339775.jpg",
      },
    ];
    const count = items.length;

    const result = [];
    for (let i = 0; i < count; ++i) {
      const itemIndex = i % items.length;
      const item = { ...items[itemIndex] };
      item.id = i;
      result.push(item);
    }

    return result;
  }
}
