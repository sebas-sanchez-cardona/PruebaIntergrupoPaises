import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PaisesIntergrupoWebPartStrings';
import PaisesIntergrupo from './components/PaisesIntergrupo';
import { IPaisesIntergrupoProps } from './components/IPaisesIntergrupoProps';


export interface IPaisesIntergrupoWebPartProps {
  description: string;
  category: string;
}


export default class PaisesIntergrupoWebPart extends BaseClientSideWebPart <IPaisesIntergrupoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPaisesIntergrupoProps> = React.createElement(
      PaisesIntergrupo,
      {
        description: this.properties.description,
        category: this.properties.category
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


