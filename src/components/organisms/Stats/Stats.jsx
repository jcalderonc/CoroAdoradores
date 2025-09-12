import StatCard from "../../molecules/StatsCard/StatCard";
import { statCardData } from "./Data";

function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statCardData.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}

export default Stats;
