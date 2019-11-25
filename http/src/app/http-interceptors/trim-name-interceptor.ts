import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

//如果你必须修改请求体，那么就要先复制它，然后修改这个副本，clone() 这个请求，然后把这个请求体的副本作为新的请求体，例子如下：
@Injectable()
export class TrimNameInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    console.log(">>>>>TrimNameInterceptor");

    const body = req.body;
    if (!body || !body.name ) {
      return next.handle(req);
    }
    // copy the body and trim whitespace from the name property
    const newBody = { ...body, name: body.name.trim() };
    // clone request and set its body
    const newReq = req.clone({ body: newBody });
    // send the cloned request to the next handler.
    return next.handle(newReq);
  }
}
