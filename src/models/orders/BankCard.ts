import { BankSystem } from "./BankSystem";

export interface BankCard {
    id: number;
    number: number;
    valid_thru_month: number;
    valid_thru_year: number;
    cvc: number;
    owner: string;
    bank_system: BankSystem;
}
