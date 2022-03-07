import { Length } from 'class-validator'
import { Expose } from 'class-transformer'
import { ObjectId } from 'mongodb'

export class DeleteAccountPendingInputs {
  @Expose()
  @Length(2, 50)
  id!: ObjectId
}

export class DeleteAccountPermanentlyInputs {
  @Expose()
  @Length(16, 32)
  token!: string

  @Expose()
  @Length(8, 50)
  password!: string
}

export class DeleteAccountPendingOutputs {
  @Expose()
  @Length(16, 16)
  token!: string
}
