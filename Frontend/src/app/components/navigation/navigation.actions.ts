import { createAction, props } from '@ngrx/store';

export const goTo = createAction(
  '[Navigation] Change route',
  props<{ route: string }>()
);
