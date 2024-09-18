interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    [key: string]: any;
    user?: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      language_code?: string;
    };
    chat?: {
      id: number;
      title: string;
      type: string;
    };
    [key: string]: any;
  };
  viewportHeight: number;
  viewportWidth: number;
  colorScheme: 'light' | 'dark';
  isExpanded: boolean;
  expand(): void;
  close(): void;
  ready(): void;
  BackButton: {
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
  };
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
