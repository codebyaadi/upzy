import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PrismaService } from "../prisma/prisma.service.js";
import { WorkspaceService } from "./workspace.service.js";

describe("WorkspaceService", () => {
  let service: WorkspaceService;

  const mockPrismaService = {
    workspaces: {
      create: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a workspace", async () => {
      const dto = { name: "My Workspace" };
      const orgId = "org_123";
      const result = { id: "ws_123", name: "My Workspace" };

      mockPrismaService.workspaces.create.mockResolvedValue(result);

      await expect(service.create(dto, orgId)).resolves.toEqual(result);

      expect(mockPrismaService.workspaces.create).toHaveBeenCalledWith({
        data: {
          orgId,
          name: dto.name,
        },
        select: {
          id: true,
          name: true,
        },
      });
    });
  });

  describe("findAll", () => {
    it("should return all workspaces for an org", async () => {
      const orgId = "org_123";
      const result = [
        { id: "ws_1", name: "Workspace A" },
        { id: "ws_2", name: "Workspace B" },
      ];

      mockPrismaService.workspaces.findMany.mockResolvedValue(result);

      await expect(service.findAll(orgId)).resolves.toEqual(result);

      expect(mockPrismaService.workspaces.findMany).toHaveBeenCalledWith({
        where: { orgId },
        select: {
          id: true,
          name: true,
        },
        orderBy: { name: "asc" },
      });
    });
  });

  describe("findOne", () => {
    it("should return one workspace", async () => {
      const id = "ws_123";
      const orgId = "org_123";
      const result = { id: "ws_123", name: "My Workspace" };

      mockPrismaService.workspaces.findFirst.mockResolvedValue(result);

      await expect(service.findOne(id, orgId)).resolves.toEqual(result);

      expect(mockPrismaService.workspaces.findFirst).toHaveBeenCalledWith({
        where: {
          id,
          orgId,
        },
        select: {
          id: true,
          name: true,
        },
      });
    });

    it("should throw NotFoundException if workspace does not exist", async () => {
      const id = "ws_404";
      const orgId = "org_123";

      mockPrismaService.workspaces.findFirst.mockResolvedValue(null);

      await expect(service.findOne(id, orgId)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update a workspace", async () => {
      const id = "ws_123";
      const orgId = "org_123";
      const dto = { name: "Updated Workspace" };

      mockPrismaService.workspaces.findFirst.mockResolvedValue({ id });
      mockPrismaService.workspaces.update.mockResolvedValue({
        id,
        name: "Updated Workspace",
      });

      await expect(service.update(id, dto, orgId)).resolves.toEqual({
        id,
        name: "Updated Workspace",
      });

      expect(mockPrismaService.workspaces.findFirst).toHaveBeenCalledWith({
        where: {
          id,
          orgId,
        },
        select: {
          id: true,
        },
      });

      expect(mockPrismaService.workspaces.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: {
          ...dto,
        },
        select: {
          id: true,
          name: true,
        },
      });
    });

    it("should throw NotFoundException if workspace does not exist before update", async () => {
      const id = "ws_404";
      const orgId = "org_123";
      const dto = { name: "Updated Workspace" };

      mockPrismaService.workspaces.findFirst.mockResolvedValue(null);

      await expect(service.update(id, dto, orgId)).rejects.toThrow(NotFoundException);

      expect(mockPrismaService.workspaces.update).not.toHaveBeenCalled();
    });
  });

  describe("remove", () => {
    it("should delete a workspace", async () => {
      const id = "ws_123";
      const orgId = "org_123";

      mockPrismaService.workspaces.findFirst.mockResolvedValue({ id });
      mockPrismaService.workspaces.delete.mockResolvedValue({ id });

      await expect(service.remove(id, orgId)).resolves.toBeUndefined();

      expect(mockPrismaService.workspaces.findFirst).toHaveBeenCalledWith({
        where: {
          id,
          orgId,
        },
        select: {
          id: true,
        },
      });

      expect(mockPrismaService.workspaces.delete).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
    });

    it("should throw NotFoundException if workspace does not exist before delete", async () => {
      const id = "ws_404";
      const orgId = "org_123";

      mockPrismaService.workspaces.findFirst.mockResolvedValue(null);

      await expect(service.remove(id, orgId)).rejects.toThrow(NotFoundException);

      expect(mockPrismaService.workspaces.delete).not.toHaveBeenCalled();
    });
  });
});
