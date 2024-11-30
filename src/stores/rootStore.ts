import { makeAutoObservable } from 'mobx';
import { AuthStore } from './authStore';
import { UIStore } from './uiStore';
import { NotificationStore } from './notificationStore';
import { ModalStore } from './modalStore';

export class RootStore {
  authStore: AuthStore;
  uiStore: UIStore;
  notificationStore: NotificationStore;
  modalStore: ModalStore;

  constructor() {
    makeAutoObservable(this);
    
    this.authStore = new AuthStore(this);
    this.uiStore = new UIStore(this);
    this.notificationStore = new NotificationStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const rootStore = new RootStore(); 