export const getProducts = `query {
  products {
    totalItems
    items {
      id
      name
    }
  }
}`;

export const getProductByName = (productName: string) => {
  return `query {
    products (options:{filter: {name:{eq: "${productName}"}}}) {
      totalItems
      items {
        id
        name
      }
    }
  }`;
}