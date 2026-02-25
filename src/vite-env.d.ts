/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PIX_KEY: string;
  readonly VITE_PIX_MERCHANT_NAME: string;
  readonly VITE_PIX_MERCHANT_CITY: string;
  readonly VITE_WHATSAPP_NUM: string;
  readonly VITE_EVENT_DATE: string;
  readonly VITE_CHURCH_NAME: string;
  readonly VITE_GOOGLE_SHEET_TOKEN: string;
  readonly VITE_GOOGLE_SHEET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
