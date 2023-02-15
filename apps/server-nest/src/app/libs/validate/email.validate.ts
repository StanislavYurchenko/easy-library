// eslint-disable-next-line no-useless-escape
export const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validateEmail = (email: string): boolean => emailRegExp.test(email);
