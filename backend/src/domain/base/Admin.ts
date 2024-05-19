import { StatusType } from '@app/core/entities/StatusTypes';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Level } from './Level';
import { AdminGroup } from './AdminGroup';
import { Image } from './Image';
import { AggregateRoot } from '@app/core/entities/AggregateRoot';

export interface AdminProps {
    id?: UniqueEntityID | null;
    name: string;
    email: string;
    status: StatusType;
    password: string;
    level: Level;
    image: Image | null;
    adminGroup: AdminGroup;
}

export class Admin extends AggregateRoot<AdminProps> {
    constructor(props: AdminProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }

    get status(): StatusType {
        return this.props.status;
    }

    get image(): Image | null {
        return this.props.image;
    }

    get level(): Level {
        return this.props.level;
    }

    get adminGroup(): AdminGroup {
        return this.props.adminGroup;
    }
}
