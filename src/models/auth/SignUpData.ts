import {SignUpIndividualData} from "./SignUpIndividualData";
import {SignUpLegalData} from "./SignUpLegalData";

export interface SignUpData {
    email: string
    password: string
    user_type: "individual_entity" | "legal_entity";
    additional_data : SignUpIndividualData | SignUpLegalData;
}
