function calculateBill(bill) {
  let totalBillAmount = 0;
  let billItemsSummary = [];

  for (let billItem of bill.billItems) {

    let menuIndex = -1;

    for (let index in menu) {
      if (menu[index].id === billItem.id) {
        menuIndex = index;
        break;
      }
    }

    let menuItem = menu[menuIndex];
    let basePrice = menuItem.rate;

    if (billItem.discount.isInPercent) {
      basePrice = basePrice - (billItem.discount.rate * basePrice / 100);
    } else {
      basePrice = basePrice - billItem.discount.rate;
    }

    let totalTaxAmount = 0;

    for (let tax of menuItem.taxes) {
      if (tax.isInPercent) {
        totalTaxAmount += (tax.rate * basePrice / 100);
      } else {
        totalTaxAmount += tax.rate;
      }
    }

    let finalPricePerUnit = basePrice + totalTaxAmount;
    let totalItemPrice = finalPricePerUnit * billItem.quantity;

    totalBillAmount += totalItemPrice;

    billItemsSummary.push(
      `${menuItem.itemName}@${menuItem.rate} x ${billItem.quantity} = ${totalItemPrice.toFixed(2)}`
    );
  }

  return [totalBillAmount.toFixed(2), billItemsSummary];
}
