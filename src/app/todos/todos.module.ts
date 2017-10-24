import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
import { reducer as reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('todos', reducers),
    // EffectsModule.forFeature([TodoEffects]),
  ],
})
export class TodosModule {}
