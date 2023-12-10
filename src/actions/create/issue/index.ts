'use server'

import { db } from '@/lib/db'
import { action } from '@/lib/safe-action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  issueNumber: z.number().gte(0, 'Issue number must be greater than 0'),
  issueType: z.optional(z.enum(['BUG', 'TASK', 'STORY'])),
  priority: z.optional(
    z.number()
      .gte(1, "Priority must be between 1 - 5")
      .lte(5, "Priority must be between 1 - 5")),
  storyPoints: z.optional(z.number()),
  assignedToId: z.optional(z.string()),
  projectId: z.string(),
  epicId: z.optional(z.string()),
})

export const createIssue = action(schema, async ({ name, issueNumber, issueType, priority, storyPoints, assignedToId, projectId, epicId }) => {
  const data = {
    name: name,
    issueNumber: issueNumber,
    issueType: issueType || null,
    priority: priority || 3,
    storyPoints: storyPoints || null,
    assignedToId: assignedToId || null,
    projectId: projectId,
    epicId: epicId || null,
  }
  console.log(data)
  try {
    await db.issue.create({
      data: data
    })
  } catch (e) {
    console.log(e)
  }
  revalidatePath(`/projects/${projectId}`)
})