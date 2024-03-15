import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator"; 
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import productService from "../../services/productService";
import products from "../../models/productModel";

const ShopGridNoSidebar = () => {
  const [layout, setLayout] = useState("grid three-column");
  const sortType = "";
  const sortValue = "";
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);
  //const { products } = useSelector((state) => state.product);

  const pageLimit = 15;
  let { pathname } = useLocation();

  const getLayout = layout => {
    setLayout(layout);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

 

  useEffect(() => {
  
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setApiProducts(response);

      } catch (error) {
        console.error('Ürünleri getirirken bir hata oluştu:', error);
      }
    };

  
    fetchProducts();
 

    const products = apiProducts.map(apiProduct => new products(apiProduct));
    //setCurrentData(sortedProducts?.slice(offset, offset + pageLimit));
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of Marjilens react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Shop", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridNoSidebar;
