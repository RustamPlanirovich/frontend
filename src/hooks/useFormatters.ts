import { useTranslation } from 'react-i18next';

export const useFormatters = () => {
  const { i18n } = useTranslation();

  const formatDate = (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };

    return new Intl.DateTimeFormat(i18n.language, defaultOptions).format(new Date(date));
  };

  const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    const defaultOptions: Intl.NumberFormatOptions = {
      maximumFractionDigits: 2,
      ...options,
    };

    return new Intl.NumberFormat(i18n.language, defaultOptions).format(number);
  };

  const formatCurrency = (amount: number, currency: string = 'RUB') => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const formatRelativeTime = (date: Date | string | number) => {
    const now = new Date();
    const target = new Date(date);
    const diffInSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });

    if (Math.abs(diffInSeconds) < 60) {
      return rtf.format(Math.floor(diffInSeconds), 'second');
    }
    if (Math.abs(diffInSeconds) < 3600) {
      return rtf.format(Math.floor(diffInSeconds / 60), 'minute');
    }
    if (Math.abs(diffInSeconds) < 86400) {
      return rtf.format(Math.floor(diffInSeconds / 3600), 'hour');
    }
    return rtf.format(Math.floor(diffInSeconds / 86400), 'day');
  };

  return {
    formatDate,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
  };
}; 