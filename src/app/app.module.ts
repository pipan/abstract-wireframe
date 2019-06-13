import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WireframeModule, WireframeComponent } from 'src/modules/wireframe';
import { NodeComponentResolver, NodeFactory, DocumentService, Node } from 'src/modules/document';
import { ContainerWireframe } from './container/container.wireframe';
import { TreeNavigationComponent } from './tree-navigation.component';
import { CommonModule } from 'src/modules/common';
import { ContainerNode } from './container/container.node';
import { ButtonNode } from './button/button.node';
import { ContainerWireframeEditor } from './container/container-wireframe.editor';
import { DynamicComponentModule, DynamicComponentSetup, MethodDynamicInput, DynamicComponent } from 'src/modules/dynamic-component';
import { ButtonWireframeEditor } from './button/button-wireframe.editor';

@NgModule({
  declarations: [
    AppComponent,
    ContainerWireframe,
    TreeNavigationComponent,
    ContainerWireframeEditor,
    ButtonWireframeEditor
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    WireframeModule,
    DynamicComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ContainerWireframe, ContainerWireframeEditor, ButtonWireframeEditor]
})
export class AppModule {
  constructor(
    nodeComponentResolver: NodeComponentResolver,
    nodeFactory: NodeFactory,
    dynamicComponentSetup: DynamicComponentSetup,
    documentServie: DocumentService
  ) {
    nodeFactory.setPrototype("container", ContainerNode);
    nodeFactory.setPrototype("button",  ButtonNode);

    nodeComponentResolver.setDefault(WireframeComponent);
    nodeComponentResolver.bind("container", ContainerWireframe);

    dynamicComponentSetup.setup<Node>("editor")
      .observe(documentServie.on("select"))
      .addComponent("ContainerNode", new DynamicComponent(ContainerWireframeEditor, new MethodDynamicInput('setNode')))
      .addComponent("ButtonNode", new DynamicComponent(ButtonWireframeEditor, new MethodDynamicInput("setNode")));
  }
}
