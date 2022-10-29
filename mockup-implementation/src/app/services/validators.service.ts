import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

function check_if_is_integer(value) {
  return value && (parseFloat(value) == parseInt(value)) && !isNaN(value);
}

function check_if_is_year(value) {
  return value && check_if_is_integer(value) && parseInt(value) > 1900 && parseInt(value) <= 2020;
}

function check_if_is_price(value) {
  if (!value) {
    return false;
  }
  
  var val = value.replace(/\s/g, "");
  return (/^\+?(0|[1-9]\d*)$/.test(val));
}

function check_if_is_mileage(value) {
  if (!value) {
    return false;
  }

  var val = value.replace(/\s/g, "");
  return (/^\+?(0|[1-9]\d*)$/.test(val));
}

function check_if_is_usage(value) {
  if (!value) {
    return true;
  }
  
  return (/^((0|[1-9])\d*\.?\d*)$/.test(value));
}

@Injectable()
export class ValidatorsService {

  public isInteger = (control: FormControl) => {
       return check_if_is_integer(control.value) ? null : {
          notNumeric: true
       }
  }

  public isYear = (control: FormControl) => {
       return check_if_is_year(control.value) ? null : {
          notYear: true
       }
  }

  public isPrice = (control: FormControl) => {
       return check_if_is_price(control.value) ? null : {
          notPrice: true
       }
  }

  public isMileage = (control: FormControl) => {
       return check_if_is_mileage(control.value) ? null : {
          notMileage: true
       }
  }

  public isUsage = (control: FormControl) => {
       return check_if_is_usage(control.value) ? null : {
          notUsage: true
       }
  }
}