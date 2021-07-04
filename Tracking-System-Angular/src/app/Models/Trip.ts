import { Customer } from './Customer';
import { Driver } from './Driver';

export class Trip {
id: number;
date: Date;
destination: string;
status: string;
departmentId: number;
customerRegion: string;
customerPhone: string;
customerAdress: string;
customerName: string;


/*
customer: Customer;
driver: Driver;
*/
}
export enum Tripstatus{
    'W' = 'Waiting',
    'D' = 'Done'
 }
