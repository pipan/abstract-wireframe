import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WireframeModule, WireframeComponent } from 'src/modules/wireframe';
import { NodeComponentResolver, NodeFactory, DocumentService } from 'src/modules/document';
import { ContainerWireframe } from './container/container.wireframe';
import { TreeNavigationComponent } from './tree-navigation.component';
import { CommonModule, StringComponentResolver } from 'src/modules/common';
import { ContainerNode } from './container/container.node';
import { ButtonNode } from './button/button.node';
import { ContainerWireframeEditor } from './container/container-wireframe.editor';

@NgModule({
  declarations: [
    AppComponent,
    ContainerWireframe,
    TreeNavigationComponent,
    ContainerWireframeEditor
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    WireframeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ContainerWireframe, ContainerWireframeEditor]
})
export class AppModule {
  constructor(
    nodeComponentResolver: NodeComponentResolver,
    nodeFactory: NodeFactory,
    stringComponentResolver: StringComponentResolver
  ) {
    nodeFactory.setPrototype("container", ContainerNode);
    nodeFactory.setPrototype("button",  ButtonNode);

    nodeComponentResolver.setDefault(WireframeComponent);
    nodeComponentResolver.bind("container", ContainerWireframe);

    stringComponentResolver.bind("container.editor", ContainerWireframeEditor);
  }
}
