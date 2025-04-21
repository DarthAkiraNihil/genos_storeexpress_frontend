import { FilterType } from "./FilterType";

export interface FilterDescription {
    type: FilterType;
    name: string;
    verbose_name: string;
    choices: string[] | null;
}
