import { Customer } from './Customer';
import { Driver } from './Driver';

export class Trip {
id: number;
date: Date;
destination: string;
status: string;
customerId: string;
/*
customer: Customer;
driver: Driver;
*/
}
export enum Tripstatus{
    'W' = 'Waiting',
    'D' = 'Done'
 }
