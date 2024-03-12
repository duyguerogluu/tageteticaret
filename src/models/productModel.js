class products {
    constructor({
      _id = '',
      title = '',
      description = null,
      price = { amount: 0, currency: 'TRY' },
      images = [],
      createdAt = new Date(),
      status = 0,
    }) {
      this._id = _id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.images = images;
      this.createdAt = createdAt;
      this.status = status;
    }
  }
  
  export default products;