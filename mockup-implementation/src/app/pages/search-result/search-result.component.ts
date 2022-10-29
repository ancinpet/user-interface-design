import {Component, OnInit} from '@angular/core';
import {AdvertismentService} from '../../services/advertisment.service';
import {Advertisment} from '../../model/advertisment';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    options = [
        {label: 'Price ( Lowest To Highest )', asc: true, key: 'price'},
        {label: 'Price ( Highest To Lowest )', asc: false, key: 'price'},
        {label: 'Mileage ( Lowest To Highest )', asc: true, key: 'Mileage'},
        {label: 'Mileage ( Highest To Lowest )', asc: false, key: 'Mileage'},
        {label: 'Manufacture Year ( Newest To Oldest )', asc: true, key: 'Manufactured'},
        {label: 'Manufacture Year ( Oldest To Newest )', asc: false, key: 'Manufactured'},
    ];

    sortCriteria = new FormControl(this.options[0]);

    panelColor = new FormControl('red');

    advs: Advertisment[];

    constructor(private advService: AdvertismentService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.advs = this.advService.getAllAdverts();
        const model = this.route.snapshot.queryParams.model;
        const brand = this.route.snapshot.queryParams.brand;
        const priceFrom = +this.route.snapshot.queryParams.priceFrom;
        const priceTo = +this.route.snapshot.queryParams.priceTo;
        const mileageFrom = +this.route.snapshot.queryParams.mileageFrom;
        const mileageTo = +this.route.snapshot.queryParams.mileageTo;
        const gearbox = this.route.snapshot.queryParams.gearbox;
        const engine = this.route.snapshot.queryParams.engine;

        this.advs = this.advs.filter(adv => {

            if ( brand && brand !== adv.title ) {
                return false;
            }

            if ( model && model !== adv.subtitle ) {
                return false;
            }
            const advPrice = +adv.price.replace(/\D/g, '');
            if ( ( priceTo && advPrice > priceTo) || ( priceFrom && advPrice < priceFrom)) {
                return false;
            }
            for (const entry of adv.mainDetails) {
                if (entry[0] === 'Mileage' ) {
                    const advMileage = +entry[1].replace(/\D/g, '');
                    if ( (mileageTo && advMileage > mileageTo) || (mileageFrom && advMileage < mileageFrom)) {
                        return false;
                    }
                } else if (engine && entry[0] === 'Engine' && entry[1] !== engine) {
                    return false;
                } else if (gearbox && entry[0] === 'Gearbox' && entry[1] !== gearbox) {
                    return false;
                }
            }
            return true;
        });

        this.setSorting(this.options[0]);
    }

    setSorting(sortCriteria): void {
        const sortFlag = sortCriteria.asc ? 1 : -1;

        this.advs = this.advs.sort((a: Advertisment, b: Advertisment) => {
            if (a[sortCriteria.key] !== undefined) {
                const firstNum = parseInt(a[sortCriteria.key].replace(/\s/g, '').slice(0, -3), 10);
                const secondNum = parseInt(b[sortCriteria.key].replace(/\s/g, '').slice(0, -3), 10);

                return (firstNum - secondNum) * sortFlag;
            } else {

                for (let i = 0; i < a.mainDetails.length; i++){
                    const entryA = a.mainDetails[i];
                    const entryB = b.mainDetails[i];


                    if (entryA[0] === sortCriteria.key) {
                        const aValue = entryA[1];
                        const bValue = entryB[1];

                        return (+aValue.replace(/\D/g, '')
                            - +bValue.replace(/\D/g, '')) * sortFlag;
                    }
                }

                return 0;
            }
        });
    }
}



