import { loadEnv } from "./index";
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
    const stringKey = "VALUE";
    beforeAll(() => {
      process.env[stringKey] = "val";
    });

    afterAll(() => {
      delete process.env[stringKey];
    });

    it("should create the appropriate EnvStringOption", () => {
      let envStringOption: EnvStringOption | undefined;
      loadEnv(({ string }) => {
        envStringOption = string(stringKey);
        return { value: envStringOption };
      });
      expect(envStringOption).toBeInstanceOf(EnvStringOption);
      expect((envStringOption as any).envVar).toBe(stringKey);
    });
  });

  describe("number", () => {
    const numberKey = "NUM";
    beforeAll(() => {
      process.env[numberKey] = "42";
    });

    afterAll(() => {
      delete process.env[numberKey];
    });

    it("should create the appropriate EnvNumberOption", () => {
      let envNumberOption: EnvNumberOption | undefined;
      loadEnv(({ number }) => {
        envNumberOption = number(numberKey);
        return { num: envNumberOption };
      });
      expect(envNumberOption).toBeInstanceOf(EnvNumberOption);
      expect((envNumberOption as any).envVar).toBe(numberKey);
    });
  });

  describe("boolean", () => {
    const boolKey = "IS_ACTIVE";
    beforeAll(() => {
      process.env[boolKey] = "1";
    });

    afterAll(() => {
      delete process.env[boolKey];
    });

    it("should create the appropriate EnvBooleanOption", () => {
      let envBooleanOption: EnvBooleanOption | undefined;
      loadEnv(({ bool }) => {
        envBooleanOption = bool("IS_ACTIVE");
        return { isActive: envBooleanOption };
      });
      expect(envBooleanOption).toBeInstanceOf(EnvBooleanOption);
      expect((envBooleanOption as any).envVar).toBe("IS_ACTIVE");
    });
  });

  describe("enum", () => {
    const enumKey = "FRUIT";
    beforeAll(() => {
      process.env[enumKey] = "apples";
    });

    afterAll(() => {
      delete process.env[enumKey];
    });

    it("should create the appropriate EnvEnumOption", () => {
      let envEnumOption: EnvEnumOption<Fruit> | undefined;
      loadEnv(({ enumeration }) => {
        envEnumOption = enumeration("FRUIT", Fruit);
        return { fruit: envEnumOption };
      });
      expect(envEnumOption).toBeInstanceOf(EnvEnumOption);
      expect((envEnumOption as any).envVar).toBe("FRUIT");
    });
  });

  describe("loading", () => {
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

      const config = loadEnv(({ string, number, bool, enumeration }) => ({
        str: string(stringKey),
        num: number(numberKey),
        on: bool(booleanKey),
        fruit: enumeration(enumKey, Fruit),
      }));

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
