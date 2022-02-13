import { useCallback, useEffect, useState } from 'react';

let logoutTimer: NodeJS.Timeout;

export function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [expirationDate, setExpirationDate] = useState<Date | undefined>();

  const login = useCallback(
    (userId: string, token: string, expirationDate?: Date) => {
      setToken(token);
      setUserId(userId);

      const newExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setExpirationDate(newExpirationDate);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId,
          token,
          expirationDate: newExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setUserId(undefined);
    setToken(undefined);
    setExpirationDate(undefined);

    localStorage.removeItem('userData');
  }, []);

  // Check if unexpired token exists when component renders
  useEffect(() => {
    const userDataItem = localStorage.getItem('userData');
    const userData: { userId: string; token: string; expirationDate: Date } =
      userDataItem && JSON.parse(userDataItem);

    if (userData && new Date(userData.expirationDate) > new Date()) {
      login(userData.userId, userData.token, new Date(userData.expirationDate));
    }

    setIsLoading(false);
  }, [login]);

  // Logout timer
  useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      if (remainingTime > 0) {
        logoutTimer = setTimeout(logout, remainingTime);
      }
    } else {
      logoutTimer && clearTimeout(logoutTimer);
    }
  }, [logout, token, expirationDate]);

  return { isLoading, userId, token, login, logout };
}
