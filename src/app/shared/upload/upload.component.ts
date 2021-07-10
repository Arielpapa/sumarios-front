import { OnInit, enableProdMode } from '@angular/core';

import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'aam-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class AamUploadComponent implements OnInit, OnChanges {
  form: FormGroup;
  loading = false;
  method = 'POST';
  // url = './server/upload/upload.php';

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  @ViewChild('preview', { static: true }) preview: ElementRef;

  @Output() status: EventEmitter<any> = new EventEmitter(true);
  @Input() img;
  @Input() dinamico = false;
  @Input() imagesPath = '';
  @Input() url = '';
  @Input() token = '';

  _id: string = (Math.random() * 1000).toFixed(0);
  _url: string;
  _loading = false;
  _preview = false;
  _imagesPath = this.imagesPath;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.img && this.img !== 'no_image.png' && this.img !== '') {
      this._url = this.img;
    }
  }

  ngOnChanges(e) {
    this._url = e.img.currentValue;
  }

  setUpImage() {
    const preview = this.preview.nativeElement;

    const image = new Image();
    image.height = 100;
    image.title = this.img;
    image.src = this._imagesPath + this.img;

    while (preview.hasChildNodes()) {
      preview.removeChild(preview.lastChild);
    }
    preview.appendChild(image);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.onSubmit();
    }
  }

  private prepareSave(el): any {
    console.log(el);
    const input = new FormData();
    input.append('image', el);
    return input;
  }

  forceSave() {
    this.onSubmit();
  }

  onSubmit() {
    if (this.fileInput.nativeElement.files[0] === undefined) {
      const percent = 100;

      setTimeout(() => {
        this.status.emit({
          originalName: this.img != null ? this.img : '',
          progress: {
            percent: 100,
          },
          status: 200,
        });
        if (percent === 100) {
          this.loading = false;
        }
      }, 0);
      return;
    }
    const formModel = this.prepareSave(this.fileInput.nativeElement.files[0]);

    this.loading = true;

    const xhr = new XMLHttpRequest();

    const uploadingFile = new UploadedFile(
      this.generateRandomIndex(),
      this.fileInput.nativeElement.files[0].name,
      this.fileInput.nativeElement.files[0].size
    );

    xhr.onload = () => {
      uploadingFile.onFinished(xhr.status, xhr.statusText, xhr.response);

      setTimeout(() => {
        this._url = this.imagesPath + JSON.parse(xhr.response).data;
      }, 100);

      // this.loading = false;
      st.emit(uploadingFile);
    };

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        uploadingFile.setProgres({
          total: e.total,
          loaded: e.loaded,
          percent: percent,
        });

        this.status.emit(uploadingFile);

        // if (percent === 100) {
        //   this.loading = false;
        // }
      }
    };

    xhr.upload.onabort = (e) => {
      uploadingFile.setAbort();
      this.status.emit(uploadingFile);
      this.loading = false;
    };

    xhr.upload.onerror = (e) => {
      console.log(e);
      uploadingFile.setError();
      this.status.emit(uploadingFile);
      this.loading = false;
    };

    xhr.open(this.method, this.url, true);

    const st = this.status;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log('Request finished. Do processing here.');
        this.loading = false;
        // this._url = this.fileInput.nativeElement.files[0].name;
      }
    };

    // TODO: ACTIVAR LA SEGURIDAD
    // xhr.withCredentials = this.withCredentials;

    // if (this.customHeaders) {
    //     Object.keys(this.customHeaders).forEach((key) => {
    //         xhr.setRequestHeader(key, this.customHeaders[key]);
    //     });
    // }

    // if (this.authToken) {
    //     xhr.setRequestHeader("Authorization", `${this.authTokenPrefix} ${this.authToken}`);
    // }

    if (!localStorage.getItem('currentUser')) {
      console.log('No existe token de autorización');

      return;
    }
    xhr.setRequestHeader('app-request', '');
    xhr.setRequestHeader(
      'authorization',
      JSON.parse(localStorage.getItem('currentUser')).token
    );

    xhr.send(formModel);
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  generateRandomIndex(): string {
    return Math.random().toString(36).substring(7);
  }

  public downloadFile(): void {
    const url = this._imagesPath + this._url;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = new Blob([xhr.response], { type: 'image/jpg' });
      const a: any = document.createElement('a');
      a.style = 'display: none';
      document.body.appendChild(a);
      const _url = window.URL.createObjectURL(blob);
      a.href = _url;
      const _fileName = this._url
        .split('/')
        [this._url.split('/').length - 1].split('?')[0];

      a.download = _fileName.split('%2F')[_fileName.split('%2F').length - 1];
      a.click();
      window.URL.revokeObjectURL(_url);
    };
    xhr.open('GET', url);
    xhr.send();
  }
}

class UploadedFile {
  id: string;
  status: number;
  statusText: string;
  progress: Object;
  originalName: string;
  size: number;
  response: string;
  done: boolean;
  error: boolean;
  abort: boolean;

  constructor(id: string, originalName: string, size: number) {
    this.id = id;
    this.originalName = originalName;
    this.size = size;
    this.progress = {
      loaded: 0,
      total: 0,
      percent: 0,
    };
    this.done = false;
    this.error = false;
    this.abort = false;
  }

  setProgres(progress: Object): void {
    this.progress = progress;
  }

  setError(): void {
    this.error = true;
    this.done = true;
  }

  setAbort(): void {
    this.abort = true;
    this.done = true;
  }

  onFinished(status: number, statusText: string, response: string): void {
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.done = true;
  }
}
