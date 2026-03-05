import { useState } from "react";

import { Search, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useProductStore } from "@/stores/product";

export function SearchBar() {
  const [value, setValue] = useState("");
  const setSearchQuery = useProductStore(useShallow((s) => s.setSearchQuery));
  const debouncedSearch = useDebounce(setSearchQuery, 500);

  const handleSearch = (v: string) => {
    setValue(v);
    debouncedSearch(v);
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        placeholder="Search products..."
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        className="pr-8 pl-9"
      />
      {value && (
        <button
          onClick={() => handleSearch("")}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
