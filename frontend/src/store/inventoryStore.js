import create from 'zustand'

export const useInventoryStore = create(set => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (it) => set(state => ({ items: [it, ...state.items] })),
}))
