"use client";
import './PageLoader.scss';

const PageLoader = () => {
  const getIconUrl = (name) => `/icons/${name}`;

  return (
    <div className="page-loader">
      <img
        src={getIconUrl('Stone-Island-Logo.svg')}
        alt="Загрузка"
        className="page-loader__logo"
      />
    </div>
  );
};

export default PageLoader;