import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable()
export class ConfigService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl)  //明确返回Config对象，否则接收的时候是个Object对象。
      .pipe(
        retry(3), // retry a failed request up to 3 times，有时候，错误只是临时性的，只要重试就可能会自动消失。 比如，在移动端场景中可能会遇到网络中断的情况，只要重试一下就能拿到正确的结果。
        catchError(this.handleError) // then handle the error  异常处理
      );
  }

  getConfig_1() {
    return this.http.get(this.configUrl); //返回的是Object对象，没指定具体对象
  }

  getConfig_2() {
    // now returns an Observable of Config
    return this.http.get<Config>(this.configUrl); //指定返回数据类型为具体类型Config，方便接受者明确处理。
  }

  getConfig_3() {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  //通过 observe 选项来告诉 HttpClient，你想要完整的响应信息，而不是只有响应体。
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' }); //返回完整的响应信息，包括响应头信息等，而不止是响应body。
  }

  //处理错误
  //可能发生的错误一般有两种，一种是在网络无法到达服务器下，一种是服务器返回了一个失败的状态码（如404、500，非200）。
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) { //客户端网络问题，请求无法到达服务器返回错误。
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else { //服务端返回了非200，即错误的响应码的响应。
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    //统一处理错误，返回显示友好的错误信息到客户端。不能直接返回服务端错误信息给客户。
    //一般，服务端接口定义的好的话，即服务端已经做了统一的友好的错误处理，客户端直接获取服务端友好错误信息显示到客户端即可。
    return throwError(
      'Something bad happened; please try again later.');
  };

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError) //服务器返回错误的响应，或者请求根本都无法到达服务器，就会返回错误信息。
      );
  }

}
