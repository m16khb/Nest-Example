export interface ServiceApplicationKey {
  id: String;
}

export interface ServiceApplication extends ServiceApplicationKey {
  idImage: Express.Multer.File;
  CEOName: String;
}
