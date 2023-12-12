'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const schema = z.object({
  id: z.string(),
})

export const deleteProject = action(schema, async ({ id }) => {
  await db.issue.deleteMany({
    where: {
      projectId: id
    }
  })

  await db.project.delete({
    where: {
      id: id
    }
  })
  revalidatePath(`/projects/${id}`)
})