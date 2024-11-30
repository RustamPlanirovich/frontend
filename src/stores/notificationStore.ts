import { makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  timestamp: number;
  read: boolean;
}

export class NotificationStore {
  notifications: Notification[] = [];
  isNotificationCenterOpen: boolean = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false,
    };
    this.notifications.unshift(newNotification);
  };

  markAsRead = (id: string) => {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  };

  markAllAsRead = () => {
    this.notifications.forEach(n => n.read = true);
  };

  removeNotification = (id: string) => {
    this.notifications = this.notifications.filter(n => n.id !== id);
  };

  toggleNotificationCenter = () => {
    this.isNotificationCenterOpen = !this.isNotificationCenterOpen;
  };

  clearAll = () => {
    this.notifications = [];
  };
} 