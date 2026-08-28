import styles from './SearchSortBar.module.css'

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
        <div className={styles['search-sort-bar']}>
            <input 
                className={styles['search-input']}
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}    
            />

            <select
                className={styles['sort-select']}
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

