
export class Advertisment {
    constructor(
        public id: number,
        public sellerId: number,
        public photosUrls: string[],
        public title: string,
        public subtitle: string,
        public price: string,
        public mainDetails: [string, string][],
        public otherDetails: string[]) {
    }
}
