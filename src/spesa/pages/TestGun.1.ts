import { gun } from "@zaionstate/database/gun";

export class TestGun {
  constructor() {
    const Gun = gun.default();
    Gun.on("auth", e => console.log(`auth: ${JSON.stringify(e)}`));
    Gun.on("bye", e => console.log(`bye: ${JSON.stringify(e)}`));
    Gun.on("create", e => console.log(`create: ${JSON.stringify(e)}`));
    Gun.on("get", e => console.log(`get: ${JSON.stringify(e)}`));
    Gun.on("hi", e => console.log(`hi: ${JSON.stringify(e)}`));
    Gun.on("out", e => console.log(`out: ${JSON.stringify(e)}`));
    Gun.on("put", e => console.log(`put: ${JSON.stringify(e)}`));

    class GunManager {
      static getStoredGunDb = () => JSON.parse(localStorage.getItem("gun/")!);
      constructor(private storedDb: StoredGun = GunManager.getStoredGunDb()) {}
      getStoredRef: (ref: Reference) => GunNode = ref =>
        this.storedDb[ref["#"]];
      getStoredSelfRef: (ref: GunNode) => string = ref => ref["_"]["#"];
      getStoredEntries = (
        e: Record<any, any> = this.storedDb
      ): [string, any][] => {
        if (e)
          return Object.entries(e).map((e: [string, any]) => [
            e[0],
            e !== null && e !== undefined
              ? typeof e[1] === "string"
                ? e[1]
                : this.getStoredEntries(e[1])
              : null,
          ]);
        else return e;
      };
    }

    const manager = new GunManager();

    console.log(manager.getStoredEntries());
  }
}
