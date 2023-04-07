import {Context, Next} from 'koa'

import {ResponseError} from './shared/mongo/ResponseError'

export const sanitize = () => async (ctx: Context, next: Next): Promise<void> => {
    const body = JSON.stringify(ctx.request.body)

    if (ctx.request.href.includes('/validation/solution')) {
        await next()
    } else {
        const forbidden = new RegExp('<|>', 'i')
        if (forbidden.test(body)) throw new ResponseError(400, 'Forbidden characters')
        else await next()
    }
}
