import { Context, Next } from 'koa'

// import { IsCertifiedOutputs } from '../../../shared/user/IsCertified'
import { User } from '../../../shared/user/User'
import { authenticate } from '../helpers/authenticate'

export const PUBLIC_USER_MONGO_SELECTOR = '_id username emailVerified createdAt'

export const getReferralStats = async (ctx: Context, next: Next): Promise<void> => {
    // const username = ctx.request.query.username

    const user: User = await authenticate(ctx)

    // await rateLimit(user._id)
    //   const response: IsCertifiedOutputs = { userFound, isCertified }

    let pending = 0
    let completed = 0
    let rewarded = 0

    if (user && user.referral) {
        user.referral.forEach(item => {
            switch (item.status) {
                case 'PENDING':
                    pending++;
                    break;
                case 'COMPLETED':
                    completed++;
                    break;
                case 'REWARDED':
                    rewarded++;
                    break;
            }
        })
    }

    ctx.status = 200
    ctx.body = {
        stats: {
            pending,
            completed,
            rewarded
        }
    }

    await next()
}
