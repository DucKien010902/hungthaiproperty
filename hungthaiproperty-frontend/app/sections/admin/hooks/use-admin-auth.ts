"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
  clearStoredAdminToken,
  getAdminMe,
  getStoredAdminToken,
  loginAdmin,
  storeAdminToken,
} from "@/app/lib/admin-api";
import type { AdminUser } from "../admin-types";

type UseAdminAuthOptions = {
  onAuthenticated?: (token: string) => Promise<void> | void;
  onSignedOut?: () => void;
};

export function useAdminAuth(options: UseAdminAuthOptions = {}) {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const bootstrapSession = useCallback(async () => {
    const storedToken = getStoredAdminToken();

    if (!storedToken) {
      setIsBootstrapping(false);
      return;
    }

    try {
      const { user: nextUser } = await getAdminMe(storedToken);
      setAuthToken(storedToken);
      setUser(nextUser);
      await options.onAuthenticated?.(storedToken);
    } catch {
      clearStoredAdminToken();
      setAuthToken(null);
      setUser(null);
    } finally {
      setIsBootstrapping(false);
    }
  }, [options]);

  useEffect(() => {
    queueMicrotask(() => {
      void bootstrapSession();
    });
  }, [bootstrapSession]);

  const handleLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSigningIn(true);
      setLoginError("");

      try {
        const response = await loginAdmin(loginEmail, loginPassword);
        storeAdminToken(response.token);
        setAuthToken(response.token);
        setUser(response.user);
        await options.onAuthenticated?.(response.token);
        setLoginPassword("");
      } catch (error) {
        setLoginError(
          error instanceof Error
            ? error.message
            : "Đăng nhập thất bại. Vui long thử lại.",
        );
      } finally {
        setIsSigningIn(false);
        setIsBootstrapping(false);
      }
    },
    [loginEmail, loginPassword, options],
  );

  const handleSignOut = useCallback(() => {
    clearStoredAdminToken();
    setAuthToken(null);
    setUser(null);
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
    options.onSignedOut?.();
  }, [options]);

  return {
    authToken,
    handleLogin,
    handleSignOut,
    isBootstrapping,
    isSigningIn,
    loginEmail,
    loginError,
    loginPassword,
    setLoginEmail,
    setLoginPassword,
    user,
  };
}
