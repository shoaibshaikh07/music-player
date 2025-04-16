// components/ui/search-input.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps): React.JSX.Element {
  return (
    <div className="mx-2 flex max-w-full items-center rounded-md border border-input px-3 py-0.5 shadow-sm">
      <Search className="mr-2 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        className="w-full rounded-sm border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
