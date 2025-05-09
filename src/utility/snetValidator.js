import validate from "validate.js";

const snetValidator = validate;

const hasLowerCase = (value, options, key, attributes) => {
  if (/[a-z]/.test(value)) {
    return;
  }
  return options.message || "must contain a lowercase character";
};

const hasUpperCase = (value, options, key, attributes) => {
  if (/[A-Z]/.test(value)) {
    return;
  }
  return options.message || "must contain an uppercase character";
};

const hasNumber = (value, options, key, attributes) => {
  if (/[0-9]/.test(value)) {
    return;
  }
  return options.message || "must contain a number";
};

const hasAWSPasswordSplChar = (value, options, key, attributes) => {
  // eslint-disable-next-line no-useless-escape
  if (/[\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\,\>\<\'\:\;\|\_\~\`]/.test(value)) {
    return;
  }
  return options.message || "must contain a special character";
};

const validEmail = (value, options) => {
  const regexEmail = new RegExp(
    /* eslint-disable-next-line */
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (regexEmail.test(value)) {
    return;
  }
  return options?.message || `${value}  is not valid email`;
};

snetValidator.validators = {
  ...validate.validators,
  // custom validators
  hasLowerCase,
  hasUpperCase,
  hasNumber,
  hasAWSPasswordSplChar,
  validEmail,
};

// default options
snetValidator.options = { format: "flat" };

export default snetValidator;
