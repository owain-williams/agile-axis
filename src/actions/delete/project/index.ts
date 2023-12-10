'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  id: z.string(),
})

export const deleteProject = action(schema, async ({ id }) => {
  const project = await db.project.delete({
    where: {
      id: id
    }
  })
  revalidatePath('/projects')
})