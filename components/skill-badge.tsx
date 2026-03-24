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
      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-default ${
        isDark
          ? "bg-secondary text-foreground/80 hover:bg-secondary/80"
          : "bg-secondary text-foreground/70 hover:bg-secondary/80"
      }`}
    >
      {name}
    </div>
  );
}
