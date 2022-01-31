interface ValidatorType {
  type:
    | 'REQUIRE'
    | 'MINLENGTH'
    | 'MAXLENGTH'
    | 'MIN'
    | 'MAX'
    | 'EMAIL'
    | 'FILE';
  value?: string | number;
}

type ValidatorInitFn = (value?: string | number) => ValidatorType;

export const VALIDATOR_REQUIRE: ValidatorInitFn = () => ({ type: 'REQUIRE' });
export const VALIDATOR_FILE: ValidatorInitFn = () => ({ type: 'FILE' });
export const VALIDATOR_MINLENGTH: ValidatorInitFn = (
  value?: string | number
) => ({
  type: 'MINLENGTH',
  value: value,
});
export const VALIDATOR_MAXLENGTH: ValidatorInitFn = (
  value?: string | number
) => ({
  type: 'MAXLENGTH',
  value: value,
});
export const VALIDATOR_MIN: ValidatorInitFn = (value?: string | number) => ({
  type: 'MIN',
  value: value,
});
export const VALIDATOR_MAX: ValidatorInitFn = (value?: string | number) => ({
  type: 'MAX',
  value: value,
});
export const VALIDATOR_EMAIL: ValidatorInitFn = () => ({ type: 'EMAIL' });

export function validate(
  value: string | number,
  validators: Array<ValidatorType>
) {
  let isValid = true;

  for (const validator of validators) {
    isValid = isValid && false;

    if (validator.type === 'REQUIRE' && typeof value === 'string') {
      isValid = isValid && value.trim().length > 0;
    }

    if (
      validator.type === 'MINLENGTH' &&
      typeof value === 'string' &&
      typeof validator.value === 'number'
    ) {
      isValid = isValid && value.toString().trim().length >= validator.value;
    }

    if (
      validator.type === 'MAXLENGTH' &&
      typeof value === 'string' &&
      typeof validator.value === 'number'
    ) {
      isValid = isValid && value.toString().trim().length <= validator.value;
    }

    if (validator.type === 'MIN' && typeof validator.value === 'number') {
      isValid = isValid && +value >= validator.value;
    }

    if (validator.type === 'MAX' && typeof validator.value === 'number') {
      isValid = isValid && +value <= validator.value;
    }

    if (validator.type === 'EMAIL' && typeof value === 'string') {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }

  return isValid;
}
