import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsEqualTo(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string): any => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return value === relatedValue
        },

        defaultMessage(args: ValidationArguments): string {
          const [relatedPropertyName] = args.constraints
          return `$property must match ${relatedPropertyName} exactly`
        },
      },
    })
  }
}
