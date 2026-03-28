import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { WorkspaceController } from "./workspace.controller.js";
import { WorkspaceService } from "./workspace.service.js";

describe("WorkspaceController", () => {
  let controller: WorkspaceController;

  const mockWorkspaceService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceController],
      providers: [
        {
          provide: WorkspaceService,
          useValue: mockWorkspaceService,
        },
      ],
    }).compile();

    controller = module.get<WorkspaceController>(WorkspaceController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a workspace", async () => {
    const dto = { name: "My Workspace" };
    const orgId = "org_123";
    const result = { id: "ws_123", name: "My Workspace" };

    mockWorkspaceService.create.mockResolvedValue(result);

    await expect(controller.create(dto, orgId)).resolves.toEqual(result);

    expect(mockWorkspaceService.create).toHaveBeenCalledWith(dto, orgId);
    expect(mockWorkspaceService.create).toHaveBeenCalledTimes(1);
  });

  it("should return all workspaces", async () => {
    const orgId = "org_123";
    const result = [
      { id: "ws_1", name: "Workspace A" },
      { id: "ws_2", name: "Workspace B" },
    ];

    mockWorkspaceService.findAll.mockResolvedValue(result);

    await expect(controller.findAll(orgId)).resolves.toEqual(result);

    expect(mockWorkspaceService.findAll).toHaveBeenCalledWith(orgId);
    expect(mockWorkspaceService.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return one workspace", async () => {
    const id = "ws_123";
    const orgId = "org_123";
    const result = { id: "ws_123", name: "My Workspace" };

    mockWorkspaceService.findOne.mockResolvedValue(result);

    await expect(controller.findOne(id, orgId)).resolves.toEqual(result);

    expect(mockWorkspaceService.findOne).toHaveBeenCalledWith(id, orgId);
    expect(mockWorkspaceService.findOne).toHaveBeenCalledTimes(1);
  });

  it("should update a workspace", async () => {
    const id = "ws_123";
    const orgId = "org_123";
    const dto = { name: "Updated Workspace" };
    const result = { id: "ws_123", name: "Updated Workspace" };

    mockWorkspaceService.update.mockResolvedValue(result);

    await expect(controller.update(id, dto, orgId)).resolves.toEqual(result);

    expect(mockWorkspaceService.update).toHaveBeenCalledWith(id, dto, orgId);
    expect(mockWorkspaceService.update).toHaveBeenCalledTimes(1);
  });

  it("should remove a workspace", async () => {
    const id = "ws_123";
    const orgId = "org_123";

    mockWorkspaceService.remove.mockResolvedValue(undefined);

    await expect(controller.remove(id, orgId)).resolves.toBeUndefined();

    expect(mockWorkspaceService.remove).toHaveBeenCalledWith(id, orgId);
    expect(mockWorkspaceService.remove).toHaveBeenCalledTimes(1);
  });
});
