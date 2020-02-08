import * as Mime from 'mime';

export class FileUtils {

    constructor() {
    }

    // https://github.com/broofa/node-mime and https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/mime/index.d.ts
    public getFileMIMETypeByExtension(filename: string): string {
        const mimeType = Mime.getType(filename);
        return mimeType;
    }

}
