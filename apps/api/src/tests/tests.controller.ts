// tests.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { TestsService } from './tests.service';

interface CreateTestDto {
  id: string;
  name: string;
}

@Controller('tests')
export class TestsController {
  private readonly logger = new Logger(TestsController.name);

  constructor(private readonly testsService: TestsService) {}

  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    this.logger.log(
      `Creating test with data: ${JSON.stringify(createTestDto)}`,
    );

    try {
      // Validate input
      if (!createTestDto.id || !createTestDto.name) {
        this.logger.error('Missing required fields: id or name');
        throw new BadRequestException('Both id and name are required');
      }

      if (
        typeof createTestDto.id !== 'string' ||
        typeof createTestDto.name !== 'string'
      ) {
        this.logger.error('Invalid field types - id and name must be strings');
        throw new BadRequestException('id and name must be strings');
      }

      this.logger.debug(
        `Validated input - ID: ${createTestDto.id}, Name: ${createTestDto.name}`,
      );

      // Call service to create test
      const result = await this.testsService.create(createTestDto);

      this.logger.log(`Successfully created test with ID: ${result?.id}`);

      return {
        success: true,
        message: 'Test created successfully',
        data: result,
      };
    } catch (error: any) {
      this.logger.error(`Failed to create test: ${error.message}`, error.stack);

      if (error instanceof BadRequestException) {
        throw error;
      }

      // Handle database errors
      if (error.code === '23505') {
        // Unique constraint violation
        throw new HttpException(
          `Test with ID "${createTestDto.id}" already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        'Internal server error while creating test',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
