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
import {getCourse} from "./resolvers/course/getCourseById";
import { getCourseChapter } from "./resolvers/course/getCourseChapter";
import { validateChapterAnswer } from "./resolvers/course/validateChapterAnswer";
import {loginUser, findUser, storeUserProgress, getNonce} from "./resolvers/user/metaMask";
import certificate from "./resolvers/certificate";
import {validateChapterSolution} from "./resolvers/course/validateChapterSolution";

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

/** NEW FEATURES, SOME ROUTES CAN BE THE COPY OF EXISTED ROUTES **/

/** COURSE ROUTEs **/
router.get('/v1/course', getAllCourses) // Course[]: if user logged in returns courses with user progress inside
router.get('/v1/course/:path', getCourse) // Course: if user logged in returns course with user progress inside
router.get('/v1/course/:path/:chapterPath', getCourseChapter) // Chapter: Returns course with selected chapter inside and info about progress
router.post('/v1/course/:path/:chapterPath/validation', validateChapterAnswer) // Boolean: returns true if chapter answer is valid, false otherwise. Request body: {answer: [string]}
router.post('/v1/course/:path/:chapterPath/validation/solution', validateChapterSolution) // Boolean: returns true if chapter solution is valid, false otherwise. Request body: {solution: string}

/** USER ROUTES **/
router.post('/v1/users/nonce', getNonce) // => {publicAddress: string} => {nonce: number}: Will find or create User and return only nonce
router.post('/v1/users/login', loginUser) // => {signature, publicAddress} => {jwt: string, user: User} returns JWT token and current User
router.post('/v1/users', findUser) // JWT!: Will return User if JWT token is valid

// JWT!: Will store User progress and update course status to COMPLETED if all chapters are done and create a certificate to display image
router.post('/v1/users/progress', storeUserProgress)

/** CERTIFICATE ROUTES **/

// Certificate: if user logged in returns certificate by coursePath
router.get('/v1/certificate/:coursePath', certificate)

export { router }
