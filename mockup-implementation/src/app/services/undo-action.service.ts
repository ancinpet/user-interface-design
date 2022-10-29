import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UndoActionService {

  constructor(private snackBar: MatSnackBar) { }

  public runUndoable(actions: UndoableAction, message: string, timeoutInMillis: number = 3000): void  {
    const snackBarDialog = this.snackBar.open(message, 'Undo', {duration: timeoutInMillis});
    snackBarDialog.afterDismissed().pipe(takeUntil(snackBarDialog.onAction())).subscribe(actions.timeoutAction);
    snackBarDialog.onAction().subscribe(actions.undoAction);
  }
}

export interface UndoableAction {
  timeoutAction: () => void;
  undoAction: () => void;
}
