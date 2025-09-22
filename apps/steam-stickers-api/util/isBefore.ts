/** 
 * Returns `true` id date `a` is before the date `b`.
*/
export const isBefore = (a: Date, b: Date): boolean => {
    if (Number.isNaN(a.getTime())) return false;
    if (Number.isNaN(b.getTime())) return false;

    return Math.sign(a.getTime() - b.getTime()) === -1;
} 