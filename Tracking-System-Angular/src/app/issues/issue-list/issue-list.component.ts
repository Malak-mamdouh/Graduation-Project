import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '../../Models/Issue';
import { IssueService } from '../issue.service';
import { IssueList } from '../../Models/issue-list';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: IssueList[] = [];
  IsEmpty: boolean;
  isLoading = true;
  constructor(private route: Router , 
              private issueService: IssueService) { }

  ngOnInit(): void {
    this.IsEmpty = true;

    this.issueService.AllIssues().subscribe(list => {
      this.issues = list;
      console.log(this.issues);
      this.isLoading = false;
      if(this.issues.length >= 1){
        this.IsEmpty = false;
      }
      
    } , err => console.log(err));
  }
  onDelete(id: number){
    const alert = confirm('Do you delete this Issue?');
    if (alert === true){
      this.issueService.DeleteIssue(id).subscribe(s => {
        this.route.navigate(['issue-list']).then(x => {window.location.reload(); });
        
      } , err => console.log(err));
    }
  }
  onEdit(id: number){
    this.route.navigate(['edit-issue/', id]);
  }

  onAdd(){
    this.route.navigate(['add-issue']);
  }
}
