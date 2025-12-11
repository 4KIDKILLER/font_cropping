import Fontmin from "fontmin";
import fs from 'fs'
const extractFont = fs.readFileSync('extract-bi.txt', { encoding: "utf8" })

const fontArray = extractFont.split('')
const fontResult = []
fontArray.forEach(world => !fontResult.includes(world) && fontResult.push(world))


const fileList = ['Normal', 'Medium', 'Bold']
for (let i = 0; i < fileList.length; i++) {
  const type = fileList[i]
  const fileName = `SourceHanSansCN-${type}.ttf`
  new Fontmin().src(`original/${fileName}`, { allowEmpty: true })
    // .use(Fontmin.otf2ttf())
    .use(
      Fontmin.glyph({
        text: fontResult.join(''),
        hinting: false // keep ttf hint info (fpgm, prep, cvt). default = true
      })
    )
    .dest('output/').run(function (err, files) {
      if (err) {
        throw err;
      }
      console.log(`文件${fileName}导出成功🚀🚀🚀`, files[0]);
    })
}