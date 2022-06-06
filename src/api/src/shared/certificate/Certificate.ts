// prettier-ignore
import { ObjectId } from 'mongodb'

import { getModel, Property } from '../../helpers/typegoose'

export class Certificate {

  @Property({ nullable: true })
  coursePath!: string

  @Property({ nullable: true })
  username!: string

  @Property({ nullable: true })
  userId!: ObjectId

  @Property({ nullable: true })
  courseId!: string

  @Property({ nullable: true })
  code!: string
}

export const CertificateModel = getModel(Certificate, { schemaOptions: { timestamps: true } })
