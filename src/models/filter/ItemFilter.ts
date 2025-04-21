import {ChoiceFilter} from "./ChoiceFilter";
import {RangeFilter} from "./RangeFilter";

export interface ItemFilter {
    [key: string]: RangeFilter | ChoiceFilter | boolean;
}