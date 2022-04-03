const Koa = require('koa')
const Router = require('@koa/router')
const log4js = require('log4js')

const app = new Koa()
const router = new Router()

const PORT = process.env.PORT || 3003

// 判断生产环境
const isProd = process.env.NODE_ENV === 'production'
const NODE_APP_INSTANCE = process.env.NODE_APP_INSTANCE

// 创建log4js的配置对象
log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'logs/access.log',
      pattern: 'yyyy-MM-dd',
      alwaysIncludePattern: true,
      // 传递给streamroller的参数
      keepFileExt: true,
      fileNameSep: '_', // 文件名分隔符，默认是'.'
      maxLogSize: 10 * 1024 * 1024, // 文件最大存储空间，默认是10M
      backups: 1, // 最多保留10个文件
    },
  },

  categories: {
    default: {
      appenders: ['access'],
      level: 'info'
    }
  },
  pm2: true
})

let logger = log4js.getLogger('access')

// 访问日志
app.use(async (ctx, next) => {
  const start = new Date()

  await next()
  const end = new Date() - start
  // 输出到pm2的日志 
  console.log((`${ctx.method} ${ctx.url} - ${end}ms - 实例ID:${NODE_APP_INSTANCE}`))
  // log4js管理的日志，不会打印在控制台
  logger.info((`${ctx.method} ${ctx.url} - ${end}ms - 实例ID:${NODE_APP_INSTANCE}`))
})

router.get('/', async (ctx) => {
  ctx.body = '欢迎访问'
})

router.get('/user', async ctx => {
  ctx.body = {
    code: 0,
    msg: 'ok',
    data: [{
      id: '1',
      name: 'Jack'
    }]
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error(err)
})

app.listen(PORT, (err) => {
  console.log(`服务器启动成功: ${PORT}`)
})
