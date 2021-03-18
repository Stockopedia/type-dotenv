import { EnvOption } from "./base";
import { EnvLoadError } from "./error";

export class EnvNumberOption extends EnvOption<number> {
  protected loadType(rawValue: string): number {
    const value = Number(rawValue);
    if (isNaN(value)) {
      throw new EnvLoadError(
        `${this.envVar} must be a number! Found "${rawValue}"`,
      );
    }
    return value;
  }
}
