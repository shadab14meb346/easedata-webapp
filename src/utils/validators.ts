interface IValidationResult {
  valid: boolean;
  message?: string;
}

export const validateEmail = (email: string): IValidationResult => {
  if (!email) {
    return _invalid('global.validations.emailValid');
  }

  const EMAIL_REGEX = RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );
  return EMAIL_REGEX.test(email) ? _valid() : _invalid('Not a valid email');
};
function _valid(): IValidationResult {
  return { valid: true };
}

function _invalid(message: string): IValidationResult {
  return { valid: false, message };
}
