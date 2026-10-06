"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { useProducts } from '../../hooks/useProducts';
import Card from '../../../components/Card/Card';
import Filter from '../../../components/Filter/Filter';
import { useShop } from '../../../context/ShopContext.jsx';
import './Product.scss';
import PageLoader from '@/components/PageLoader/PageLoader';

const CatalogContent = () => {
  const { products, isLoading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeBrand, setActiveBrand] = useState('all');
  const [activeSize, setActiveSize] = useState([]);
  const [activeColors, setActiveColors] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [currentMin, setCurrentMin] = useState(0);
  const [currentMax, setCurrentMax] = useState(100000);

  const { favorites, toggleFavorite, searchQuery } = useShop();

  const searchParams = useSearchParams();
  const params = useParams();
  const catalogType = params.catalogType;

  useEffect(() => {
    const brandFromUrl = searchParams.get('brand');
    if (brandFromUrl) {
      setActiveBrand(brandFromUrl);
    } else {
      setActiveBrand('all');
    }
  }, [searchParams]);

  useEffect(() => {
    setActiveCategory('all');
    setActiveSize([]);
    setActiveColors([]);
  }, [catalogType]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const currentType = catalogType || 'clothing';
    const activeProducts = products.filter(p => p.type === currentType);

    if (activeProducts.length > 0) {
      const prices = activeProducts.map(p =>
        parseInt(p.price.toString().replace(/[^0-9]/g, ''), 10) || 0
      );
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setMinPrice(min);
      setMaxPrice(max);
      setCurrentMin(min);
      setCurrentMax(max);
    }
  }, [catalogType, products]);

  // Проверки на загрузку и ошибки
  if (isLoading) return <PageLoader/>;

  if (error) {
    return <div className="container" style={{ padding: '60px 0' }}>Ошибка: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="container" style={{ padding: '60px 0' }}>Товары не найдены</div>;
  }

  const filteredProducts = products.filter((product) => {
    const pDescription = product.description.toLowerCase();
    const pBrand = product.brand.toLowerCase();
    const query = searchQuery.toLowerCase();

    const isSearching = searchQuery.trim() !== '';
    const currentType = catalogType || 'clothing';

    const matchesType = isSearching ? true : product.type === currentType;
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesBrand = activeBrand === 'all' || pBrand.includes(activeBrand.toLowerCase());
    const matchesSearch = query === '' || pDescription.includes(query) || pBrand.includes(query);

    const matchesSize = activeSize.length === 0 || (product.sizes && product.sizes.some(size => {
      return activeSize.includes(size.toString());
    }));

    const matchesColor = activeColors.length === 0 ||
      (product.color && activeColors.includes(product.color.toLowerCase().trim()));

    const pureProductPrice = parseInt(product.price.toString().replace(/[^0-9]/g, ''), 10) || 0;
    const matchesPrice = pureProductPrice >= currentMin && pureProductPrice <= currentMax;

    return matchesType && matchesCategory && matchesBrand && matchesSearch && matchesSize && matchesColor && matchesPrice;
  });

  return (
    <section className="section-product container">
      <div className="product">
        <Filter
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeSize={activeSize}
          setActiveSize={setActiveSize}
          activeColors={activeColors}
          setActiveColors={setActiveColors}
          minPrice={minPrice}
          maxPrice={maxPrice}
          currentMin={currentMin}
          setCurrentMin={setCurrentMin}
          currentMax={currentMax}
          setCurrentMax={setCurrentMax}
          catalogType={catalogType}
        />
        <ul className="product-list">
          {filteredProducts.length === 0 ? (
            <div className="product-empty">
              <h3 className="product-empty__title">Товаров не найдено</h3>
              <p className="product-empty__text">Попробуйте выбрать другую категорию или бренд</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Card
                key={product.id}
                product={product}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

const CatalogPage = () => (
  <Suspense fallback={<div className="container" style={{ padding: '60px 0' }}>Загрузка каталога...</div>}>
    <CatalogContent />
  </Suspense>
);

export default CatalogPage;