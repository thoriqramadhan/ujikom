import MenuSvg from '@/Components/svgComp/MenuSvg';
import { Head } from '@inertiajs/react';
import React, {useEffect, useState } from 'react';
import SideNav from '@/Components/SideNav/SideNav';
import HomeSvg from '@/Components/svgComp/HomeSvg';
import KasirSvg from '@/Components/svgComp/KasirSvg';
import Home from '@/Components/Home(Admin)/Home';
import Kasir from '@/Components/Kasir(Admin)/Kasir';
import Settings from '@/Components/Settings/Settings';
import SettingsSvg from '@/Components/svgComp/SettingsSvg';
import Menu from '@/Components/Menu(Admin)/Menu';



// file DataContext.js


// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//   const [data, setData] = useState({
//     key: screenWidth,
//     // tambahkan data lainnya di sini
//   });

//   return (
//     <DataContext.Provider value={{ data, setData }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

const Admin = ({users, loginuser, onlykasir, menus, categories, uangHarian, uangBulanan, uangTahunan, menuSales, dailyIncome, monthlyIncome, targetHarian, tax}) => {
  console.log(targetHarian)
  const [clickedAt , setClickedAt] = useState('Home')
  const [UI, setUI] = useState(<Home/>)
  const [screenWidth,setScreenWidth] = useState(window.innerWidth || JSON.parse(localStorage.getItem('SCREEN_WiDTH')))
  useEffect(()=>{
    if(clickedAt == 'Home'){
      setUI(<Home onlykasir={onlykasir} uangHarian={uangHarian} uangBulanan={uangBulanan} uangTahunan={uangTahunan} menuSales={menuSales} dailyIncome={dailyIncome} monthlyIncome={monthlyIncome} incomeTarget={targetHarian}/>)
    }else if(clickedAt == 'Kasir'){
      setUI(<Kasir users={users} onlykasir={onlykasir} />)
    }else if(clickedAt == 'Menu'){
      setUI(<Menu menus={menus} categories={categories} />)
    }else{
      setUI(<Settings users={users} loginuser={loginuser}/>)
    }
  },[clickedAt])
  window.addEventListener('resize' , ()=>{
    setScreenWidth(window.innerWidth)
  })

  return (
    <>
    <Head title='Admin'/>
    <div className="w-full h-[100vh] flex ">
      {/* <div className="w-full pb-[80px]">
        <div className="w-full h-full bg-sky-100 pb-[100px] relative">
          <div className="h-[50px] w-[50px] bg-red-100 absolute bottom-0"></div>
        </div>
      </div> */}
      {UI}
      <SideNav screenWidth={screenWidth} clickedAt={clickedAt} setClickedAt={setClickedAt}>
            {screenWidth <= 750 ? '' : <img src='/img/logo.png' className="w-[50px] h-[50px] rounded-full"/>}
            <HomeSvg screenWidth={screenWidth} clickedAt={clickedAt} setClickedAt={setClickedAt}/>
            <KasirSvg screenWidth={screenWidth} clickedAt={clickedAt} setClickedAt={setClickedAt}/>
            <MenuSvg screenWidth={screenWidth} clickedAt={clickedAt} setClickedAt={setClickedAt}/>
            {screenWidth <= 750 ? <SettingsSvg clickedAt={clickedAt} setClickedAt={setClickedAt}/> : ''}
      </SideNav>
    </div>
    </>
  );
};

export default Admin;