export class UsualRes<T = any> {
    constructor(
        public code: number,
        public message?: string,
        public data?: T,
    ) { }
}