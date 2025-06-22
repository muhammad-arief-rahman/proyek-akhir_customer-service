import { z } from "zod"

export const storeCustomerSchema = z.object({
  name: z.string().min(1, "Name must not be empty"),
  organizationId: z.string().min(1, "Organization ID must not be empty"),
  industry: z.string().min(1, "Industry must not be empty"),
  subGroup: z.string().min(1, "Subgroup must not be empty"),
})

const storeCustomerSchemaArray = z.array(storeCustomerSchema).min(1)

export default storeCustomerSchema
export { storeCustomerSchemaArray }

export type StoreCustomerSchema = z.infer<typeof storeCustomerSchema>
export type StoreCustomerSchemaArray = z.infer<typeof storeCustomerSchemaArray>
