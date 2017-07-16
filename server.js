const { parse } = require("querystring");

const Entities = require("html-entities").XmlEntities;

const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const entities = new Entities();

router.get("/auth/", async (ctx, next) => {
  await next();

  const { search } = ctx.req._parsedUrl;
  const safeSearch = entities.encode(search);

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
      <a href="monux://auth/${safeSearch}">
        Click here to log in to Monux &rarr;
      </a>
    </p>
    
    <p>
      This authentication proxy does NOT store or use any of your data.
    </p>
    <p>
      It is not possible to make requests on your behalf since your "Client secret" is not sent though this proxy and the secret is required to request an access token.
    </p>
  `;
  ctx.status = 200;
});

app.use(router.routes(), router.allowedMethods());

const port = process.env.PORT || 8977;
app.listen(port);
