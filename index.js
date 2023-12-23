import 'dotenv/config'
import linebot from 'linebot'
import nigiri from './commands/nigiri.js'
import appetizer from './commands/appetizer.js'
import drinks from './commands/drinks.js'
import special from './commands/special.js'
import takeOut from './commands/takeOut.js'
import appetizer2 from './commands/appetizer2.js'
import makimono from './commands/makimono.js'
import sashimi from './commands/sashimi.js'
import gunkan from './commands/gunkan.js'
import nigiri3 from './commands/nigiri3.js'
import nigiri2 from './commands/nigiri2.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }

  if (event.message.type === 'text') {
    if (event.message.text === '壽司') {
      event.reply({
        type: 'text',
        text: '今晚你想來點....',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '握壽司',
                // 按鈕文字
                label: '握壽司'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '軍艦壽司',
                // 按鈕文字
                label: '軍艦壽司'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '生魚片',
                // 按鈕文字
                label: '生魚片'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '卷類',
                // 按鈕文字
                label: '卷類'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '小菜',
                // 按鈕文字
                label: '小菜'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '飲料/甜點',
                // 按鈕文字
                label: '飲料/甜點'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '嚴選商品',
                // 按鈕文字
                label: '嚴選商品'
              }
            },
            {
              type: 'action',
              action: {
                // 傳訊息
                type: 'message',
                // 傳送的文字
                text: '外帶餐盒',
                // 按鈕文字
                label: '外帶餐盒'
              }
            }
          ]
        }
      })
    } else if (event.message.text === '握壽司') {
      nigiri(event)
      event.reply({
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'message',
                text: 'nigiri2',
                label: '不夠'
              }
            }
          ]
        }
      })
    } else if (event.message.text === 'nigiri2') {
      nigiri2(event)
      event.reply({
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'message',
                text: 'nigiri3',
                label: '更多'
              }
            }
          ]
        }
      })
    } else if (event.message.text === 'nigiri3') {
      nigiri3(event)
    } else if (event.message.text === '軍艦壽司') {
      gunkan(event)
    } else if (event.message.text === '生魚片') {
      sashimi(event)
    } else if (event.message.text === '小菜') {
      appetizer(event)
      event.reply({
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'message',
                text: 'appetizer2',
                label: '更多'
              }
            }
          ]
        }
      })
    } else if (event.message.text === 'appetizer2') {
      appetizer2(event)
    } else if (event.message.text === '飲料/甜點') {
      drinks(event)
    } else if (event.message.text === '嚴選商品') {
      special(event)
    } else if (event.message.text === '外帶餐盒') {
      takeOut(event)
    } else if (event.message.text === '卷類') {
      makimono(event)
    }
  }
})

bot.on('postback', (event) => {
  console.log(event.postback.data)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
