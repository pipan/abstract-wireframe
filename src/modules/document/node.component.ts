import { Node } from "./node.interface";
import { Tree } from "../common";

export interface NodeComponent
{
    setTree(tree: Tree<Node>);
}