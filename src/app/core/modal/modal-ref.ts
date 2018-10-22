import { Observable, Subject } from 'rxjs';

export class ModalRef {

  private readonly afterClosedSubject = new Subject<any>();
  afterClosed: Observable<any> = this.afterClosedSubject.asObservable();

  constructor() { }

  close(result?: any) {
    this.afterClosedSubject.next(result);
  }

}
