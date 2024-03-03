class NodeTyper {
  constructor(
    private definitionTriple: [
      datas: string,
      maps: string,
      discriminator: string
    ]
  ) {}
  private get firstType() {
    return this.definitionTriple[0];
  }
  private get secondType() {
    return this.definitionTriple[1];
  }
  private get discriminator() {
    return this.definitionTriple[2];
  }
  define = (
    e: string,
    discriminator: string = this.discriminator,
    firstType: string = this.firstType,
    secondType: string = this.secondType
  ) => (e.startsWith(discriminator) ? firstType : secondType);

  separateByType: (
    a: [records: string[], maps: string[]],
    c: string[]
  ) => [records: string[], maps: string[]] = (a, c) => {
    if (c[0] === this.firstType) a[0].push(c[1]);
    else a[1].push(c[1]);
    return a;
  };
  private obj: Record<any, undefined> = {};
  createKey: <T extends string>(c: T) => void = c => {
    this.obj[c] = undefined;
  };
  makeObject: <K extends string>(
    a: Record<K, undefined>,
    c: K[]
  ) => Record<K, undefined> = <K extends string>(
    a: Record<K, undefined>,
    c: K[]
  ) => {
    c.forEach(this.createKey);
    a = this.obj;
    this.obj = {};
    return a as Record<K, undefined>;
  };
}
