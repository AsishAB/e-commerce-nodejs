module.exports = class Cart {

    constructor(cartId, quantity, productId, createdBy) {
        this.TCI_CartId = (cartId != '' && cartId != null) ? cartId : '';
        this.TCI_Quantity = quantity;
        this.TCI_ProductId = productId;
        this.TCI_Created_By = createdBy;
    }

    addToCart() {
        return db.collection('doc_cart').insertOne(this);
    }

    updateCart() {
        return db.collection('doc_cart').updateOne();
    }
}