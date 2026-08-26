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
        <div className={styles['form-cont']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['']}>
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
    )
}