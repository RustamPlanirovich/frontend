import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../contexts/StoreContext';
import { BaseModal } from '../components/modals/BaseModal';

export const ModalProvider = observer(() => {
  const { modalStore } = useStore();

  return (
    <>
      {modalStore.activeModals.map((modal) => {
        const ModalComponent = modal.component;
        return (
          <BaseModal
            key={modal.id}
            open={true}
            onClose={() => modalStore.hide(modal.id)}
            maxWidth={modal.options?.maxWidth}
            fullScreen={modal.options?.fullScreen}
            closeOnClickOutside={modal.options?.closeOnClickOutside}
          >
            <ModalComponent
              {...modal.props}
              onClose={() => modalStore.hide(modal.id)}
            />
          </BaseModal>
        );
      })}
    </>
  );
}); 