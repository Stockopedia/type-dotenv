import { env } from "./index";
import { EnvEnumOption } from "./loaders";

enum Fruit {
  Apples = "apples",
  Bananas = "bananas",
}

describe("Env loader", () => {
  describe("enum", () => {
    it("should create the appropriate EnvEnumOption", () => {
      const envEnumOption = env.enum("FRUIT", Fruit);
      expect(envEnumOption).toBeInstanceOf(EnvEnumOption);
      expect((envEnumOption as any).envVar).toBe("FRUIT");
    });
  });
});
