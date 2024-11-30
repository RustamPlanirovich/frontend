import { makeAutoObservable } from 'mobx';
import { RootStore } from './rootStore';

export interface ModalConfig {
  id: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  options?: {
    closeOnClickOutside?: boolean;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fullScreen?: boolean;
  };
}

export class ModalStore {
  private modals: Map<string, ModalConfig> = new Map();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get activeModals(): ModalConfig[] {
    return Array.from(this.modals.values());
  }

  show = (config: Omit<ModalConfig, 'id'>) => {
    const id = Date.now().toString();
    this.modals.set(id, { ...config, id });
    return id;
  };

  hide = (id: string) => {
    this.modals.delete(id);
  };

  hideAll = () => {
    this.modals.clear();
  };

  update = (id: string, config: Partial<ModalConfig>) => {
    const modal = this.modals.get(id);
    if (modal) {
      this.modals.set(id, { ...modal, ...config });
    }
  };
} 