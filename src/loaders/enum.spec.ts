import { EnvEnumOption } from "./enum";

enum Fruit {
  Apples = "apples",
  Bananas = "bananas",
}

describe("Enum loader", () => {
  const envKey = "FRUIT";
  const enumOption = new EnvEnumOption(envKey, Fruit);

  afterEach(() => {
    delete process.env[envKey];
  });

  it("should load the value if it belongs to the enumeration", () => {
    process.env[envKey] = "apples";
    expect(enumOption.load()).toEqual(Fruit.Apples);

    process.env[envKey] = "bananas";
    expect(enumOption.load()).toEqual(Fruit.Bananas);
  });

  it("should throw an error when the value in the environment is not in the enum", () => {
    process.env[envKey] = "cabbage";
    expect(() => enumOption.load()).toThrow(
      `The value for "${envKey}" is not in the enum! Value must be in {apples,bananas}`,
    );
  });

  it("should throw an error when a required value is missing", () => {
    expect(() => enumOption.load()).toThrow(
      `Could not find "${envKey}" in the environment!`,
    );
  });

  it("should not throw an error when the value is missing and it is optional", () => {
    const optionalEnumOption = new EnvEnumOption(envKey, Fruit).optional();
    expect(optionalEnumOption.load()).toBeNull();
  });

  it("should not throw an error when the value is missing and it is optional", () => {
    const optionalEnumOption = new EnvEnumOption(envKey, Fruit)
      .optional()
      .default(Fruit.Bananas);
    expect(optionalEnumOption.load()).toBe(Fruit.Bananas);
  });
});
