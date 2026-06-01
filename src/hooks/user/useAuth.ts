'use client';

import useSWR from 'swr';
import { useAppStatus } from '@/contexts/AppContext';
import { useServerStatus } from '@/contexts/ServerContext';
import { useAuthErrorHandler } from '@/hooks/user/useAuthErrorHandler';
import { useEffect, useMemo } from 'react';

export const useAuth = () => {
  const serverValues = useServerStatus();
  const appValues = useAppStatus();
  const { logout } = useAuthErrorHandler();

  // 🔐 Read JWT token from localStorage
  const jwtToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // 🧠 Compute SWR fetch key only when token and server URL are available
  const fetchKey = useMemo(() => {
    if (!jwtToken || !serverValues?.currentServer?.url) {
      return null;
    }
    return `${serverValues.currentServer.url}/v1/users/me/info`;
  }, [jwtToken, serverValues?.currentServer?.url]);

  // 🌐 Fetcher function to load user info
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    // 🚫 Unauthorized: throw error with status for SWR to catch
    if (res.status === 401) {
      throw Object.assign(new Error('Unauthorized'), { status: 401 });
    }

    // ❌ Any other HTTP error
    if (!res.ok) {
      throw Object.assign(new Error('Fetch failed'), { status: res.status });
    }

    // ✅ Successful response
    const json = await res.json();

    // 🔄 Update app-level auth status
    appValues.setIsUserLoaded(true);
    appValues.setAuthenticated(true);

    return json.data;
  };

  // ⚡ SWR handles data fetching, caching and error state
  const {
    data: user,
    error,
    mutate,
  } = useSWR(fetchKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  // 🔁 Handle logout if error is 401 (unauthorized)
  if (error?.status === 401) {
    logout();
  }

  // 🧹 Reset SWR cache and error if token or server is missing
  useEffect(() => {
    if (!jwtToken || !serverValues?.currentServer?.url) {
      const key = `${serverValues?.currentServer?.url}/v1/users/me/info`;
      if (key) {
        mutate(null, { revalidate: false }); // 🧼 Reset SWR state for that key
      }
    }
  }, [jwtToken, serverValues?.currentServer?.url]);

  // Expose user info, error state and mutate function
  return {
    user,
    error,
    mutate,
  };
};
