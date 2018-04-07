import { Mineral } from 'app/minerals/mineral';

export interface Visitor {
    visit(node: Mineral): Object;
}
