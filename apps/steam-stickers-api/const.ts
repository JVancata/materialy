/** 48 Hours */
export const RUN_INTERVAL_MS = 1_000 * 60 * 60 * 48;

/** 
 * The update function does not have to run precisely after a certain period of time.
 * 
 * The setInterval is padded with this value to not rely on the precision of the timers 
 * (it should be fine, but just to make sure).
 * 
 * Value is 10 minutes. 
*/
export const INTERVAL_PADDING_MS = 1_000 * 60 * 10;