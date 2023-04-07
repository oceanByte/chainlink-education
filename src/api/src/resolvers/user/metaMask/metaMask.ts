import { Next, Context } from 'koa'
import { hash } from 'bcryptjs'

import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

import { getSignedJwt } from '../helpers/getSignedJwt'
import { toPublicUser } from '../../../helpers/toPublicUser'

import { Jwt } from '../../../shared/user/Jwt'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { PublicUser } from '../../../shared/user/PublicUser'
import { User, UserModel } from '../../../shared/user/User'
import { Course, CourseModel } from '../../../shared/course/Course'
import { COURSES } from '../../../shared/course/CourseType';

import { getCourses } from '../../../helpers/getCourses';

export const find = async (ctx: Context, next: Next): Promise<void> => {

	let users = await UserModel.find({
		...ctx.request.query
	})

	if (users.length) {
		const user = users[0];
		
		const courses = await CourseModel.find({ userId: user._id });

		user.courses = courses;
		users = [user]
	}

	const response = { users }

  ctx.status = 200
  ctx.body = response

  await next()
}

export const create = async (ctx: Context, next: Next): Promise<void> => {
	const { publicAddress } = ctx.request.body

	const hashedPassword = await hash(publicAddress, 12);
	const user: User = await UserModel.create<User>({
		email: publicAddress + '@metamaskmail.com',
		username: publicAddress.slice(0, 10),
		hashedPassword,
		publicAddress,
	} as User)

	for (const course of COURSES) {
    await CourseModel.create<Course>({
      userId: user._id,
      title: course.title,
      description: course.description,
      difficulty: course.difficulty,
      status: course.status
    } as Course)
	}
  
	const publicUser: PublicUser = toPublicUser(user)

	const response = { user: publicUser }
	ctx.status = 200
	ctx.body = response

	await next()
}

export const auth = async (ctx: Context, next: Next) => {
	const { signature, publicAddress } = ctx.request.body;
	if (!signature || !publicAddress) 
		throw new ResponseError(400, 'Request should have signature and publicAddress')

	const user: User | null = await UserModel.findOne({ publicAddress }).lean()

	if (!user) {
		throw new ResponseError(401, `User with publicAddress ${publicAddress} is not found in database`)
	}

	const msg = `I am signing my one-time nonce: ${user.nonce}`;

	// We now are in possession of msg, publicAddress and signature. We
	// will use a helper from eth-sig-util to extract the address from the signature
	const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
	const address = recoverPersonalSignature({
		data: msgBufferHex,
		sig: signature,
	});

	// The signature verification is successful if the address found with
	// sigUtil.recoverPersonalSignature matches the initial publicAddress
	if (address.toLowerCase() !== publicAddress.toLowerCase()) {
		throw new ResponseError(401, `Signature verification failed`)
	}

	await UserModel.updateOne(
    { _id: user._id },
    { $set: { nonce: Math.floor(Math.random() * 10000) } },
  ).exec()

  const updatedUser: User = await UserModel.findOne(
    { _id: user._id },
  ).lean() as User

	const courses = await getCourses({ user: updatedUser });

	const publicUser: PublicUser = toPublicUser(updatedUser)

	const jwt: Jwt = getSignedJwt(user._id.toHexString(), user.username)

	const response = { jwt, user: {
		...publicUser,
		courses
	} }
	ctx.status = 200
	ctx.body = response

	await next()
};
	