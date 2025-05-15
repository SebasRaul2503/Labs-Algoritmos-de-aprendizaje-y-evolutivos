import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HillClimbingComponent } from './pages/hill-climbing/hill-climbing.component';

export const routes: Routes = [
    {
        path: '', component: MainLayoutComponent,
        children: [
            {
                path: '', component: HillClimbingComponent, title: 'Hill Climbing'
            }
        ]
    }
];
