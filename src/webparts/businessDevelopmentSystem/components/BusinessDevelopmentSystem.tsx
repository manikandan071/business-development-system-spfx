import * as React from "react";
import type { IBusinessDevelopmentSystemProps } from "./IBusinessDevelopmentSystemProps";
import { sp } from "@pnp/sp/presets/all";
import { graph } from "@pnp/graph/presets/all";
import { Provider } from "react-redux";
import "../assets/css/variables.css";
import "../assets/css/style.css";
import MainComponent from "./MainComponent";
import { store } from "../../../Redux/Store/Store";

export default class BusinessDevelopmentSystem extends React.Component<
  IBusinessDevelopmentSystemProps,
  {}
> {
  constructor(prop: IBusinessDevelopmentSystemProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context as unknown as undefined,
    });
    graph.setup({
      spfxContext: this.props.context as unknown as undefined,
    });
  }
  public render(): React.ReactElement<IBusinessDevelopmentSystemProps> {
    return (
      <Provider store={store}>
        <MainComponent context={this.props.context} />
      </Provider>
    );
  }
}
