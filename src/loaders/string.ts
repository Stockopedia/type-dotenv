import { EnvOption } from "./base";

export class EnvStringOption extends EnvOption<string> {
  protected loadType(rawValue: string): string {
    return rawValue;
  }
}
