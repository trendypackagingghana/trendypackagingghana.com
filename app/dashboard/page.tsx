import SignOutButton from "./SignOutButton";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-end p-4">
        <SignOutButton />
      </header>
      <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 72px)" }}>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      </div>
    </div>
  );
}
