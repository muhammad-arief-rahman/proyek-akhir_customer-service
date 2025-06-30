import { z } from "zod"

export const storeCustomerSchema = z.object({
  name: z.string().min(1, "Name must not be empty"),
  organizationId: z.string().min(1, "Organization ID must not be empty"),
  industry: z.string().min(1, "Industry must not be empty"),
  subGroup: z.string().min(1, "Subgroup must not be empty"),
  userId: z.string().optional(),
})

const storeCustomerSchemaArray = z.array(storeCustomerSchema).min(1)
const storeCustomerPatchSchema = storeCustomerSchema.partial()

export default storeCustomerSchema
export { storeCustomerSchemaArray, storeCustomerPatchSchema }

export type StoreCustomerSchema = z.infer<typeof storeCustomerSchema>
export type StoreCustomerPatchSchema = z.infer<typeof storeCustomerPatchSchema>
export type StoreCustomerSchemaArray = z.infer<typeof storeCustomerSchemaArray>
