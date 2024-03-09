export const itemsFragment = `
fragment itemsField on Product {
  id
  name
}
`;
export const getProductsWithFragment = `
${itemsFragment}
query {
  products {
    totalItems
    items {
      ...itemsField
    }
  }
}
`;