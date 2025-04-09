import SupabaseDemo from "@/components/examples/supabase-demo";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Body Planner</h1>
      <div className="mt-8">
        <SupabaseDemo />
      </div>
    </main>
  );
}
