import { create } from "zustand";
import { persist } from "zustand/middleware";

import usersData from "@/data/users.json";
import type { User, UserRole } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      login: (email, password) => {
        const found = usersData.find(
          (u) => u.email === email && u.password === password
        );
        if (found) {
          const user: User = {
            id: found.id,
            name: found.name,
            email: found.email,
            role: found.role as UserRole,
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "pos-auth" }
  )
);
