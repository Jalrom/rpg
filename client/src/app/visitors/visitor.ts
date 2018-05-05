import { Mineral } from 'app/minerals/mineral';
import { Wood } from 'app/wood/wood';

export interface Visitor {
    visit(node: Mineral | Wood): Object;
}
