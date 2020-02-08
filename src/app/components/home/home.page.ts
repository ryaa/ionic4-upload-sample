import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';

import { FileUploader } from '../../services/file-uploader/file-uploader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  public componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private fileUploader: FileUploader,
    private mediaCapture: MediaCapture,
    private platform: Platform
  ) { }

  public isRunningOnRealDevice(): boolean {
    return this.platform.is('cordova');
  }

  public async _executeFileUpload(uri: string): Promise<void> {

    try {
      await this.fileUploader.uploadTicketAttachment(uri);
      const message = `File has been successfully uploaded`;
      alert(message);
    } catch (error) {
      alert(`Failed to upload an attachment. Error: ${JSON.stringify(error)}`);
      alert(error);
    }
  }

  /**
   * internal method to handle taken video
   */
  public async _handleVideoCaptureSuccess(mediaFiles: any) { // MediaFile[]) {
    const uri = mediaFiles[0].localURL;
    this._executeFileUpload(uri);
  }

  /**
   * internal method to handle an error when taking video
   */
  public _handleVideoCaptureError(error: CaptureError) {
    alert(`Failed to take a video attachment. Error: ${JSON.stringify(error)}`);
  }
  public async takeAndUploadVideo() {

    if (this.isRunningOnRealDevice() === true) {

      this.mediaCapture.onPendingCaptureResult()
        .pipe(
          takeUntil(this.componentDestroyed)
        ).subscribe((mediaFiles) => {
          // Do something with result
          this._handleVideoCaptureSuccess(mediaFiles);
        });
      this.mediaCapture.onPendingCaptureError()
        .pipe(
          takeUntil(this.componentDestroyed)
        ).subscribe((error) => {
          // Handle error case
          this._handleVideoCaptureError(error);
        });

      const options: CaptureVideoOptions = {
        limit: 1
      };
      try {
        const result: MediaFile[] | CaptureError = await this.mediaCapture.captureVideo(options);
        if (result.hasOwnProperty('code')) { // this is CaptureError
          this._handleVideoCaptureError(result as CaptureError);
        } else {
          this._handleVideoCaptureSuccess(result as MediaFile[]);
        }
      } catch (error) {
        alert(`Failed to take a video attachment. Error: ${JSON.stringify(error)}`);
      }

    } else {
      alert('Not supported on this platform');
    }

  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

}
