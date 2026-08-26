

interface SortOption {
    value: string
    label: string
}

interface SearchSortBarProps {
    search: string
    sort: string
    onSearchChange: (value: string) => void
    onSortChange: (value: string) => void
    searchPlaceholder?: string
    sortOptions: SortOption[]
}

export function SearchSortBar({
    search, 
    sort,
    onSearchChange,
    onSortChange, 
    searchPlaceholder = 'Search...',
    sortOptions,
}: SearchSortBarProps) {
    return (
        <div className="search-sort-bar">
            <input 
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}    
            />

            <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value=''>Sort by...</option>
                {
                    sortOptions.map((opt) => (
                        <option 
                            key={opt.value}
                            value={opt.value}    
                        >
                            {opt.label}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

