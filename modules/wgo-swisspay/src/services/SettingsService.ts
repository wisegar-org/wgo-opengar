import { GetConfig } from '@wisegar-org/wgo-settings';
import { Pop3Settings } from '../models/EmailModel';

export const getPop3Settings = () => {
  const settings: { [key: string]: any } = {};
  const config = GetConfig<Pop3Settings>();
  if (config.POP3_EMAIL_HOST == null) {
    throw new Error('POP3_EMAIL_HOST not set');
  }
  settings.POP3_EMAIL_HOST = config.POP3_EMAIL_HOST;

  if (config.POP3_EMAIL_PORT == null) {
    throw new Error('POP3_EMAIL_PORT not set');
  }
  settings.POP3_EMAIL_PORT = config.POP3_EMAIL_PORT;

  if (config.POP3_EMAIL_USER == null) {
    throw new Error('POP3_EMAIL_USER not set');
  }
  settings.POP3_EMAIL_USER = config.POP3_EMAIL_USER;

  if (config.POP3_EMAIL_PASSWORD == null) {
    throw new Error('POP3_EMAIL_PASSWORD not set');
  }
  settings.POP3_EMAIL_PASSWORD = config.POP3_EMAIL_PASSWORD;

  if (config.POP3_EMAIL_TLS == null) {
    throw new Error('POP3_EMAIL_TLS not set');
  }
  settings.POP3_EMAIL_TLS = config.POP3_EMAIL_TLS;

  if (config.POP3_EMAIL_EMAIL == null) {
    throw new Error('POP3_EMAIL_EMAIL not set');
  }
  settings.POP3_EMAIL_EMAIL = config.POP3_EMAIL_EMAIL;

  return settings;
};

export const getSmtpSettings = () => {
  const settings: { [key: string]: any } = {};
  const config = GetConfig<Pop3Settings>();
  if (config.EMAIL_HOST == null) {
    throw new Error('EMAIL_HOST not set');
  }
  settings.EMAIL_HOST = config.EMAIL_HOST;

  if (config.EMAIL_PORT == null) {
    throw new Error('EMAIL_PORT not set');
  }
  settings.EMAIL_PORT = config.EMAIL_PORT;

  if (config.EMAIL_SENDER_ADDRESS == null) {
    throw new Error('EMAIL_SENDER_ADDRESS not set');
  }
  settings.EMAIL_SENDER_ADDRESS = config.EMAIL_SENDER_ADDRESS;

  if (config.EMAIL_SENDER_PASSWORD == null) {
    throw new Error('EMAIL_SENDER_PASSWORD not set');
  }
  settings.EMAIL_SENDER_PASSWORD = config.EMAIL_SENDER_PASSWORD;

  if (config.EMAIL_SECURE == null) {
    throw new Error('EMAIL_SECURE not set');
  }
  settings.EMAIL_SECURE = config.EMAIL_SECURE;

  if (config.EMAIL_APP_ADDRESS == null) {
    throw new Error('EMAIL_APP_ADDRESS not set');
  }
  settings.EMAIL_APP_ADDRESS = config.EMAIL_APP_ADDRESS;

  return settings;
};
