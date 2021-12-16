// Fix the bugs in function add_comment @nearBindgen export class Comment { created_at: Timestamp = context.blockTimestamp; author: AccountId = context.predecessor;

constructor(public text: string) { }
}

const comments = new Vector < Comment > ("c"); static add_comment(text: string): void { comments.push(new Comment(text)); }
