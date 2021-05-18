import { Asset } from './Asset';
export class IssueList{
    id: number;
    date: Date;
    status: string;
    description: string;
    reportedBy: string;
    assetId: number;
    asset: Asset;
}