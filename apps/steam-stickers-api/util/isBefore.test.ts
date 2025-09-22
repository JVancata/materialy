import { describe, it } from 'node:test';
import { strict } from 'node:assert';
import { isBefore } from './isBefore.ts';

describe("isBefore date comparison", () => {
    it("returns true if date is in the past", () => {
        const a = new Date("2001-09-22T17:06:40.088Z");
        const b = new Date("2999-09-22T17:06:40.088Z");
        strict.equal(isBefore(a, b), true)
    });

    it("returns false if date is not in the past", () => {
        const a = new Date("2999-09-22T17:06:40.088Z");
        const b = new Date("2001-09-22T17:06:40.088Z");
        strict.equal(isBefore(a, b), false)
    });

    it("returns false for invalid date values", () => {
        const a = new Date("This is not a valid date value");
        const b = new Date("This is not a valid date value");
        strict.equal(isBefore(a, b), false)
    });
})