export const getPop3Settings = (config: any) => {
  const settings: { [key: string]: any } = {};
  settings.POP3_EMAIL_HOST = config.POP3_EMAIL_HOST || "";
  settings.POP3_EMAIL_PORT = config.POP3_EMAIL_PORT || "";
  settings.POP3_EMAIL_USER = config.POP3_EMAIL_USER || "";
  settings.POP3_EMAIL_PASSWORD = config.POP3_EMAIL_PASSWORD || "";
  settings.POP3_EMAIL_TLS = config.POP3_EMAIL_TLS || "";
  settings.POP3_EMAIL_EMAIL = config.POP3_EMAIL_EMAIL || "";

  return settings;
};

export const getSmtpSettings = (config: any) => {
  const settings: { [key: string]: any } = {};

  settings.SMTP_EMAIL_HOST = config.SMTP_EMAIL_HOST || "";
  settings.SMTP_EMAIL_PORT = config.SMTP_EMAIL_PORT || "";
  settings.SMTP_EMAIL_USER = config.SMTP_EMAIL_USER || "";
  settings.SMTP_EMAIL_PASSWORD = config.SMTP_EMAIL_PASSWORD || "";
  settings.SMTP_EMAIL_TLS = config.SMTP_EMAIL_TLS || "";
  settings.SMTP_EMAIL_EMAIL = config.SMTP_EMAIL_EMAIL || "";

  return settings;
};
