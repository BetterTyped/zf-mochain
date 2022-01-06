export default {
  secret: process.env.AUTH_SECRET || 'jwt-auth-secret',
  signOptions: {
    expiresIn: +process.env.AUTH_TOKEN_EXP || 300,
  },
};
