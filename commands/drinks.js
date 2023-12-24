import axios from 'axios'
import * as cheerio from 'cheerio'
import cardsTemplate from '../templates/cards.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://www.sushiexpress.com.tw/sushi-express/Menu')
    const $ = cheerio.load(data)
    const replies = []
    $('.grid-item')
      .slice(74, 81)
      .each(function () {
        // 取出圖片和標題
        const image = $(this).find('img').attr('src')
        const imageUrl = new URL(image, 'https://www.sushiexpress.com.tw/').href
        const product = $(this).find('.product_name').text().trim()
        const productEn = $(this).find('.product_name_en').text()
        const price = $(this).find('.product_name_jp').text()
        // 產生一個新的回應訊息模板
        const template = cardsTemplate()
        // 修改模板內容
        template.hero.url = imageUrl
        template.body.contents[0].text = product
        template.body.contents[1].contents[0].contents[0].text = productEn
        template.body.contents[1].contents[1].contents[0].text = '價格(Price)'
        template.body.contents[1].contents[1].contents[1].text = price
        template.footer.contents[0].action.label = '搜索附近店家'
        template.footer.contents[0].action.uri = 'https://www.sushiexpress.com.tw/sushi-express/location?brand=1'
        replies.push(template)
      })

    const result = await event.reply({
      type: 'flex',
      altText: '爭鮮',
      contents: {
        type: 'carousel',
        contents: replies
      }
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
