import { EnvNumberOption } from "./number";

describe("Number loader", () => {
  const envKey = "COUNT";
  const numberOption = new EnvNumberOption(envKey);

  afterEach(() => {
    delete process.env[envKey];
  });

  describe("Valid values", () => {
    it("should read positive integer values", () => {
      process.env[envKey] = "123";
      expect(numberOption.load()).toBe(123);
    });

    it("should read negative integer values", () => {
      process.env[envKey] = "-456";
      expect(numberOption.load()).toBe(-456);
    });

    it("should read positive float values", () => {
      process.env[envKey] = "123.456";
      expect(numberOption.load()).toBe(123.456);
    });

    it("should read negative float values", () => {
      process.env[envKey] = "-456.789";
      expect(numberOption.load()).toBe(-456.789);
    });

    it("should read 0", () => {
      process.env[envKey] = "0";
      expect(numberOption.load()).toBe(0);
    });
  });

  it("should throw an error when the value in the environment is not a number", () => {
    process.env[envKey] = "cabbage";
    expect(() => numberOption.load()).toThrow(
      `"${envKey}" must be a number! Found "cabbage".`,
    );
  });

  it("should throw an error when a required value is missing", () => {
    expect(() => numberOption.load()).toThrow(
      `Could not find "${envKey}" in the environment!`,
    );
  });

  it("should not throw an error when the value is missing and it is optional", () => {
    const optionalNumberOption = new EnvNumberOption(envKey).optional();
    expect(optionalNumberOption.load()).toBeNull();
  });

  it("should not throw an error when the value is missing and it is optional", () => {
    const optionalNumberOption = new EnvNumberOption(envKey)
      .optional()
      .default(42);
    expect(optionalNumberOption.load()).toBe(42);
  });
});
