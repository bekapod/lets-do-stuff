import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { IonicModule } from 'ionic-angular';
import { reducer as reducers } from './reducers';
import { TodoEffects } from './effects';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('todos', reducers),
    EffectsModule.forFeature([TodoEffects]),
    IonicModule,
  ],
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
  ],
  exports: [
    ListComponent,
    AddComponent,
    EditComponent,
  ],
})
export class TodosModule {}
