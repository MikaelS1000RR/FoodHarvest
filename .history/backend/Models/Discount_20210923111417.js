export class Discount{
  constructor(id, discountType, quantityToBeBought, displayPrice, savings, percentageSavings, isMemberDiscount) {
    this.id = id;
    this.discountType = discountType;
    this.quantityToBeBought = quantityToBeBought;
    this.discountType = discountType;
    this.savings = savings;
    this.percentageSavings = percentageSavings;
    this.isMemberDiscount = isMemberDiscount;
  }
}