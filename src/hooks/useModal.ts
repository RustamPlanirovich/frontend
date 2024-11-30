import { useStore } from '../contexts/StoreContext';
import { ModalConfig } from '../stores/modalStore';

export const useModal = () => {
  const { modalStore } = useStore();

  return {
    show: (config: Omit<ModalConfig, 'id'>) => modalStore.show(config),
    hide: (id: string) => modalStore.hide(id),
    hideAll: () => modalStore.hideAll(),
    update: (id: string, config: Partial<ModalConfig>) => 
      modalStore.update(id, config),
  };
}; 