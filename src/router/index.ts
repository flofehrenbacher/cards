import Router from 'koa-joi-router'
import { Context } from 'koa'

export const router = Router()

router.get('/isonline', async function (ctx: Context) {
  ctx.body = true
})
