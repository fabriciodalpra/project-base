import { expect, it } from 'vitest';
import { UniqueEntityID } from './UniqueEntityID';
import { hasDuplicates } from 'src/helpers/objectHelpers';

it('should be able to create 10000 Unique IDs not duplicates', () => {
    const listIDs: UniqueEntityID[] = [];

    for (let i = 1; i <= 10000; i++) {
        const id = new UniqueEntityID();
        listIDs.push(id);
    }

    expect(listIDs.length).toEqual(10000);
    expect(hasDuplicates(listIDs)).toEqual(false);
});

it("shouldn't be able to create one Unique ID", () => {
    const id = new UniqueEntityID(1);
    expect(id.toValue()).toEqual(1);
});
