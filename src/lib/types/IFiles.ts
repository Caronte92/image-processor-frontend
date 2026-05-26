export interface IFileSelected {
  name: string;
  size: number;
  url?: string;
}

export interface IFilesSelected {
  files: IFileSelected[];
}
