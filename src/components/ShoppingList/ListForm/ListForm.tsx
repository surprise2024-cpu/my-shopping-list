import { useForm } from "react-hook-form";
import { listSchema, type ListFormValues } from "../../../schema/listSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from './ListForm.module.css'

interface ListFormProps {
    defaultValues?: Partial<ListFormValues>;
    submitLabel: string; 
    onSubmit: (values: ListFormValues) => void;
    onCancel: () => void;
}

export function ListForm({ defaultValues, submitLabel, onSubmit, onCancel}: ListFormProps) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ListFormValues>({
        resolver: zodResolver(listSchema),
        defaultValues,
    });

    return (
        <div className={styles['overlay']} onClick={onCancel}>
            <div className={styles['form-cont']} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles['form-title']}>
                {defaultValues ? 'Rename List' : 'Create a New List'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['list-name']}>
                    <input 
                        type="text" 
                        {...register('name')}
                        placeholder="List name"
                    />
                    {errors.name && <span className={styles['error-text']}>{errors.name.message}</span>}
                </div>
                <div className={styles['btn-cont']}>
                    <button 
                        type="submit"
                        className={styles['submit-btn']} 
                    >
                        {submitLabel}
                    </button>
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className={styles['cancel-btn']}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
        </div>
        
    )
}