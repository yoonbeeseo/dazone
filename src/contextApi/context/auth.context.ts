import { useContext, createContext } from "react";

export interface Context {
  user: User | null;
  initialized: boolean;
  isPending: boolean;
  signin: (email: string, password: string) => Promise<PromiseResult>; //! database
  signout: () => Promise<PromiseResult>;
  signup: (newUser: User) => Promise<PromiseResult>;
}

export const initialState: Context = {
  user: null,
  initialized: false,
  isPending: true,
  signin: async () => ({}),
  signout: async () => ({}),
  signup: async () => ({}),
};

export const context = createContext(initialState);

export const use = () => useContext(context);
