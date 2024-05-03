const uniqueNumber = {
    previous: 0,
};

export class UniqueEntityID {
    private value: number;

    toNumber() {
        return this.value;
    }

    toValue() {
        return this.value;
    }

    private generateId(): number {
        let date = Date.now();
        if (date <= uniqueNumber.previous) {
            date = ++uniqueNumber.previous;
        } else {
            uniqueNumber.previous = date;
        }
        return date;
    }

    constructor(value?: number | null) {
        this.value = value ?? this.generateId();
    }

    public equals(id: UniqueEntityID) {
        return id.toValue() === this.value;
    }
}
