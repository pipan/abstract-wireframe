import { Component, OnInit, Input } from '@angular/core';
import { Node, NodeFactory, DocumentService } from 'src/modules/document';
import { Tree } from 'src/modules/common';

@Component({
    selector: 'treeNavigation',
    templateUrl: 'tree-navigation.component.html',
    styleUrls: ['tree-navigation.component.scss']
})

export class TreeNavigationComponent implements OnInit {
    @Input() tree: Tree<Node>;
    public nodeFactories: Array<string>;

    constructor(
        protected nodeFactory: NodeFactory,
        protected documentService: DocumentService
    ) { }

    ngOnInit()
    {
        this.nodeFactories = this.nodeFactory.availableKeys();
    }

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

    select(node: Node): void
    {
        this.documentService.select(node);
    }
}