import { profile } from "@/lib/data/profile";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="wrap flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          {profile.name}, {profile.location}
        </p>
        <p>Last updated October 2026</p>
      </div>
    </footer>
  );
}
