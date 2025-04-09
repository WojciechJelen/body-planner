"use client";

import { useState, useCallback, memo } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { AuthError } from "@supabase/supabase-js";

const StatusDisplay = memo(
  ({ email }: { email: string | null | undefined }) => (
    <div className="flex items-center space-x-2">
      <div
        className={`h-2 w-2 rounded-full ${
          email ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <strong className="text-sm">Status:</strong>{" "}
      <span className="text-sm">
        {email ? `Logged in as ${email}` : "Not logged in"}
      </span>
    </div>
  )
);

StatusDisplay.displayName = "StatusDisplay";

const MessageDisplay = memo(({ message }: { message: string }) =>
  message ? (
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-sm">
      {message}
    </div>
  ) : null
);

MessageDisplay.displayName = "MessageDisplay";

export default function SupabaseDemo() {
  const { supabase } = useSupabase();
  const { user } = useUserStore();
  const [message, setMessage] = useState("");

  const sessionMutation = useMutation({
    mutationFn: async () => {
      return await supabase.auth.getSession();
    },
    onSuccess: (result) => {
      if (result.data.session) {
        setMessage(
          `Session found! User: ${result.data.session.user.email || "No email"}`
        );
      } else {
        setMessage("No active session found");
      }
    },
    onError: (error: AuthError) => {
      setMessage(`Error: ${error.message}`);
    },
  });

  const handleCheckSession = useCallback(() => {
    sessionMutation.mutate();
  }, [sessionMutation]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <CardTitle className="text-lg font-medium">
          Supabase Integration Demo
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="space-y-4">
          <StatusDisplay email={user?.email} />
          <MessageDisplay message={message} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-3">
        <Button
          onClick={handleCheckSession}
          disabled={sessionMutation.isPending}
          className="transition-all duration-200"
        >
          {sessionMutation.isPending ? "Checking..." : "Check Session"}
        </Button>
      </CardFooter>
    </Card>
  );
}
