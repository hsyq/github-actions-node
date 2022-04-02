const Koa = require('koa')
const Router = require('@koa/router')
const body = require('koa-body')

const app = new Koa()
const router = new Router()

app.use(body())

const PORT = process.env.PORT || 3003

app.use(async (ctx, next) => {
  const start = new Date()

  await next()

  const end = new Date() - start
  console.log((`${ctx.method} ${ctx.url} - ${end}ms`))
})

router.get('/', async (ctx) => {
  ctx.body = '欢迎访问 昆吾'
})

router.get('/user', async ctx => {
  ctx.body = {
    code: 0,
    msg: 'ok',
    data: [{
      id: '1',
      name: '昆吾'
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