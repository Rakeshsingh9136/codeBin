import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-snippets',
  standalone: true,
  imports: [],
  templateUrl: './view-snippets.component.html',
  styleUrl: './view-snippets.component.css'
})
export class ViewSnippetsComponent {
  codeSnippet={
    title:"",
    code:""
  }
  constructor(private route:ActivatedRoute,private dbService: DbService) {}
  ngOnInit(){
    const elementId=this.route.snapshot.paramMap.get('id');
    this.dbService.getSnippetById(elementId!).then((data:any)=>{
      this.codeSnippet=data;
    })
  }

}
