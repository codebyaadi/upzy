import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from "@upzy/validator";

import { CurrentOrganizationId } from "../common/decorators/auth.decorator.js";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe.js";
import type { CreateWorkspaceDto } from "./dto/create-workspace.dto.js";
import type { UpdateWorkspaceDto } from "./dto/update-workspace.dto.js";
import { WorkspaceService } from "./workspace.service.js";

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ZodValidationPipe(CreateWorkspaceSchema))
    createWorkspaceDto: CreateWorkspaceDto,
    @CurrentOrganizationId() orgId: string,
  ) {
    return this.workspaceService.create(createWorkspaceDto, orgId);
  }

  @Get()
  findAll(@CurrentOrganizationId() orgId: string) {
    return this.workspaceService.findAll(orgId);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @CurrentOrganizationId() orgId: string) {
    return this.workspaceService.findOne(id, orgId);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(UpdateWorkspaceSchema))
    updateWorkspaceDto: UpdateWorkspaceDto,
    @CurrentOrganizationId() orgId: string,
  ) {
    return this.workspaceService.update(id, updateWorkspaceDto, orgId);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string, @CurrentOrganizationId() orgId: string) {
    return this.workspaceService.remove(id, orgId);
  }
}
