import { EnvOption } from "./base";

class TestOption extends EnvOption<string> {
  protected loadType(rawValue: string): string {
    return rawValue;
  }
}

describe("Base loader", () => {
  const envKey = "SOME_STRING";

  describe("the optional method", () => {
    describe("given predicate is true", () => {
      it("should mark as optional", () => {
        expect(new TestOption(envKey).optional(() => true).load()).toBe(null);
      });
    });
    describe("given predicate is false", () => {
      it("should not mark as optional", () => {
        expect(() =>
          new TestOption(envKey).optional(() => false).load(),
        ).toThrow(`Could not find "${envKey}" in the environment!`);
      });
    });
  });
});
