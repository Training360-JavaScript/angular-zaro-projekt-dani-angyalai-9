import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  showError() {
    this.toastr.error('Error! Please check your input data.');
  };
  
  showSuccess(message: string) {
    this.toastr.info(message);
  };

  showDelete(message: string) {
    this.toastr.info(message);
  };
}

