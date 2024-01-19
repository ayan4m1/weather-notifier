import 'dotenv/config';

export const logging = {
  level: process.env.WEA_LOG_LEVEL || 'info',
  timestampFormat: process.env.WEA_LOG_TIME_FMT
};

export const smtp = {
  host: process.env.WEA_SMTP_HOST,
  port: parseInt(process.env.WEA_SMTP_PORT || '25', 10),
  secure: (process.env.WEA_SMTP_SECURE || 'f').toLowerCase().startsWith('t'),
  auth: {
    user: process.env.WEA_SMTP_USERNAME,
    pass: process.env.WEA_SMTP_PASSWORD
  }
};
