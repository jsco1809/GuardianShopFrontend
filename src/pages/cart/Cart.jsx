import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCart from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchProducts } from '../../redux/productSlice';

const ITEMS_PER_PAGE = 10;

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, error, validateCart, updateItemQuantity, removeItem} = useCart();
  const { products } = useSelector((state) => state.products);

  const [loading, setLoading] = useState(false);
  const [quantityMap, setQuantityMap] = useState({});
  const [removedItems, setRemovedItems] = useState(new Set());
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts(currentPage));
    }
  }, [dispatch, products.length, currentPage]);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      await validateCart(currentPage);
      setLoading(false);
    };

    fetchCartItems();
  }, [currentPage]);

  useEffect(() => {
    const itemsArray = cartItems.content || [];
    setIsCartEmpty(itemsArray.length === 0);
    const initialQuantityMap = {};
    itemsArray.forEach(item => {
      initialQuantityMap[item.productId] = item.quantity;
    });
    setQuantityMap(initialQuantityMap);
  }, [cartItems]);

  const inventoryMap = products.reduce((map, product) => {
    product.derivedProducts.forEach(derived => {
      map[derived.id] = product.imageUrl;
    });
    return map;
  }, {});

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(item);
      setQuantityMap(prevMap => {
        const newMap = { ...prevMap };
        delete newMap[item.productId];
        setRemovedItems(prevRemoved => new Set(prevRemoved.add(item.productId)));
        if (Object.keys(newMap).length === 0) setIsCartEmpty(true);
        return newMap;
      });
    } else {
      setQuantityMap(prevMap => ({
        ...prevMap,
        [item.productId]: newQuantity
      }));
      updateItemQuantity({ ...item, quantity: newQuantity });
    }
  };

  const handleRemoveItem = (item) => {
    removeItem(item); 
    setQuantityMap(prevMap => {
      const newMap = { ...prevMap };
      delete newMap[item.productId];
      setRemovedItems(prevRemoved => new Set(prevRemoved.add(item.productId)));
      if (Object.keys(newMap).length === 0) setIsCartEmpty(true);
      return newMap;
    });
  };

  const totalPages = Math.ceil(cartItems.totalElements / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='flex flex-wrap justify-center place-content-center h-full dark:bg-darkBg dark:text-dark-text'>
      <div className='w-full text-center mb-5'>
        <h1 className='btn-fourty max-w-[150px] mx-auto p-2 mb-5 dark:btn-fourty'>
          Mi Carrito
        </h1>
        {error && <p className='text-red-500'>{error}</p>}
        {loading && <p className='text-center text-gray-500'>Cargando...</p>}
      </div>

      {isCartEmpty ? (
        <p className='text-center w-full'>El carrito está vacío</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full'>
          {cartItems.content.map((item, index) => {
            const price = item.price;
            const quantity = quantityMap[item.productId] || item.quantity;
            const totalPrice = (price * quantity).toFixed(2);

            return (
              <div key={index} className={`bg-fourty/50 rounded-md p-2 ${removedItems.has(item.productId) ? 'hidden' : ''}`}>
                <img
                  src={inventoryMap[item.productId] || 'placeholder-image.jpg'}
                  alt={item.name || 'Producto'}
                  className="w-full object-cover h-49"
                />
                <h1 className='font-bold mt-2 text-black dark:text-darkText'>{item.name || "Producto sin título"}</h1>
                <p className="font-semibold text-black dark:text-darkText">Precio: ${totalPrice}</p>
                <p className='text-black dark:text-darkText font-bold'>Cantidad: {quantity}</p>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => handleQuantityChange(item, quantity - 1)}
                    className='btn-fourty dark:btn-primary'
                    disabled={quantity <= 0}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, quantity + 1)}
                    className='btn-fourty dark:btn-primary'
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className='btn-fourty dark:btn-primary'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={`bg-fourty/50 rounded-md p-2 flex items-center justify-center mt-5`}>
        <button className='btn-fourty font-bold mx-1 px-3 py-1'>
          Pages
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded font-bold btn-fourty ${page === currentPage ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cart;