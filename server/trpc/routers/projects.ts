import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { publicProcedure, router } from "../trpc"

const prisma = new PrismaClient()

export const projectsRouter = router({
    get: publicProcedure
        .input(
            z.object({
                id: z.string({
                    required_error: "Id is required",
                }),
            })
        )
        .query(async ({ input }) => {
            return await prisma.projects.findMany({
                where: {
                    OR: [
                        {
                            owner_id: {
                                equals: input.id,
                            },
                        },
                        { user_ids: { has: input.id } },
                    ],
                },
            })
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
                created_at: z.string().datetime({
                    offset: true,
                }),
                owner_id: z.string({
                    required_error: "Owner id is required",
                }),
            })
        )
        .mutation(async ({ input }) => {
            return await prisma.projects.create({
                data: {
                    id: input.id,
                    name: input.name,
                    created_at: input.created_at,
                    owner_id: input.owner_id,
                },
            })
        }),
})
