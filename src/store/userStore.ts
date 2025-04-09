import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@supabase/supabase-js";

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      user: null,
      isLoading: true,
      setUser: (user) =>
        set((state) => {
          state.user = user;
        }),
      setIsLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),
      clearUser: () =>
        set((state) => {
          state.user = null;
        }),
    })),
    {
      name: "body-planner-user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
