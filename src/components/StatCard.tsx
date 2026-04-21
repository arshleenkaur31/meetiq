import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  index: number;
}

const StatCard = ({ icon: Icon, label, value, change, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
    className="glass rounded-xl p-5 hover:shadow-glow transition-shadow duration-300"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    {change && <p className="text-xs text-primary mt-1">{change}</p>}
  </motion.div>
);

export default StatCard;
