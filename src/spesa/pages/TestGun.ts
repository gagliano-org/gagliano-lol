import { Element } from "./Element";
// import { GunNode, chrono } from "./GunManager";
import { gun } from "@zaionstate/database/gun";
import {
  ZaionClassComponent,
  ZaionElement,
  ZaionFunctionComponent,
  createRoot,
  GunManager,
  GunNode,
  chrono,
} from "@zaionstate/zaionbase/ui";

export class TestGun {
  constructor() {
    const Gun = gun.default();
    // Gun.on("auth", e => console.log(`auth: ${JSON.stringify(e)}`));
    // Gun.on("bye", e => console.log(`bye: ${JSON.stringify(e)}`));
    // Gun.on("create", e => console.log(`create: ${JSON.stringify(e)}`));
    // Gun.on("get", e => console.log(`get: ${JSON.stringify(e)}`));
    // Gun.on("hi", e => console.log(`hi: ${JSON.stringify(e)}`));
    // Gun.on("out", e => console.log(`out: ${JSON.stringify(e)}`));
    // Gun.on("put", e => console.log(`put: ${JSON.stringify(e)}`));

    const manager = new GunManager(Gun);

    manager.getStoredEntries();
    const ref = Gun.get("9x97b093ab099228b7");

    const FunctionComponent: ZaionFunctionComponent<"div"> = props => {
      return {
        tag: "div",
        props,
        children: `Hello`,
        "@m": "persone",
        "@h": "arianna",
      };
    };

    class ZaionClass extends ZaionClassComponent<"div"> {
      render(): ZaionElement<"div"> {
        return {
          tag: "div",
          props: this.props,
          children: [FunctionComponent({})],
        };
      }
    }

    const engine = createRoot(document.body, Gun);
    engine.render(new ZaionClass({}));
  }
}
