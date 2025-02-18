import { ConfigurableModuleBuilder } from '@nestjs/common';

export const { MODULE_OPTIONS_TOKEN, ConfigurableModuleClass } =
  new ConfigurableModuleBuilder<UsersModuleOptions>().build();

export interface UsersModuleOptions {
  readonly initialUser?: string;
  readonly initialPassword?: string;
}
