import { Driver } from './Driver';

export class TripList{
    id: number;
    date: Date;
    destination: string;
    status: string;
    departmentId: number;
    customerRegion: string;
    customerPhone: string;
    customerName: string;
    user: User
}
class User{
    userName: string;
}