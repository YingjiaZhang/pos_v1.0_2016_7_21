'use strict';


describe("resolveBarcodes test",function(){
    it("resolveBarcodes test",function(){
        let barcode = [
            'ITEM000001',
            'ITEM000003-2.5',
            'ITEM000005',
            'ITEM000005-2'
        ];
        let result = resolveBarcodes(barcode);

        expect(result).toEqual([
            {
                barcode: "ITEM000001",
                amount: 1
            },
            {
                barcode: "ITEM000003",
                amount: 2.5
            },
            {
                barcode: "ITEM000005",
                amount: 1
            },
            {
                barcode: "ITEM000005",
                amount: 2
            }
        ]);
    })
}) ;

describe("dealBarcodes test",function(){
    it("dealBarcodes test",function(){
        let barcode =[
            {
                barcode: "ITEM000001",
                amount: 1
            },
            {
                barcode: "ITEM000003",
                amount: 2.5
            },
            {
                barcode: "ITEM000005",
                amount: 1
            },
            {
                barcode: "ITEM000005",
                amount: 2
            }
        ];
        let result = dealBarcodes(barcode);

        expect(result).toEqual([
            {
                "barcode": "ITEM000001",
                "amount": 1
            },
            {
                "barcode": "ITEM000003",
                "amount": 2.5
            },
            {
                "barcode": "ITEM000005",
                "amount": 3
            }
        ]);
    })
}) ;

describe("dealBarcodes test",function(){
    it("dealBarcodes test",function(){
        let barcode =[
            {
                barcode: "ITEM000001",
                amount: 1
            },
            {
                barcode: "ITEM000003",
                amount: 2.5
            },
            {
                barcode: "ITEM000005",
                amount: 1
            },
            {
                barcode: "ITEM000005",
                amount: 2
            }
        ];
        let result = dealBarcodes(barcode);

        expect(result).toEqual([
            {
                "barcode": "ITEM000001",
                "amount": 1
            },
            {
                "barcode": "ITEM000003",
                "amount": 2.5
            },
            {
                "barcode": "ITEM000005",
                "amount": 3
            }
        ]);
    })
}) ;

describe("matchPromotions test",function(){
    it("matchPromotions test",function(){
        let barcodesItems = [
            {
                "barcode": "ITEM000001",
                "amount": 1
            },
            {
                "barcode": "ITEM000003",
                "amount": 2.5
            },
            {
                "barcode": "ITEM000005",
                "amount": 3
            }
        ];
        let allPromotions =  [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
    let result = matchPromotions(barcodesItems,allPromotions);

    expect(result).toEqual([
        {
            "barcode": "ITEM000001",
            "amount": 1,
            "type": "BUY_TWO_GET_ONE_FREE"
        },
        {
            "barcode": "ITEM000003",
            "amount": 2.5,
            "type": "-1"
        },
        {
            "barcode": "ITEM000005",
            "amount": 3,
            "type": "BUY_TWO_GET_ONE_FREE"
        }
        ]);
    })
});

describe("matchBarcodes test",function(){
    it("matchBarcodes test",function(){
        let  proBarcodeItems =[
            {
                "barcode": "ITEM000001",
                "amount": 1,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003",
                "amount": 2.5,
                "type": "-1"
            },
            {
                "barcode": "ITEM000005",
                "amount": 3,
                "type": "BUY_TWO_GET_ONE_FREE"
            }
        ];
        let allItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
            },
            {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            }
        ];

        let result = matchBarcodes(proBarcodeItems,allItems);

        expect(result).toEqual([
            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "amount": 1,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "amount": 2.5,
                "type": "-1"
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "amount": 3,
                "type": "BUY_TWO_GET_ONE_FREE"
            }
        ]);

    })

});

describe("noPromotSubTotal test",function(){
    it("noPromotSubTotal test", function(){
        let cartItems = [

                {
                    "barcode": "ITEM000001",
                    "name": "雪碧",
                    "unit": "瓶",
                    "price": 3,
                    "amount": 1,
                    "type": "BUY_TWO_GET_ONE_FREE"
                },
                {
                    "barcode": "ITEM000003",
                    "name": "荔枝",
                    "unit": "斤",
                    "price": 15,
                    "amount": 2.5,
                    "type": "-1"
                },
                {
                    "barcode": "ITEM000005",
                    "name": "方便面",
                    "unit": "袋",
                    "price": 4.5,
                    "amount": 3,
                    "type": "BUY_TWO_GET_ONE_FREE"
                }

        ];

        let result = noPromotSubTotal(cartItems);
        expect(result).toEqual( [

            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "amount": 1,
                "type": "BUY_TWO_GET_ONE_FREE",
                "subTotal": 3
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "amount": 2.5,
                "type": "-1",
                "subTotal": 37.5
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "amount": 3,
                "type": "BUY_TWO_GET_ONE_FREE",
                "subTotal": 13.5
            }
        ]);
    })

});

describe("proSubItems test",function(){
    it("proSubItems test", function(){
        let cartItems = [

            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "amount": 1,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "amount": 2.5,
                "type": "-1"
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "amount": 3,
                "type": "BUY_TWO_GET_ONE_FREE"
            }

        ];


        let result = promotSubTotal(cartItems);
        expect(result).toEqual([

                {
                    "barcode": "ITEM000001",
                    "name": "雪碧",
                    "unit": "瓶",
                    "price": 3,
                    "amount": 1,
                    "type": "BUY_TWO_GET_ONE_FREE",
                    "subTotal": 5
                },
                {
                    "barcode": "ITEM000003",
                    "name": "荔枝",
                    "unit": "斤",
                    "price": 15,
                    "amount": 2.5,
                    "type": "-1",
                    "subTotal": 37.5
                },
                {
                    "barcode": "ITEM000005",
                    "name": "方便面",
                    "unit": "袋",
                    "price": 4.5,
                    "amount": 3,
                    "type": "BUY_TWO_GET_ONE_FREE",
                    "subTotal": 9
                }

        ]);
    });

});

describe("total test",function(){
    it("total test", function(){
        let subItems = [
            {
                "barcode": "ITEM000001",
                "name": "雪碧",
                "unit": "瓶",
                "price": 3,
                "amount": 1,
                "type": "BUY_TWO_GET_ONE_FREE",
                "subTotal": 5
            },
            {
                "barcode": "ITEM000003",
                "name": "荔枝",
                "unit": "斤",
                "price": 15,
                "amount": 2.5,
                "type": "-1",
                "subTotal": 37.5
            },
            {
                "barcode": "ITEM000005",
                "name": "方便面",
                "unit": "袋",
                "price": 4.5,
                "amount": 3,
                "type": "BUY_TWO_GET_ONE_FREE",
                "subTotal": 9
            }

        ];
        let result =  total(subItems);
        expect(result).toEqual(51.5);
    });

});

describe("delPromotions test",function(){
    it("delPromotions test", function(){
        let noProTotal = 53;
        let proTotal = 50.5;
        let result =delPromotions(noProTotal,proTotal) ;
        expect(result).toEqual(2.5);
    });

});








