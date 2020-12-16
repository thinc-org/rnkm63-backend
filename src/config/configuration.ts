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
  jwt: { secret: process.env.JWT_SECRET, expires: process.env.JWT_EXPIRES },
  cookie: { secure: process.env.COOKIE_SECURE !== 'false' },
  gcs: {
    keyFileName: process.env.KEY_FILE_PATH,
    projectID: process.env.PROJECT_ID,
    bucketName: process.env.BUCKET_NAME,
    secret: process.env.IMG_FILE_NAME_SECRET,
  },
  jwtSecret: process.env.JWT_SECRET,
  inDev: process.env.IN_DEV,
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    use: process.env.USE_CORS === 'true',
  },
});
