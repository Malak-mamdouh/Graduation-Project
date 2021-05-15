export class Issue{
    id: number;
    Date: Date;
    status: string;
    description: string;
    reportedBy: string;
    assetId: number;
}
export enum Estatus{
   "O" = "Open",
   "R" = "Resolved",
   "C" = "Closed"
}