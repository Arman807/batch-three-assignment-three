import z from "zod"

const variantSchema = z.object({
    type: z.string().nonempty(),
    value: z.string().nonempty(),
  });
  
  const inventorySchema = z.object({
    quantity: z.number().int().nonnegative(),
    inStock: z.boolean(),
  });
const productValidation=z.object({
   body:z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number().positive(),
    category: z.string().default("Electronics"),
    tags: z.array(z.string().nonempty()),
    variants: z.array(variantSchema),
    inventory: inventorySchema,
   })
})

export const ProductValidation={
productValidation
}