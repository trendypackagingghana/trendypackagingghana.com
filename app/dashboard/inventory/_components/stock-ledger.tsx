import { StockMovement } from "@/types/inventory";

export function StockLedger({ movements }: { movements: StockMovement[] }) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            history
          </span>
          Stock Ledger
        </h3>
        <button className="text-primary text-xs font-bold hover:underline">
          View All
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {movements.length === 0 ? (
            <div className="text-center text-muted-foreground py-10 text-sm">
                No recent movements.
            </div>
        ) : (
            movements.map((move) => (
            <LedgerItem key={move.id} move={move} />
            ))
        )}
      </div>
    </div>
  );
}

function LedgerItem({ move }: { move: StockMovement }) {
  const isIncoming = move.direction === "in";
  const date = new Date(move.created_at).toLocaleString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="p-3 bg-muted/40 rounded-lg border border-border/50 relative">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div
            className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
              isIncoming
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                : "bg-rose-100 dark:bg-rose-900/30 text-rose-600"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {isIncoming ? "arrow_downward" : "arrow_upward"}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold">
              {move.item_sku}{" "}
              <span
                className={`text-xs font-bold ${
                  isIncoming ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {isIncoming ? "STOCK IN" : "STOCK OUT"}
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {move.reason}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-sm font-bold ${
              isIncoming ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isIncoming ? "+" : "-"}{move.quantity}
          </p>
          
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
        <span className="text-[10px] text-muted-foreground">
          {date}
        </span>
        {/* Placeholder for Balance if we track it per movement snapshot */}
        {/* <span className="text-[10px] font-bold text-muted-foreground">
          BAL: --
        </span> */}
      </div>
    </div>
  );
}
