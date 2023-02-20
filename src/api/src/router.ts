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
import { issueCertificate, setAddress } from './resolvers/user/issueCertificate/issueCertificate'
import { getAllCourses } from "./resolvers/course/getAllCourses";
import { getCourseById } from "./resolvers/course/getCourseById";
import { getCourseChapter } from "./resolvers/course/getCourseChapter";
import { validateChapterAnswer } from "./resolvers/course/validateChapterAnswer";

const router = new Router()

router.get('/', async (ctx: Context) => {
  ctx.body = 'hello :)'
})

// metamask
router.get('/users', find)
router.post('/users', create)
router.post('/auth', auth)

router.post('/user/change-address', setAddress)
router.post('/user/issue-certificate', issueCertificate)

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

router.get('/v1/course', getAllCourses)
router.get('/v1/course/:courseId', getCourseById)
router.get('/v1/course/:courseId/:chapterId', getCourseChapter)

router.post('/v1/course/:courseId/:chapterId/validation', validateChapterAnswer)

export { router }
