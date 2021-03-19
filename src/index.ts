import * as dotenv from "dotenv";

import {
  EnumDef,
  EnvBooleanOption,
  EnvEnumOption,
  EnvNumberOption,
  EnvOption,
  EnvStringOption,
} from "./loaders";

type EnvOptionValueOf<O> = O extends EnvOption<infer T> ? T : never;

class EnvLoader {
  number(envVar: string): EnvNumberOption {
    return new EnvNumberOption(envVar);
  }

  string(envVar: string): EnvStringOption {
    return new EnvStringOption(envVar);
  }

  bool(envVar: string): EnvBooleanOption {
    return new EnvBooleanOption(envVar);
  }

  enum<E>(envVar: string, enumeration: EnumDef<E>): EnvEnumOption<E> {
    return new EnvEnumOption(envVar, enumeration);
  }

  load<T extends Record<string, EnvOption<any>>>(
    config: T,
  ): { [K in keyof T]: Readonly<EnvOptionValueOf<T[K]>> } {
    dotenv.config();
    const valueEntities = Object.entries(config).map(([key, option]) => {
      return [key, option.load()];
    });
    return Object.fromEntries(valueEntities);
  }
}

export const env = new EnvLoader();
