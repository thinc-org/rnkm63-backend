export default () => ({
  port: parseInt(process.env.PORT),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  sso: {
    url: process.env.SSO_URL,
    appId: process.env.SSO_APPID,
    appSecret: process.env.SSO_APPSECRET,
  },
  jwtSecret: process.env.JWT_SECRET,
  inDev: process.env.IN_DEV,
});
