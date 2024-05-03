import { Entity } from '@app/core/entities/Entity';
import { FileTypes } from '@app/core/entities/FileTypes';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';

export interface FileProps {
  id?: UniqueEntityID | null;
  type: FileTypes;
  filename: string;
  name: string;
  extension: string;
  mime: string;
  url: string;
}

export class File extends Entity<FileProps> {
  constructor(props: FileProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get type(): FileTypes {
    return this.props.type;
  }

  get filename(): string {
    return this.props.filename;
  }

  get name(): string {
    return this.props.name;
  }

  get extension(): string {
    return this.props.extension;
  }

  get mime(): string {
    return this.props.mime;
  }

  get url(): string {
    return this.props.url;
  }
}
