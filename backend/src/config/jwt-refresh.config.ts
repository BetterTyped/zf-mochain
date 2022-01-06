export default {
  expiresIn: +process.env.AUTH_REFRESH_TOKEN_EXP || 86400,
};
