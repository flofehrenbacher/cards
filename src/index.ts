import Koa, { Context, Next } from 'koa'
import mount from 'koa-mount'
import serve from 'koa-static'
import paths from 'path'
import { router } from './router'

const app = new Koa()
const PORT = process.env.PORT || 3000
const guiPath =
  process.env.NODE_ENV === 'production' ? './gui' : paths.join(__dirname, '../build/gui')
console.log('guiPath: ' + guiPath)

app.use(errorHandling)
app.use(router.middleware())

const gui = new Koa()
gui.use(serve(guiPath))
app.use(mount('/', gui))

app.listen(PORT, () => {
  console.log(`GUI available on http://localhost:${PORT}`)
})

async function errorHandling(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error) {
    console.log(error.message, {
      error,
      uri: ctx.querystring ? ctx.path + '?' + ctx.querystring : ctx.path,
      method: ctx.method,
      headers: JSON.stringify(ctx.headers),
    })
    throw error
  }
}
