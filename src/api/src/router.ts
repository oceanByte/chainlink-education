import * as Router from '@koa/router'
import { Context } from 'koa'

import { getPublicUser } from './resolvers/page/getPublicUser/getPublicUser'
import { setName } from './resolvers/page/setName/setName'
import { addProgress } from './resolvers/user/addProgress/addProgress'
import { changePassword } from './resolvers/user/changePassword/changePassword'
import { forgotPassword } from './resolvers/user/forgotPassword/forgotPassword'
import { isCertified } from './resolvers/user/isCertified/isCertified'
import { login } from './resolvers/user/login/login'
import { getReferralStats } from './resolvers/user/referral/getReferralStats'
import { resetPassword } from './resolvers/user/resetPassword/resetPassword'
import { signUp } from './resolvers/user/signUp/signUp'
import { find, create, auth } from './resolvers/user/metaMask/metaMask'
import { deleteAccountPending, deleteAccountPermanently } from './resolvers/user/deleteAccount/deleteAccount'
import { changeEmailPending, changeEmailSuccess } from './resolvers/user/changeEmail/changeEmail'
import { getCertificate } from './resolvers/page/getCertificate/getCertificate'
import { changeUsername } from './resolvers/user/changeUsername/changeUsername'

const router = new Router()

router.get('/', async (ctx: Context) => {
  ctx.body = 'You are not supposed to be here ;)'
})

// metamask
router.get('/users', find)
router.post('/users', create)
router.post('/auth', auth)

router.post('/user/sign-up', signUp)
router.post('/user/login', login)
router.post('/user/add-progress', addProgress)
router.post('/user/reset-password', resetPassword)
router.post('/user/forgot-password', forgotPassword)
router.post('/user/change-password', changePassword)
router.get('/user/is-certified', isCertified)
router.get('/user/referral', getReferralStats)

router.post('/user/change-username', changeUsername)
router.get('/user/change-email', changeEmailSuccess)
router.post('/user/change-email', changeEmailPending)

router.post('/user/delete-account', deleteAccountPending)
router.post('/user/permanently-delete-account', deleteAccountPermanently)

router.post('/page/get-certificate', getCertificate)
router.post('/page/get-user', getPublicUser)
router.post('/page/set-name', setName)


export { router }
