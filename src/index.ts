import * as dotenv from "dotenv";
import { EnvOption, EnvNumberOption, EnvBoolOption, EnvStringOption } from './loaders';

type EnvOptionValueOf<O> = O extends EnvOption<infer T> ? T : never;

class EnvLoader {
  number(envVar: string): EnvNumberOption {
    return new EnvNumberOption(envVar);
  }

  string(envVar: string): EnvStringOption {
    return new EnvStringOption(envVar);
  }

  bool(envVar: string): EnvBoolOption {
    return new EnvBoolOption(envVar);
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