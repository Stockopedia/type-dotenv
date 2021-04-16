# typed-env

A declarative environment loader for TypeScript.

Copyright Stockopedia Ltd. 2021.

## Install

```shell
npm install --save @stockopedia/typed-env
# or
yarn add @stockopedia/typed-env
```

## Usage

```typescript
import { loadEnv } from '@stockopedia/typed-env'

enum Fruit {
  Apples = "apples",
  Bananas = "bananas",
}

// Assuming this environment
process.env["STRING"] = "my string";
process.env["NUMBER"] = "42";
process.env["IS_ON"] = "1";
process.env["FRUIT"] = "apples";

const config = loadEnv(({ string, number, bool, enumeration }) => ({
  str: string("STRING"),
  num: number("NUMBER"),
  on: bool("IS_ON"),
  fruit: enumeration("FRUIT", Fruit),
}));

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
const config = loadEnv(({ string, number, bool, enumeration }) => ({
  str: string("STRING").optional(),
  num: number("NUMBER").optional(),
  on: bool("IS_ON").optional(),
  fruit: enumeration("FRUIT", Fruit).optional(),
}));

console.log(config);
// Will be if the values aren't in the environment
{
  str: null,
  num: null,
  on: null,
  fruit: null,
}
```

You can also choose to make values optional only under certain circumstances, by passing a predicate, e.g.

```typescript
const config = loadEnv(({ string }) => ({
  str: string("STRING").optional(() => process.env.NODE_ENV === 'development'),
}));
```

### Default values

If you want to provide defaults for optional value, it's a cinch:

```typescript
const config = loadEnv(({ string, number, bool, enumeration }) => ({
  str: string("STRING").optional().default("val"),
  num: number("NUMBER").optional().default(99),
  on: bool("IS_ON").optional().default(false),
  fruit: enumeration("FRUIT", Fruit).optional().default(Fruit.Bananas),
}));


console.log(config);
// Will be if the values aren't in the environment
{
  str: "val",
  num: 99,
  on: false,
  fruit: Fruit.Bananas,
}
```
