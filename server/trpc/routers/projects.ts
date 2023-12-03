import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { publicProcedure, router } from "../trpc"

const prisma = new PrismaClient()

export const projectsRouter = router({
    get: publicProcedure.query(async () => {
        return await prisma.user_projects.findMany()
    }),

    create: publicProcedure
        .input(
            z.object({
                id: z.string({
                    required_error: "Id is required",
                }),
                name: z.string({
                    required_error: "Name is required",
                }),
                created_at: z.date({
                    required_error: "Created at is required",
                }),
            })
        )
        .mutation(async ({ input }) => {
            return await prisma.projects.create({
                data: {
                    id: input.id,
                    name: input.name,
                    created_at: input.created_at,
                },
            })
        }),
})
