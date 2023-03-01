import type {Address} from "@/models/address";

export class Invoice {
    readonly billingCompanyName: string
    readonly companyName: string
    readonly contactName: string
    readonly address: Address


    constructor(billingCompanyName: string, companyName: string, contactName: string, address: Address) {
        this.billingCompanyName = billingCompanyName;
        this.companyName = companyName;
        this.contactName = contactName;
        this.address = address;
    }
}
