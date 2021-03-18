import { EnvOption } from "./base";
import { EnvLoadError } from "./error";

export type EnumDef<T> = {
  [id: string]: T | string;
  [index: number]: string;
};

export class EnvEnumOption<E> extends EnvOption<E> {
  constructor(envVar: string, private readonly enumeration: EnumDef<E>) {
    super(envVar);
  }

  protected loadType(rawValue: string): E {
    let enumValues = Object.values(this.enumeration);
    if (enumValues.includes(rawValue)) {
      return (rawValue as unknown) as E;
    } else {
      throw new EnvLoadError(
        `The value for "${this.envVar}" is not in the enum! Value must be in {${enumValues}}`,
      );
    }
  }
}
