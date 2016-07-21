'use strict';

function dealBarcodes(resolvedBarcodes) {

    let barcodeItems = [];

        for(let i = 0; i<resolvedBarcodes.length; i++) {

            let existList= barcodeItems.find(function(item) {
                return item.barcode === resolvedBarcodes[i].barcode;
            });
            if (existList) {
                existList.amount = Number(resolvedBarcodes[i].amount)+Number(existList.amount);
            }else {
                barcodeItems.push(Object.assign({},resolvedBarcodes[i]));
            }
        }

        return barcodeItems;

    }

function resolveBarcodes(tags) {
    return tags.map(function(tag){
        let parseTags = tag.split('-');
        return {
            barcode : parseTags[0],
            amount : Number(parseTags[1]) || 1
        }
    });
}

function matchBarcodes(proBarcodeItems,allItems) {

    let cartItems = [];

    for(let i=0; i<proBarcodeItems.length; i++) {

        let existItems = allItems.find(function(item) {
            return item.barcode === proBarcodeItems[i].barcode;
        });

        if(existItems) {
            let temp = Object.assign({},existItems, {amount : proBarcodeItems[i].amount});
            cartItems.push( Object.assign(temp, {type : proBarcodeItems[i].type}));
        }
    }
    return cartItems;

}

function matchPromotions(barcodesItems, allPromotions) {

    let proBarcodeItems = [];

    for (let i = 0; i < barcodesItems.length; i++) {

        allPromotions.find(function (item) {

            let type = "-1";
            let exist = item.barcodes.find(function(barcode){
                return barcode === barcodesItems[i].barcode;
            });

            if(exist){
                type = item.type;
            }
            proBarcodeItems.push(Object.assign({},barcodesItems[i],{type : type}));
        });
    }

    return proBarcodeItems;
}

function noPromotSubTotal(cartItems) {
    let noProSubItems = [];
    for(let i=0; i<cartItems.length; i++) {
        noProSubItems.push(Object.assign({},cartItems[i], {subTotal : cartItems[i].amount * cartItems[i].price}));
    }
    return noProSubItems;
}

function promotSubTotal(cartItems) {
    let proSubItems = [];
    for(let i=0; i<cartItems.length; i++) {
        let subTotal = 0;
        if(cartItems[i].type === "-1"){
            subTotal =  Number(cartItems[i].amount) * cartItems[i].price;
        }
        if(cartItems[i].type === "BUY_TWO_GET_ONE_FREE"){
            subTotal=((Number(cartItems[i].amount)/3)*2 + (Number(cartItems[i].amount%3)))*cartItems[i].price;
        }
        proSubItems.push(Object.assign({},cartItems[i], {subTotal : Number(subTotal)}));
    }
    return proSubItems;
}

function total(subItems) {

    let total = 0;
    for (let i=0; i<subItems.length; i++) {
        total += subItems[i].subTotal;
    }
    return total;
}

function delPromotions(noProTotal,promotSubTotal){
    return Number(noProTotal)-Number(promotSubTotal);
}

function print(proSubItems,proTotal,promotion){
    for(let i=0 ; i<proSubItems.length; i++){
        console.log("名称：" + proSubItems[i].name
            + "       数量：" + proSubItems[i].amount + proSubItems.unit
            + "       单价：" + proSubItems[i].price + "元"
            + "       小计：" + proSubItems[i].subTotal + "元");
    }
    console.log("总计：" + proTotal + "元");
    console.log("节省：" + promotion + "元");
}

function printReceipt(tags) {

    let resolvedBarcodes = resolveBarcodes(tags);
    let barcodesItems =  dealBarcodes(resolvedBarcodes);
    let allItems = loadAllItems();
    let allPromotions = loadPromotions();

    let proBarcodeItems = matchPromotions(barcodesItems,allPromotions);
    let cartItems = matchBarcodes(proBarcodeItems,allItems);
    let noProSubItems = noPromotSubTotal(cartItems);
    let noProTotal = total(noProSubItems);
    let proSubItems = promotSubTotal(cartItems);
    let proTotal = total(proSubItems);
    let promotion = delPromotions(noProTotal,proTotal);
    print(proSubItems,proTotal,promotion );

}
