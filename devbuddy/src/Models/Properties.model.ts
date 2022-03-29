export default class Property {
  constructor(
    public name: string,
    public type: string,
    public isFunction: boolean = false,
    public isStatic: boolean = false,
    public isReadonly: boolean = false,
    public defaultValue: any = "",
    public access: "public" | "private" | "protected" = "public"
  ) {}
}

interface Test {
  readonly x: number;
  // function name(params:type);
}

class Test1 implements Test {
  x = 10;
}
