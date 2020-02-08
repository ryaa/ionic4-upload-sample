import { Injectable } from '@angular/core';

declare var cordova: any;
declare var window: any;

// NATIVE
import { FileTransfer, FileTransferError, FileTransferObject, FileUploadOptions, FileUploadResult } from '@ionic-native/file-transfer/ngx';

// PRODIVERS
import { FileUtils } from '../file-utils/file-utils';

@Injectable({
    providedIn: 'root'
})
export class FileUploader {

    public timeout: number;

    constructor(
        private transfer: FileTransfer,
        private fileUtils: FileUtils
    ) {
    }

    /**
     * @summary Uppload a file to the server
     *
     * @param localFileURL  local file URL to upload.
     * @returns Returns a Promise that resolves if succeeded.
     * If failed it will reject with AppError with handled: false param and the appropriate error message
     */
    public async uploadTicketAttachment(localFileUri: string): Promise<void> {

        // checking if all the required plugins are present
        if (window.FileTransfer) {

            let fileNameForUpload = localFileUri.split('/').pop();
            // it could have some params after the extension like "asset.JPG?id=341A22D3-95E4-46C4-B893-1B0D595932C8&ext=JPG
            fileNameForUpload = fileNameForUpload.split('?').shift();

            const fileTransfer: FileTransferObject = this.transfer.create();

            const uploadUrl =  'post_url'; // TODO: need an URL to post to
            // The important bits are setting the Content-Type header, so that multipart/form-data won't be used,
            // and chunkedMode = false to send the file with a single request.
            const options = {
                chunkedMode: false,
                fileName: decodeURI(fileNameForUpload),
                mimeType: this.fileUtils.getFileMIMETypeByExtension(fileNameForUpload),
                httpMethod: 'POST',
                headers: {
                    'Content-Type': this.fileUtils.getFileMIMETypeByExtension(fileNameForUpload)
                }
            } as FileUploadOptions;
            const trustAllHosts = true;

            let fileUploadResult: FileUploadResult;
            try {
                fileUploadResult = await fileTransfer.upload(localFileUri, uploadUrl, options, trustAllHosts);
            } catch (err) {
                const error = err as FileTransferError;
                let errorMessage = null;
                if (error) {
                    if (error.exception) {
                        errorMessage = error.exception;
                    } else {
                        // for error codes please see https://github.com/apache/cordova-plugin-file-transfer#filetransfererror
                        if (error.code === 1) {
                            errorMessage = `Source file ${error.source} to upload not found`;
                        } else if (error.code === 2) {
                            errorMessage = `Server URL ${error.target} to upload the file to is not valid`;
                        } else if (error.code === 3) {
                            errorMessage = 'Connection timed out. Please check your internet connection and try again.';
                        } else {
                            errorMessage = JSON.stringify(error);
                        }
                    }
                } else {
                    errorMessage = 'Unexpected error occurred when uploading an attachment file';
                }
                throw new Error(errorMessage);
            }

            return;

        } else {
            alert('The application is missing required components to support upload');
        }

    }
}
