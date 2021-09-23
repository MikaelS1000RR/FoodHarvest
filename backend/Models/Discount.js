export class Discount{
  constructor( discountType, quantityToBeBought, displayPrice, savings, percentageSavings, isMemberDiscount) {
    this.discountType = discountType;
    this.quantityToBeBought = quantityToBeBought;
    this.discountType = discountType;
    this.savings = savings;
    this.percentageSavings = percentageSavings;
    this.isMemberDiscount = isMemberDiscount;
  }
}