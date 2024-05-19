import { Entity } from '@app/core/entities/Entity';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';

export interface AdminGroupProps {
    id?: UniqueEntityID | null;
    name: string;
}

export class AdminGroup extends Entity<AdminGroupProps> {
    constructor(props: AdminGroupProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get name(): string {
        return this.props.name;
    }
}
