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

class Test {
  public static readonly x = 10;
  constructor(protected readonly y: number, readonly x: number = 10) {}
}
