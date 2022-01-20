import { GenericObject } from '@common/models';

export class NestFile {
  headers: GenericObject;
  send: any;

  constructor(response: NestFile) {
    Object.assign(this, response);
  }
}
