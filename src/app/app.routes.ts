import { Routes } from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {PanelComponent} from "./components/panel/panel.component";
import {SwapComponent} from "./components/panel/swap/swap.component";

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'swap', component: SwapComponent }
];
