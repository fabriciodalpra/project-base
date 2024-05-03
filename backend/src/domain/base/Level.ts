import { Entity } from '@app/core/entities/Entity';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';

export interface LevelProps {
  id?: UniqueEntityID | null;
  name: string;
}

export class Level extends Entity<LevelProps> {
  constructor(props: LevelProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }
}
