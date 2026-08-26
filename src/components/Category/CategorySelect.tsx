import { number } from 'zod';
import styles from './CategorySelect.module.css';
import { useAddCategoryMutation, useGetCategoriesQuery } from '../../store/api/apiSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface CategorySelectProps {
    userId: number;
    value: string;
    onChange: (category: string) => void;
}

export function CategorySelect({ userId, value, onChange }: CategorySelectProps) {
    const { data: categories } = useGetCategoriesQuery(userId);
    const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '__new__') {
            setIsAddingNew(true)
            return
        }

        onChange(e.target.value);
    }

    const handleSaveNewCategory = async () => {
        const name = newCategoryName.trim();

        if (!name) return

        const existing = categories?.find(
            (c) => c.name.toLowerCase() === name.toLowerCase()
        )

        if (existing) {
            onChange(existing.name)
            setNewCategoryName('')
            setIsAddingNew(false)
            toast.info(`'${existing.name}' alreadt exists - using that one`)
            
            return
        }

        try {

            const created = await addCategory({ name, userId }).unwrap()
            onChange(created.name)
            setNewCategoryName('')
            setIsAddingNew(false)
            toast.success('Category added')
        }
        catch {
            toast.error('Category could not be added')
        }

        if (isAddingNew) {
            return (
                <div>
                    <input 
                        placeholder='New category name'
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        autoFocus
                    />
                    <button 
                        type='button'
                        onClick={handleSaveNewCategory}
                        disabled={isAdding}
                    >
                        Save
                    </button>
                    <button 
                        type='button'
                        onClick={() => {setIsAddingNew(false)
                            setNewCategoryName('')
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )
        }

        return (
            <select value={value} onChange={handleSelectChange}>
                <option value='' disabled>
                    Select a category
                </option>
                {
                    categories?.map((c) => (
                        <option key={c.name}>
                            {c.name}
                        </option>
                    ))
                }

                <option value='__new__'>+ Add new category</option>
            </select>
        )
    }
}