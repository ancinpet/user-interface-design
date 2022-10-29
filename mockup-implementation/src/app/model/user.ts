import { Advertisment } from './advertisment';

export class User {

    constructor(
        public id: number,
        public firstname: string,
        public surname: string,
        public email: string,
        public telephone: string,
        public favouriteAdvertsIds: number[] = [],
        public password = 'password') {
        }

        public updateUserData(
            firstname: string,
            surname: string,
            email: string,
            telephone: string,
            password: string): User {
                this.firstname = firstname;
                this.surname = surname;
                this.email = email;
                this.telephone = telephone;
                this.password = password;

                return this;
            }

        public removeFavoriteAdvert(id: number): void {
            this.favouriteAdvertsIds = this.favouriteAdvertsIds.filter(adId => adId !== id);
        }

        public addFavoriteAdvert(adId: number): boolean {
            if (this.favouriteAdvertsIds.some(id => id === adId)) {
                return false;
            }
            this.favouriteAdvertsIds.push(adId);
            return true;
        }

}
