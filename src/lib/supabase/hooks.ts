import { useEffect } from "react";
import { supabase } from "./client";
import { PostgrestError } from "@supabase/supabase-js";
import {
  useQuery as useTanstackQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

// Generic query function for Supabase
export function useSupabaseQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  options?: Omit<
    UseQueryOptions<T | null, PostgrestError>,
    "queryKey" | "queryFn"
  >
) {
  return useTanstackQuery<T | null, PostgrestError>({
    queryKey,
    queryFn: async () => {
      const { data, error } = await queryFn();
      if (error) {
        throw error;
      }
      return data;
    },
    ...options,
  });
}

// Generic mutation function for Supabase
export function useSupabaseMutation<TData, TVariables>(
  mutationFn: (
    variables: TVariables
  ) => Promise<{ data: TData | null; error: PostgrestError | null }>,
  options?: {
    onSuccess?: (data: TData | null, variables: TVariables) => void;
    onError?: (error: PostgrestError, variables: TVariables) => void;
    invalidateQueries?: string[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation<TData | null, PostgrestError, TVariables>({
    mutationFn: async (variables) => {
      const { data, error } = await mutationFn(variables);
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: (data, variables) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: [query] });
        });
      }
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
  });
}

export function useSubscription<T extends Record<string, unknown>>(
  channel: string,
  event: "INSERT" | "UPDATE" | "DELETE" | "*",
  table: string,
  callback: (payload: T) => void
) {
  useEffect(() => {
    const subscription = supabase
      .channel(channel)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on(
        "postgres_changes" as any,
        { event, schema: "public", table },
        (payload: any) => callback(payload.new as T)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [channel, event, table, callback]);
}
