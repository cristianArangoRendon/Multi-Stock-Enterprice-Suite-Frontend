import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompanyDTO } from 'src/app/core/DTOs/CompanyDTO';
import { GetCompanies } from 'src/app/infrastructure/services/Company/GetCompanies';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CompanyComponent } from '../company/company.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    displayedColumns: string[] = ['Id', 'Nombre', 'guid'];
    dataSource: CompanyDTO[] = [];

    constructor(
        private _cmp: GetCompanies,
        private _router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this._cmp.GetCompanies().subscribe((res) => {
            console.log('res', res);
            this.dataSource = res.data;
            console.log('datasource', this.dataSource);
        });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(CompanyComponent, {
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
        });
    }
}
