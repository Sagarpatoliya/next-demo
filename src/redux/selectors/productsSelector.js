export const selectProducts = (state) => ({
    products: state.products.products,
    status: state.products.status,
    totalCount: state.products.totalCount,
    error: state.products.error,
    currentPage: state.products.currentPage,
    searchQuery:state.products.searchQuery,
    category:state.products.category,
    sortBy:state.products.sortBy,
});
