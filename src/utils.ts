import console from "console";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import S3service from "./s3"

const fileName = "img/list2.png";
class Utils {
  async generateHandwriting(text: string): Promise<string[]> {
    const requestId = nanoid();
    text = text.replace(/\s\s+/g, " ").replace("\n", "").trim();
    const textArrays = text.match(/(.|[\r\n]){1,1750}/g);
    const responseArray = [];
    for (let i = 0; i < textArrays.length; i++) {

      
      const p = new Promise(async (res, rej) => {
        const loadedFont = await Jimp.loadFont("fonts/GloriaHallelujah-Regular.ttf.fnt");
        const loadedImage = await Jimp.read(fileName);
        await loadedImage.print(loadedFont, 100, 100, textArrays[i], 2200);
        await loadedImage.write(`output/${requestId +i}.png`)
        responseArray.push(`https://kurs-text-to-handwriting.s3.amazonaws.com/public/${requestId +i}.png`);
        const buff = await loadedImage.getBufferAsync('image/png')
        await S3service.addFile(`public/${requestId +i}.png`, buff, 'image/png')
        res(`${requestId +i}.png`)
      })
      try{
        await p
      }catch(err){
        console.log(err)
      }
      
    }
    return responseArray;
  }
}

export default new Utils();
