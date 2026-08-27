import { useNavigate, useSearchParams } from "react-router"
import { useAuth } from "../store/useAuth"
import { useGetListsQuery } from "../store/api/apiSlice"
import { useMemo } from "react"


export function SearchResultsPage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const q = (searchParams.get('q') ?? '').trim().toLowerCase()

    const { data: lists, isLoading } = useGetListsQuery(
        { userId: user?.id ?? 0 },
        { skip: !user }
    )

    const matchingLists = useMemo(() => {
        if (!lists || !q) return []
        return lists.filter((list) => list.name.toLowerCase().includes(q))
    }, [lists, q])

    const matchingItems = useMemo(() => {
        if (!lists || !q) return []
        return lists.flatMap((list) => 
        list.items
            .filter((item) => item.name.toLowerCase().includes(q))
            .map((item) => ({ item, listId: list.id, listName: list.name }))
        )
    }, [lists, q])

    if (!user) return null

    return (
        <div>
            <h1>Search results for '{q}'</h1>

            {isLoading && <p>Loading...</p>}

            {!isLoading && !q && <p>Type something in the search bar above to get started.</p>}

            {!isLoading && q && matchingLists.length === 0 && matchingItems.length === 0 && (
                <p>No lists or items match your search</p>
            )}

            {matchingLists.length > 0 && (
                <section>
                    <h2>Lists</h2>
                    {matchingLists.map((list) => (
                        <div 
                            key={list.id}
                            onClick={() => navigate(`/lists/${list.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {list.name} ({list.items.length} item{list.items.length === 1 ? '' : 's'})
                        </div>
                    ))}
                </section>
            )}

            {matchingItems.length > 0 && (
                <section>
                    <h2>Items</h2>
                    {matchingItems.map(({ item, listId, listName }) => (
                        <div 
                            key={item.id}
                            onClick={() => navigate(`/lists/${listId}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.name} - in '{listName}'
                        </div>
                    ))}
                </section>
            )}
        </div>
    )



}