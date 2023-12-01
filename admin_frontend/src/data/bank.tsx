import jsonData from './bank.json'
import type { BankInterface } from '../interfaces/BankInterface';
const bankData = JSON.parse(JSON.stringify(jsonData));
const keys = Object.keys(bankData);
const branchData = Array<BankInterface>();

export interface BranchInterface {
    name: string;
    branch_code: string;
}


for(let i = 0;i < keys.length;i++){
    const bankResult = {
        bankName: bankData[keys[i]]['name'],
        bankCode: bankData[keys[i]]['branchs'][0]['bank_code'],
        branches: bankData[keys[i]]['branchs'].map((branch: BranchInterface) => {
            return {
                branchName: branch['name'],
                branchCode: branch['branch_code']
            }
        }),
    };
    branchData.push(bankResult)
}

export default branchData;