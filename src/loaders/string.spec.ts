import { EnvStringOption } from "./string";

describe("String loader", () => {
  const envKey = "VAL";
  const stringOption = new EnvStringOption(envKey);

  afterEach(() => {
    delete process.env[envKey];
  });

  it("should read the value verbatim", () => {
    const value = "my value 123";
    process.env[envKey] = value;
    expect(stringOption.load()).toBe(value);
  });

  it("should throw an error when a required value is missing", () => {
    expect(() => stringOption.load()).toThrow(
      `Could not find "${envKey}" in the environment!`,
    );
  });

  it("should not throw an error when the value is missing and it is optional", () => {
    const optionalStringOption = new EnvStringOption(envKey).optional();
    expect(optionalStringOption.load()).toBeNull();
  });

  it("should not throw an error when the value is missing and it is optional", () => {
    const defaultValue = "a string";
    const optionalStringOption = new EnvStringOption(envKey)
      .optional()
      .default(defaultValue);
    expect(optionalStringOption.load()).toBe(defaultValue);
  });
});
