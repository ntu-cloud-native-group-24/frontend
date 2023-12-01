export interface MyBranchInterface {
    branchName: string;
    branchCode: string;
}

export interface BankInterface {
    bankName: string;
    bankCode: string;
    branches: Array<MyBranchInterface>;   
}