import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface SearchStore {
  search: string;
  setSearch: (search: string) => void;
}

export const useSearchStore = create<SearchStore>()((set) => ({
  search: "",
  setSearch: (search) => set({ search: search }),
}));

interface TUseProdIds {
  prodIds: number[];
  setProdIds: (ids: number[]) => void;
  resetProdIds: () => void;
}

export const useProdIds = create<TUseProdIds>()(
  persist(
    (set) => ({
      prodIds: [],
      setProdIds: (ids: number[]) => set({ prodIds: ids }),
      resetProdIds: () => set({ prodIds: [] }),
    }),
    {
      name: "product_ids",
    },
  ),
);

interface TChatSidebar {
  users: boolean;
  showUsers: (val: boolean) => void;
}

export const useShowUsers = create<TChatSidebar>()((set) => ({
  users: false,
  showUsers: () => set((state) => ({ users: !state.users })),
}));
