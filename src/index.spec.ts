import { env } from "./index";
import {
  EnvBooleanOption,
  EnvEnumOption,
  EnvNumberOption,
  EnvStringOption,
} from "./loaders";

enum Fruit {
  Apples = "apples",
  Bananas = "bananas",
}

describe("Env loader", () => {
  describe("string", () => {
    it("should create the appropriate EnvStringOption", () => {
      const envStringOption = env.string("VALUE");
      expect(envStringOption).toBeInstanceOf(EnvStringOption);
      expect((envStringOption as any).envVar).toBe("VALUE");
    });
  });

  describe("number", () => {
    it("should create the appropriate EnvNumberOption", () => {
      const envNumberOption = env.number("NUM");
      expect(envNumberOption).toBeInstanceOf(EnvNumberOption);
      expect((envNumberOption as any).envVar).toBe("NUM");
    });
  });

  describe("boolean", () => {
    it("should create the appropriate EnvBooleanOption", () => {
      const envBooleanOption = env.bool("IS_ACTIVE");
      expect(envBooleanOption).toBeInstanceOf(EnvBooleanOption);
      expect((envBooleanOption as any).envVar).toBe("IS_ACTIVE");
    });
  });

  describe("enum", () => {
    it("should create the appropriate EnvEnumOption", () => {
      const envEnumOption = env.enum("FRUIT", Fruit);
      expect(envEnumOption).toBeInstanceOf(EnvEnumOption);
      expect((envEnumOption as any).envVar).toBe("FRUIT");
    });
  });

  describe("load", () => {
    it("should load the appropriate data from the environment", () => {
      const stringKey = "STRING";
      const numberKey = "NUMBER";
      const booleanKey = "IS_ON";
      const enumKey = "FRUIT";

      const stringValue = "my string";

      process.env[stringKey] = stringValue;
      process.env[numberKey] = "42";
      process.env[booleanKey] = "1";
      process.env[enumKey] = "apples";

      const config = env.load({
        str: env.string(stringKey),
        num: env.number(numberKey),
        on: env.bool(booleanKey),
        fruit: env.enum(enumKey, Fruit),
      });

      expect(config).toEqual({
        str: stringValue,
        num: 42,
        on: true,
        fruit: Fruit.Apples,
      });

      delete process.env[stringKey];
      delete process.env[numberKey];
      delete process.env[booleanKey];
      delete process.env[enumKey];
    });
  });
});
