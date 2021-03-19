import { EnvOption } from "./base";
import { EnvLoadError } from "./error";
export class EnvBooleanOption extends EnvOption<boolean> {
  protected loadType(rawValue: string): boolean {
    const valueLower = rawValue.toLowerCase();
    if (["1", "true"].includes(valueLower)) {
      return true;
    } else if (["0", "false"].includes(valueLower)) {
      return false;
    } else {
      throw new EnvLoadError(
        `"${this.envVar}" must represent a boolean value {0, 1, true, false}! Found "${rawValue}".`,
      );
    }
  }
}
