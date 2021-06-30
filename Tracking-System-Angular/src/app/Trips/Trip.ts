import { Customer } from '../Models/Customer';
import { Driver } from '../Models/Driver';

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
