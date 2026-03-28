import { PipeTransform, ArgumentMetadata, BadRequestException, Logger } from "@nestjs/common";
import { ZodType, ZodError, treeifyError } from "zod";

export class ZodValidationPipe<T> implements PipeTransform {
  private readonly logger = new Logger(ZodValidationPipe.name);

  constructor(private schema: ZodType<T>) {}

  transform(value: unknown, metadata: ArgumentMetadata): T {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const tree = treeifyError(error);
        const fieldErrors: Record<string, string[]> = {};
        const traverse = (obj: any, path: string[] = []) => {
          for (const key in obj) {
            if (Array.isArray(obj[key])) {
              fieldErrors[[...path, key].join(".")] = obj[key];
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
              traverse(obj[key], [...path, key]);
            }
          }
        };
        traverse(tree);

        this.logger.warn(
          `Validation failed for ${metadata.type}${metadata.data ? ` (${metadata.data})` : ""}: ${JSON.stringify(fieldErrors)}`,
        );

        throw new BadRequestException({
          message: "Validation failed",
          errors: fieldErrors,
        });
      }

      this.logger.error(
        `Unexpected validation error for ${metadata.type}${metadata.data ? ` (${metadata.data})` : ""}`,
        error instanceof Error ? error.stack : undefined,
      );

      throw new BadRequestException("Validation failed");
    }
  }
}
