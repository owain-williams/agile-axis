'use server'

import { db } from '@/lib/db'
import { action } from '@/lib/safe-action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  projectId: z.string(),
  issueId: z.string(),
})

export const markIssueCompleted = action(schema, async ({ projectId, issueId }) => {
  const data = {
    completed: true,
  }
  try {
    await db.issue.update({
      where: {
        id: issueId
      },
      data: {
        completed: true
      }
    })
  } catch (e) {
    console.log(e)
  }
  revalidatePath(`/projects/${projectId}`)
})