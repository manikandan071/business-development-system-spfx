import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";
import { graph } from "@pnp/graph/presets/all";

import * as strings from 'BusinessDevelopmentSystemWebPartStrings';
import BusinessDevelopmentSystem from './components/BusinessDevelopmentSystem';
import { IBusinessDevelopmentSystemProps } from './components/IBusinessDevelopmentSystemProps';

export interface IBusinessDevelopmentSystemWebPartProps {
  description: string;
}

export default class BusinessDevelopmentSystemWebPart extends BaseClientSideWebPart<IBusinessDevelopmentSystemWebPartProps> {

  public async onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context as unknown as undefined,
    });

    // Set up Graph context
    graph.setup({
      spfxContext: this.context as unknown as undefined,
    });

    await super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IBusinessDevelopmentSystemProps> = React.createElement(
      BusinessDevelopmentSystem,
      {
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
