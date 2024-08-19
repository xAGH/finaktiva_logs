import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner/spinner.service';

export const SpinnerIntercpetor: HttpInterceptorFn = (req, next) => {
  const spinnerSrv = inject(SpinnerService);
  spinnerSrv.show();
  return next(req).pipe(finalize(() => spinnerSrv.hide()));
};
