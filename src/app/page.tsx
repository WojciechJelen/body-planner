import { GeneratePlanButton } from "@/components/features/training-plan/generate-plan-button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  // Remove cookieStore logic
  const supabase = await createClient(); // Await the async client creation
  const {
    data: { session },
  } = await supabase.auth.getSession(); // Get session data

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Body Planner</h1>
      <div className="mt-8">
        <GeneratePlanButton />
      </div>
      {/* Display session data */}
      {session && (
        <div className="mt-8 p-4 border rounded bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-2">Current Session:</h2>
          <pre className="text-sm overflow-x-auto">
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
        </div>
      )}
    </main>
  );
}
