import {Context, Next} from "koa";
import {ResponseError} from "../../../shared/mongo/ResponseError";
import {User, UserModel} from "../../../shared/user/User";
import {bufferToHex} from "ethereumjs-util";
import {recoverPersonalSignature} from "eth-sig-util";
import {PublicUser} from "../../../shared/user/PublicUser";
import {toPublicUser} from "../../../helpers/toPublicUser";
import {Jwt} from "../../../shared/user/Jwt";
import {getSignedJwt} from "../helpers/getSignedJwt";

export const loginUser = async (ctx: Context, next: Next) => {
    const {signature, publicAddress} = ctx.request.body;

    if (!signature || !publicAddress) throw new ResponseError(400, 'Bad user request')

    const user: User | null = await UserModel.findOne({publicAddress}).lean()

    if (!user) throw new ResponseError(404, `User not found`)

    const msg = `I am signing my one-time nonce: ${user.nonce}`;

    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));

    const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
    });

    if (address.toLowerCase() !== publicAddress.toLowerCase()) {
        throw new ResponseError(401, `Signature verification failed`)
    }

    await UserModel.updateOne({_id: user._id}, {$set: {nonce: Math.floor(Math.random() * 10000)}}).exec()

    const updatedUser: User = await UserModel.findOne({_id: user._id}).lean() as User;

    const publicUser: PublicUser = toPublicUser(updatedUser)

    const jwt: Jwt = getSignedJwt(user._id.toHexString(), user.username)

    ctx.status = 200
    ctx.body = {jwt, user: publicUser}

    await next();
};
