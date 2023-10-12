'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { UserGetDto } from '@/services/api.service';

interface UserContextProps {
  userDataLoggedIn: UserGetDto | undefined;
  setUserDataLoggedIn: Dispatch<SetStateAction<UserGetDto | undefined>>;
}

const UserContext = createContext<UserContextProps>({
  userDataLoggedIn: undefined,
  setUserDataLoggedIn: (): UserGetDto | undefined => undefined,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userDataLoggedIn, setUserDataLoggedIn] = useState<
    UserGetDto | undefined
  >();

  const state = {
    userDataLoggedIn,
    setUserDataLoggedIn,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const state = useContext(UserContext);

  if (state === undefined) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  return state;
};
