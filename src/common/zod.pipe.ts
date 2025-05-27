import { Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod/v4';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  transform(value: unknown) {
    return this.schema.parseAsync(value);
  }
}
