import { Component, OnInit, Input } from '@angular/core';
import { Node, NodeFactory } from 'src/modules/document';
import { Tree } from 'src/modules/common';

@Component({
    selector: 'treeNavigation',
    templateUrl: 'tree-navigation.component.html',
    styleUrls: ['tree-navigation.component.scss']
})

export class TreeNavigationComponent implements OnInit {
    @Input() tree: Tree<Node>;

    constructor(
        protected nodeFactory: NodeFactory
    ) { }

    ngOnInit() { }

    add(name: string): void
    {
        this.tree.appendChild(this.nodeFactory.create(name));
    }

    remove(tree: Tree<Node>): void
    {
        let parentTree: Tree<Node> = tree.getParent();
        if (!parentTree) {
            return;
        }
        parentTree.removeChild(tree);
    }
}