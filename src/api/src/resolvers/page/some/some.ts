import { Context, Next } from 'koa'

const solc = require('solc')

export const compileSmartContracts = async (ctx: Context, next: Next): Promise<void> => {

    const { data: source } = ctx.request.body
    
    ctx.status = 200
    ctx.body = {data: JSON.stringify(solc.compile(source, 1))}

    await next()
}
