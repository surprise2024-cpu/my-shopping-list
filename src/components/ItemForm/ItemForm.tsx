import { useForm } from "react-hook-form";
import { itemSchema, type ItemFormValues } from "../../schema/itemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from './ItemForm.module.css'
import { CategorySelect } from "../Category/CategorySelect";


interface ItemFormProps {
  userId: number;
  defaultValues?: Partial<ItemFormValues>;
  submitLabel: string;
  onSubmit: (values: ItemFormValues) => void;
  onCancel: () => void;
}

export function ItemForm({ userId, defaultValues, submitLabel, onSubmit, onCancel}: ItemFormProps) {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues,
  });

  const image = watch('image');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];

    if (!file) return 
    const reader = new FileReader();
    reader.onload = () => setValue('image', reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles['form-cont']}> 

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className={styles['']}>

          <input 
            type="text"
            {...register('name')}
            placeholder="Item name"
            className={styles['item-name']}
          />

          {errors.name && <span className={styles['error-text']}>{errors.name.message}</span>}
       
        </div>
        <div className={styles['']}>

          <input 
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            placeholder="Quantity"
            className={styles['item-qty']}
          />

          {errors.quantity && <span className={styles['error-text']}>{errors.quantity.message}</span>}
        
        </div>
        <div className={styles['']}>

          <CategorySelect 
            userId={userId}
            value={watch('category') ?? ''}
            onChange={(category) => setValue('category', category, { shouldValidate: true })}
            />
          
          {errors.category && <span className={styles['error-text']}>{errors.category.message}</span>}
        
        </div>
        <div className={styles['']}>
          
          <input 
            type="text"
            {...register('name')}
            placeholder="Item name"
            className={styles['item-name']}
          />
          
          {errors.name && <span className={styles['error-text']}>{errors.name.message}</span>}
        
        </div>
        <div className={styles['']}>
          
          <div>

              <textarea 
                placeholder="Notes (optional)"
                {...register('notes')} 
              />
          
          </div>
        
        </div>
        <div className={styles['']}>
          
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles['item-image']}
          />
          
          {image && <img src={image} alt='Preview' width={80} height={80}/>}
        
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