"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { useUserStore } from "@/store/userStore";

type SupabaseContextType = {
  supabase: typeof supabase;
  session: Session | null;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, isLoading, setIsLoading } = useUserStore();
  const [session, setSession] = useState<Session | null>(null);

  const initializeAuth = useCallback(async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      }

      if (session) {
        setSession(session);
        setUser(session.user);
      }
    } catch (error) {
      console.error("Error during auth initialization:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setIsLoading]);

  useEffect(() => {
    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initializeAuth, setUser]);

  const value = {
    supabase,
    session,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {!isLoading && children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  const { user } = useUserStore();

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return { ...context, user };
};
