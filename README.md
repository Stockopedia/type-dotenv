# typed-env

A declarative environment loader for TypeScript.

## Install

```shell
npm install --save @stockopedia/typed-env
# or
yarn add @stockopedia/typed-env
```

## Usage

```typescript
import { env } from '@stockopedia/typed-env'

enum Fruit {
  Apples = "apples",
  Bananas = "bananas",
}

// Assuming this environment
process.env["STRING"] = "my string";
process.env["NUMBER"] = "42";
process.env["IS_ON"] = "1";
process.env["FRUIT"] = "apples";

const config = env.load({
  str: env.string("STRING"),
  num: env.number("NUMBER"),
  on: env.bool("IS_ON"),
  fruit: env.enum("FRUIT", Fruit),
});

console.log(config);
// Will be
{
  str: "my string",
  num: 42,
  on: true,
  fruit: Fruit.Apples,
}

// Config will have the implicit type:
interface Config {
  str: string;
  num: number;
  on: boolean;
  fruit: Fruit;
}
```

### Optional values

By default, any values not found in the environment will throw an error, 
but sometimes you want some values to be optional, e.g.

```typescript
const config = env.load({
  str: env.string("STRING").optional(),
  num: env.number("NUMBER").optional(),
  on: env.bool("IS_ON").optional(),
  fruit: env.enum("FRUIT", Fruit).optional(),
});

console.log(config);
// Will be if the values aren't in the environment
{
  str: null,
  num: null,
  on: null,
  fruit: null,
}
```

### Default values

If you want to provide defaults for optional value, it's a cinch:

```typescript
const config = env.load({
  str: env.string("STRING").optional().default("val"),
  num: env.number("NUMBER").optional().default(99),
  on: env.bool("IS_ON").optional().default(false),
  fruit: env.enum("FRUIT", Fruit).optional().default(Fruit.Bananas),
});


console.log(config);
// Will be if the values aren't in the environment
{
  str: "val", 
  num: 99,
  on: false,
  fruit: Fruit.Bananas,
}
```
