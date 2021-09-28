export class Discount{
  constructor( discountType, quantityToBeBought, displayPrice, savings, percentageSavings, isMemberDiscount) {
    this.discountType = discountType;
    this.quantityToBeBought = quantityToBeBought;
    this.displayPrice = displayPrice;
    this.savings = savings;
    this.percentageSavings = percentageSavings;
    this.isMemberDiscount = isMemberDiscount;
  }
}