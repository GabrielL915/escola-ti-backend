export interface ICloudinaryProvider {
    uploadImage(file: any): Promise<string>;
}
