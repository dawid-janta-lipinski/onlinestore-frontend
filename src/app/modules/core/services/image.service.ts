import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  DeleteImageResponse,
  Image,
  PostImageResponse,
} from '../models/image.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = `${environment.apiUrl}/image`;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Start typing...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    sanitize: false,
    toolbarHiddenButtons: [['insertVideo']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: true,
  };

  constructor(private http: HttpClient) {}

  addImage(formData: FormData): Observable<Image> {
    return this.http
      .post<PostImageResponse>(this.apiUrl, formData, {
        withCredentials: true,
      })
      .pipe(
        map((resp) => {
          return { url: `${this.apiUrl}?uuid=${resp.uuid}` };
        }),
      );
  }
  deleteImage(uuid: string): Observable<DeleteImageResponse> {
    const params = new HttpParams().append('uuid', uuid);
    return this.http.delete<DeleteImageResponse>(this.apiUrl, {
      withCredentials: true,
      params,
    });
  }
}
