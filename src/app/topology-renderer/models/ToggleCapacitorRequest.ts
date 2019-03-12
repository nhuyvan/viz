import { MessageRequest } from '@shared/MessageRequest';

export class ToggleCapacitorRequest implements MessageRequest {
  readonly url = '/topic/goss.gridappsd.fncs.input';
  readonly replyTo = '/topic/goss.gridappsd.fncs.input.capacitor';

  constructor(readonly requestBody: any) {

  }

}