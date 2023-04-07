export const questions = [
  {
    question: 'Function modifiers are used to modify the behavior...',
    answers: ['of functions', 'of variables', 'of the class'],
    responses: ['of functions'],
  },
  {
    question: "What's the new value of x when a new account calls inc(42)?",
    answers: [
      '42',
      'x is never changed as the new account is not the owner of the contract',
      '0 as x is changed but then reverted to 0 because x must be lower than 42',
    ],
    responses: ['x is never changed as the new account is not the owner of the contract'],
  },
]
