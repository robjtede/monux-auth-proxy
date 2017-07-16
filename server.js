const { parse } = require("querystring");

const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

router.get("/auth/", async (ctx, next) => {
  await next();

  const { search } = ctx.req._parsedUrl;

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
    
    <p>
      <a href="monux://auth/${search}">
        Click here to log in to Monux &rarr;
      </a>
    </p>
    
    <p>
      This authentication proxy does NOT store or use any of your data.
    </p>
  `;
  ctx.status = 200;
});

app.use(router.routes(), router.allowedMethods());

const port = process.env.PORT || 8977;
app.listen(port);
