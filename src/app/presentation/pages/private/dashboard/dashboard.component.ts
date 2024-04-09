import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [MatCardModule, MatMenuModule,MatTableModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    displayedColumns: string[] = ['position', 'name'];
    dataSource = [];
}
