import { Component } from '@angular/core';
import { ContainerNode } from './container/container.node';
import { TreeStructure, Tree } from 'src/modules/common';
import { Node } from 'src/modules/document';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'abstract-wireframe';
  public root: Tree<Node>;

  constructor()
  {
    let rootNode: ContainerNode = new ContainerNode();
    rootNode.setFlexDirection("row");

    this.root = new TreeStructure<Node>(rootNode);
    this.root.appendChild(new ContainerNode());
    this.root.appendChild(new ContainerNode());

    // setInterval(() => {
    //   if (this.root.getParams().flexDirection == "row") {
    //     this.root.setFlexDirection("column");
    //   } else {
    //     this.root.setFlexDirection("row");
    //   }
    // }, 2000);
  }
}
