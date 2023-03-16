import { Expose } from 'class-transformer'

export class v1GetCertificateInput {
  @Expose()
  coursePath!: string
}

