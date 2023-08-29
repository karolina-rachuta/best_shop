const inputRef = document.querySelectorAll(".form__input");
const rowItemRefs = document.querySelectorAll(".list__item");
const itemCalcRefs = document.querySelectorAll(".item__calc");
const selectInputRef = document.querySelector(".select__input");
const selectDropDownRef = document.querySelector(".select__dropdown");
const selectPackageRefs = document.querySelectorAll("li[data-value]");
const rowPackageRef = document.querySelector("[data-id='package']");
const checkboxRefs = document.querySelectorAll('[type="checkbox"]');
const accountingRef = document.querySelector("[data-id='accounting']");
const terminalRef = document.querySelector("[data-id='terminal']");
const totalRef = document.querySelector("#total-price");
const allSectionRef = document.querySelector(".calc");
const totalPricesRefs = [
    ...document.querySelectorAll(".item__price")
];
const textTotalRef = document.querySelector(".total__price");
checkboxRefs.forEach((checkbox)=>{
    checkbox.addEventListener("click", function() {
        if (checkbox.id === "accounting") {
            accountingRef.style.display = checkbox.checked ? "block" : "none";
            accountingRef.lastElementChild.textContent = checkbox.checked ? "$35" : "$0";
            calculateTotal();
        } else if (checkbox.id === "terminal") {
            terminalRef.style.display = checkbox.checked ? "block" : "none";
            terminalRef.lastElementChild.textContent = checkbox.checked ? "$5" : "$0";
            calculateTotal();
        }
    });
});
allSectionRef.addEventListener("click", function() {
    totalRef.style.display = "block";
});
selectInputRef.addEventListener("click", function() {
    selectDropDownRef.style.display = "block";
});
selectPackageRefs.forEach((select, index)=>{
    // const selectPackageRef = selectPackageRefs[index];
    select.addEventListener("click", function() {
        selectDropDownRef.style.display = "none";
        rowPackageRef.style.display = "block";
        selectInputRef.textContent = "Premium";
        selectInputRef.style.color = "black";
        rowPackageRef.lastElementChild.textContent = rowPackageRef.lastElementChild.selected ? "$0" : "$60";
        calculateTotal();
    });
});
function updateProductQuantity(index, value, pricePerItem) {
    const totalValue = value * pricePerItem;
    itemCalcRefs[index].textContent = `${value} * $${pricePerItem}`;
    rowItemRefs[index].lastElementChild.textContent = `$${totalValue.toFixed(2)}`;
    // Update totalPricesRefs array with the new item__price elements
    totalPricesRefs[index] = rowItemRefs[index].lastElementChild;
}
inputRef.forEach((input, index)=>{
    const rowItemRef = rowItemRefs[index];
    const itemCalcRef = itemCalcRefs[index];
    input.addEventListener("blur", function() {
        let value = parseInt(input.value);
        if (Number.isInteger(value) && value >= 1) {
            let pricePerItem;
            if (input.id === "products") pricePerItem = 0.5;
            else if (input.id === "orders") pricePerItem = 0.25;
            rowItemRef.style.display = "block";
            updateProductQuantity(index, value, pricePerItem);
            calculateTotal();
        } else {
            console.log("wprowadź liczby całkowite dodatnie");
            rowItemRef.style.display = "none";
        // rowItemRef.textContent = "$0";
        // calculateTotal();
        }
    });
});
// Function to reset the prices to $0
function resetPricesToZero() {
    totalPricesRefs.forEach((itemPriceElement)=>{
        itemPriceElement.textContent = "$0";
    // textTotalRef.textContent = "$0";
    });
}
// Call the resetPricesToZero function to reset the prices
resetPricesToZero();
function calculateTotal() {
    const sum = totalPricesRefs.reduce((total, item)=>{
        const price = parseFloat(item.textContent.replace("$", ""));
        return total + price;
    }, 0);
    textTotalRef.textContent = `$${sum.toFixed(2)}`;
}
calculateTotal() // function calculateTotal() {
 //     const sum = totalPricesRefs.reduce((totalPricesRefs, item) => totalPricesRefs+ item, 0);
 //             // const price = parseFloat(item.textContent.replace('$', ''));
 //             // return total + price;
 //         textTotalRef.textContent = `$${sum.toFixed(2)}`;
 //
 // }
;

//# sourceMappingURL=index.c719088e.js.map
