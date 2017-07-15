const { parse } = require('querystring')

const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/auth/', async (ctx, next) => {
  await next()

  const qs = parse(ctx.req._parsedUrl.query)

  ctx.body = `
    <style>
      a {
        color: navy;
        font-size: 20px;
        text-decoration: none;
      }
      
      a:hover {
        border-bottom: 1px solid currentColor;
      }
    </style>
    
    <a href="monux://auth/?code=${qs.code}">Click here to log in to Monux &rarr;</a>
  `
  ctx.status = 200
})

app.use(router.routes(), router.allowedMethods())

const port = process.env.PORT || 8977
app.listen(port)
