import {
  EnumDef,
  EnvBooleanOption,
  EnvEnumOption,
  EnvNumberOption,
  EnvOption,
  EnvStringOption,
} from "./loaders";
import { EnvOptionValueOf, Loaders } from './models'

const loaders: Loaders = {
  number(envVar: string): EnvNumberOption {
    return new EnvNumberOption(envVar);
  },

  string(envVar: string): EnvStringOption {
    return new EnvStringOption(envVar);
  },

  bool(envVar: string): EnvBooleanOption {
    return new EnvBooleanOption(envVar);
  },

  enumeration<E>(envVar: string, enumeration: EnumDef<E>): EnvEnumOption<E> {
    return new EnvEnumOption(envVar, enumeration);
  },
} as const;

function loadConfig<T extends Record<string, EnvOption<any>>>(
  config: T,
): { [K in keyof T]: Readonly<EnvOptionValueOf<T[K]>> } {
  const valueEntities = Object.entries(config).map(([key, option]) => {
    return [key, option.load()];
  });
  return Object.fromEntries(valueEntities);
}

export const loadEnv = <T extends Record<string, EnvOption<any>>>(
  configFactory: (loaders: Loaders) => T,
): { [K in keyof T]: Readonly<EnvOptionValueOf<T[K]>> } => {
  const config = configFactory(loaders);
  return loadConfig(config);
};
