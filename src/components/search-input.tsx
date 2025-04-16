// components/ui/search-input.tsx
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  className,
  placeholder,
}: SearchInputProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "mx-2 flex max-w-full items-center rounded-md border border-input px-3 shadow-sm",
        className,
      )}
    >
      <Search className="mr-2 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        className="w-full rounded-sm border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
      />
    </div>
  );
}
