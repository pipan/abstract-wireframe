import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ContainerNode } from './container/container.node';
import { TreeStructure, Tree } from 'src/modules/common';
import { Node, DocumentService } from 'src/modules/document';
import { DynamicComponentSetup } from 'src/modules/dynamic-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('wireframeEditor', {read: ViewContainerRef}) wireframeEditor: ViewContainerRef;
  title = 'abstract-wireframe';
  public root: Tree<Node>;
  public selectedNode: Node;

  constructor(
    documentService: DocumentService,
    protected dynamicComponentSetup: DynamicComponentSetup
  )
  {
    this.selectedNode = null;
    let rootNode: ContainerNode = new ContainerNode();
    rootNode.setFlexDirection("row");

    this.root = new TreeStructure<Node>(rootNode);
    this.root.appendChild(new ContainerNode());
    this.root.appendChild(new ContainerNode());

    documentService.on("select")
      .subscribe((selected: Node) => {
        this.selectedNode = selected;
      });
  }

  ngOnInit(): void
  {
    console.log(this.wireframeEditor);
    this.dynamicComponentSetup.setup("editor")
      .drawTo(this.wireframeEditor);
  }
}
