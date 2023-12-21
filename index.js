import 'dotenv/config'
import linebot from 'linebot'
import be from './commands/be.js'

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
      be(event)
    } else if (event.message.text === '迴轉壽司') {
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
                text: 'message text',
                // 按鈕文字
                label: 'message'
              }
            },
            {
              type: 'action',
              action: {
                type: 'camera',
                label: '相機'
              }
            },
            {
              type: 'action',
              action: {
                type: 'cameraRoll',
                label: '相簿'
              }
            },
            {
              type: 'action',
              action: {
                type: 'location',
                label: '位置'
              }
            },
            {
              type: 'action',
              action: {
                type: 'uri',
                uri: 'http://wdaweb.github.io',
                label: '網址'
              }
            },
            {
              type: 'action',
              action: {
                type: 'postback',
                label: 'postback',
                // 傳送文字
                // text: 'postback 文字',
                // postback 事件接收到的資料
                data: '1234'
              }
            }
          ]
        }
      })
    }
  }
})

bot.on('postback', (event) => {
  console.log(event.postback.data)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
