import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {HotToastService} from "@ngneat/hot-toast";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: HotToastService) {
  }

  private static getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return "Bad Request"
      case 403:
        return "Forbidden"
      case 404:
        return "Not Found"
      case 401:
        return "Not authorized"
      case 408:
        return "Request Timeout"
      case 429:
        return "Too Many Requests"
      case 500:
        return "Internal Server Error"
      default:
        return "Failure with request"
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((requestError: HttpErrorResponse) => {
      if (requestError) {
        this.toastService.error(ErrorInterceptor.getErrorMessage(requestError.status))
      }
      return throwError(requestError)
    }))
  }
}
