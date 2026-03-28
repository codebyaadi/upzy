import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service.js";
import type { CreateWorkspaceDto } from "./dto/create-workspace.dto.js";
import type { UpdateWorkspaceDto } from "./dto/update-workspace.dto.js";

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkspaceDto: CreateWorkspaceDto, orgId: string) {
    return this.prisma.workspaces.create({
      data: {
        orgId,
        name: createWorkspaceDto.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  findAll(orgId: string) {
    return this.prisma.workspaces.findMany({
      where: { orgId },
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    });
  }

  async findOne(id: string, orgId: string) {
    const workspace = await this.prisma.workspaces.findFirst({
      where: {
        id,
        orgId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }

    return workspace;
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto, orgId: string) {
    const existingWorkspace = await this.prisma.workspaces.findFirst({
      where: {
        id,
        orgId,
      },
      select: {
        id: true,
      },
    });

    if (!existingWorkspace) {
      throw new NotFoundException("Workspace not found");
    }

    return this.prisma.workspaces.update({
      where: {
        id,
      },
      data: {
        ...updateWorkspaceDto,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async remove(id: string, orgId: string) {
    const existingWorkspace = await this.prisma.workspaces.findFirst({
      where: {
        id,
        orgId,
      },
      select: {
        id: true,
      },
    });

    if (!existingWorkspace) {
      throw new NotFoundException("Workspace not found");
    }

    await this.prisma.workspaces.delete({
      where: {
        id,
      },
    });
  }
}
