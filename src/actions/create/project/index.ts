'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  name: z.string(),
  shortCode: z.string().max(4),
  userId: z.string().optional()
})

export const createProject = action(schema, async ({ name, shortCode, userId }) => {
  const project = await db.project.create({
    data: {
      name: name,
      userId: userId,
      shortcode: shortCode
    }
  })
  revalidatePath('/dashboard')
})