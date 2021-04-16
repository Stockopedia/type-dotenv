import {
  EnumDef,
  EnvBooleanOption,
  EnvEnumOption,
  EnvNumberOption,
  EnvOption,
  EnvStringOption,
} from "./loaders";

export type EnvOptionValueOf<O> = O extends EnvOption<infer T> ? T : never;

export interface Loaders {
  string(envVar: string): EnvStringOption;

  bool(envVar: string): EnvBooleanOption;

  number(envVar: string): EnvNumberOption;

  enumeration<E>(envVar: string, enumeration: EnumDef<E>): EnvEnumOption<E>;
}
