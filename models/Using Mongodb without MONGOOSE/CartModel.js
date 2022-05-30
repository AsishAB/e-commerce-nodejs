const getDB = require("../helpers/database-mongodb").getDB;
const mongodb = require('mongodb');
const Cart = require('../models/CartModel');

module.exports = class Cart {

    constructor(cartId, quantity, productId, createdBy) {
        this.TCI_CartId = (cartId != null) ? new mongodb.ObjectId(cartId) : null;
        this.TCI_Quantity = quantity;
        this.TCI_ProductId = productId;
        this.TCI_Created_By = createdBy;
    }

    save() {
        const db = getDB();
        if (this.TCI_CartId) {
            return db.collection('doc_cart').updateOne( { _id:this.TCI_CartId}, { $set:this  } );
            
        } else {
             
            return db.collection('doc_cart').insertOne( this );
        }
        
        
    }

    static deleteById(cartId) {
        
        const db = getDB();
        return db.collection('doc_cart').deleteOne( { _id: new mongodb.ObjectId(cartId)} );

    }

    
}