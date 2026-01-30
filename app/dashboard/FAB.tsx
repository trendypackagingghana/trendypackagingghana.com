export default function FAB() {
  return (
    <button
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center z-40"
      aria-label="Create production run"
    >
      <span className="material-symbols-outlined text-2xl">add</span>
    </button>
  );
}
