import { test, expect } from "vitest";
import { Result, success, error } from "./Result";

function doSomething(shouldSuccess: boolean): Result<string, string> {
    if (shouldSuccess) {
        return success("success");
    } else {
        return error("error");
    }
}

test("success resut", async () => {
    const successResult = doSomething(true);
    expect(successResult.isSuccess()).toBe(true);
    expect(successResult.isError()).toBe(false);
});

test("error resut", async () => {
    const successResult = doSomething(false);
    expect(successResult.isSuccess()).toBe(false);
    expect(successResult.isError()).toBe(true);
});
