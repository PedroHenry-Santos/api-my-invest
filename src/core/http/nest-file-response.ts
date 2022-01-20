import { NestFile } from './nest-file';
import { GenericObject } from '@common/models';

export class NestFileResponse {
  private response: NestFile = {
    headers: {},
    send: ''
  };

  public setHeaders(headers: GenericObject) {
    this.response.headers = headers;
    return this;
  }

  public send(buffer: any) {
    this.response.send = buffer;
    return new NestFile(this.response);
  }
}
