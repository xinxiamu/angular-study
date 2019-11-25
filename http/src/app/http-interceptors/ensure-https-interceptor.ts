import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class EnsureHttpsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    console.log(">>>>>EnsureHttpsInterceptor");
    // clone request and replace 'http://' with 'https://' at the same time
    //HttpRequest中有些属性是只读，为了防止用户擅自更改这些属性。ts设置成readonly，为其提供安全。
    //如下面req。url就是只读的，更改不了。
    //但是，你如果你想要更改，就要先克隆它，并修改这个克隆体，然后再把这个克隆体传给 next.handle()。如下：
    //这个 clone() 方法的哈希型参数允许你在复制出克隆体的同时改变该请求的某些特定属性。
    const secureReq = req.clone({
      url: req.url.replace('http://', 'https://')
    });
    // send the cloned, "secure" request to the next handler.
    return next.handle(secureReq);
  }
}
