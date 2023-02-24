import {Context, Next} from "koa";
import {User} from "../../../shared/user/User";
import {authenticate} from "../helpers/authenticate";
import {toPublicUser} from "../../../helpers/toPublicUser";

export const findUser = async (ctx: Context, next: Next): Promise<void> => {
    const user: User = await authenticate(ctx);

    ctx.status = 200;
    ctx.body = {user: toPublicUser(user)};

    await next();
}
