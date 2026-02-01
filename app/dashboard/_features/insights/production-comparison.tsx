import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getMonthlyComparison } from "../production-runs/_lib/data";
import ProductionComparisonChart from "./production-comparison-chart";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default async function ProductionComparison() {
  const data = await getMonthlyComparison();

  const now = new Date();
  const currentMonth = MONTH_NAMES[now.getMonth()];
  const lastMonthIdx = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const lastMonth = MONTH_NAMES[lastMonthIdx];

  const totalCurrent = data.length > 0 ? data[data.length - 1].currentMonth : 0;
  const totalLast = data.length > 0 ? data[data.length - 1].lastMonth : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base sm:text-lg">
              Production Runs
            </CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">
              {currentMonth} vs {lastMonth} — cumulative runs
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-lg sm:text-xl font-bold">{totalCurrent}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {totalCurrent >= totalLast ? "+" : ""}
              {totalCurrent - totalLast} from last month
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ProductionComparisonChart
          data={data}
          currentLabel={currentMonth}
          lastLabel={lastMonth}
        />
      </CardContent>
    </Card>
  );
}
