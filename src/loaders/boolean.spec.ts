import { EnvBooleanOption } from "./boolean";

describe("Boolean loader", () => {
  const envKey = "IS_ENABLED";
  const booleanOption = new EnvBooleanOption(envKey);

  afterEach(() => {
    delete process.env[envKey];
  });

  describe("Valid values", () => {
    it('should read "0" as false', () => {
      process.env[envKey] = "0";
      expect(booleanOption.load()).toBe(false);
    });

    it('should read "false" as false', () => {
      process.env[envKey] = "false";
      expect(booleanOption.load()).toBe(false);
    });

    it('should read "FALSE" as false', () => {
      process.env[envKey] = "FALSE";
      expect(booleanOption.load()).toBe(false);
    });

    it('should read "1" as true', () => {
      process.env[envKey] = "1";
      expect(booleanOption.load()).toBe(true);
    });

    it('should read "true" as true', () => {
      process.env[envKey] = "true";
      expect(booleanOption.load()).toBe(true);
    });

    it('should read "TRUE" as true', () => {
      process.env[envKey] = "TRUE";
      expect(booleanOption.load()).toBe(true);
    });
  });

  it("should throw an error when the value in the environment is not boolean-like", () => {
    process.env[envKey] = "cabbage";
    expect(() => booleanOption.load()).toThrow(
      `"${envKey}" must represent a boolean value {0, 1, true, false}! Found "cabbage".`,
    );
  });

  it("should throw an error when a required value is missing", () => {
    expect(() => booleanOption.load()).toThrow(
      `Could not find "${envKey}" in the environment!`,
    );
  });

  it("should not throw an error when the value is missing and it is optional", () => {
    const optionalBooleanOption = new EnvBooleanOption(envKey).optional();
    expect(optionalBooleanOption.load()).toBeNull();
  });

  it("should not throw an error when the value is missing and it is optional", () => {
    const optionalBooleanOption = new EnvBooleanOption(envKey)
      .optional()
      .default(false);
    expect(optionalBooleanOption.load()).toBe(false);
  });
});
