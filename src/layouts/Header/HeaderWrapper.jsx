"use client";
import Header from './Header.jsx';
import Preloader from '../../components/Preloader/Preloader.jsx';

const HeaderWrapper = () => {
  return (
    <>
      <Preloader />
      <Header />
    </>
  );
};

export default HeaderWrapper;