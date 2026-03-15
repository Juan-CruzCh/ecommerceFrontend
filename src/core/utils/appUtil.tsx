
import { create } from 'zustand'

interface ModalState {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

export const useEstadoModal = create<ModalState>((set) => ({
    isOpen: false,
    openModal: () =>
        set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))


interface ReloadState {
    isReloading: number;
    triggerReload: () => void;
}

export const useEstadoReload = create<ReloadState>((set) => ({
    isReloading: 0,
    triggerReload: () => set((state) => ({ isReloading: state.isReloading + 1 })),
}));