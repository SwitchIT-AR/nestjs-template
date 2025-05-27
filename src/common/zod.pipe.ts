import { Injectable, PipeTransform } from '@nestjs/common';
import { ZodTypeAny } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: ZodTypeAny) {}

  transform(value: unknown) {
    return this.schema.parseAsync(value);
  }
}
