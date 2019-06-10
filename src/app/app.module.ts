import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WireframeModule, WireframeComponent } from 'src/modules/wireframe';
import { NodeComponentResolver, NodeFactory } from 'src/modules/document';
import { ContainerWireframe } from './container/container.wireframe';
import { TreeNavigationComponent } from './tree-navigation.component';
import { CommonModule } from 'src/modules/common';
import { ContainerNode } from './container/container.node';
import { ButtonNode } from './button/button.node';

@NgModule({
  declarations: [
    AppComponent,
    ContainerWireframe,
    TreeNavigationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    WireframeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ContainerWireframe]
})
export class AppModule {
  constructor(
    nodeComponentResolver: NodeComponentResolver,
    nodeFactory: NodeFactory
  ) {
    nodeFactory.setPrototype("container", ContainerNode);
    nodeFactory.setPrototype("button",  ButtonNode);

    nodeComponentResolver.setDefault(WireframeComponent);
    nodeComponentResolver.bind("container", ContainerWireframe);
  }
}
