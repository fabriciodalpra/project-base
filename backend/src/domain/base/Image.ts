import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { File } from './File';
import { FileTypes } from '@app/core/entities/FileTypes';

export interface ImageProps {
  id?: UniqueEntityID | null;
  type: FileTypes;
  filename: string;
  name: string;
  extension: string;
  mime: string;
  url: string;
}

export class Image extends File {
  constructor(props: ImageProps, id?: UniqueEntityID) {
    super(props, id);
  }
}
