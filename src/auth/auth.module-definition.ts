import { ConfigurableModuleBuilder } from '@nestjs/common';

export const { MODULE_OPTIONS_TOKEN, ConfigurableModuleClass } =
  new ConfigurableModuleBuilder<AuthModuleOptions>().build();

export interface AuthModuleOptions {
  readonly useSecureCookies?: boolean;
}
