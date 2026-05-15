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
    className="glass rounded-xl p-3 sm:p-5 hover:shadow-glow transition-shadow duration-300 h-full"
  >
    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground leading-tight">{label}</span>
    </div>
    <p className="text-xl sm:text-2xl font-bold text-foreground">{value}</p>
    {change && <p className="text-xs text-primary mt-1">{change}</p>}
  </motion.div>
);

export default StatCard;
