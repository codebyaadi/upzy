import z from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string(),
});

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;

export const UpdateWorkspaceSchema = CreateWorkspaceSchema.partial();

export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceSchema>;
