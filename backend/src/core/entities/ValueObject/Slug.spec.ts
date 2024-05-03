import { expect, test } from "vitest";
import { Slug } from "./Slug";

test("it should be able to create a new slug fom text", () => {
    const slug = Slug.createFromText("Example convert text");
    expect(slug.value).toEqual("example-convert-text");
});
