"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SkillBadgeProps {
  name: string;
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-default ${
        isDark
          ? "bg-primary/15 text-primary/90 hover:bg-primary/25 hover:shadow-sm hover:shadow-primary/10"
          : "bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-sm hover:shadow-primary/10"
      }`}
    >
      {name}
    </div>
  );
}
