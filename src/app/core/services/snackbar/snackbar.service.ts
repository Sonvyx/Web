import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SnackbarService {
  constructor(
    private _translateService: TranslateService,
    private _snackService: MatSnackBar
  ) {}

  showMessage = (message: string): void => {
    this._snackService.open(
      this._translateService.instant(message),
      this._translateService.instant('X'),
      {
        duration: 3000,
        panelClass: ['snackbar__message'],
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      }
    );
  };
}
