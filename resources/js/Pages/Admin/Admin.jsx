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

const Admin = () => {
  const [clickedAt , setClickedAt] = useState('Home')
  const [UI, setUI] = useState(<Home/>)
  const [screenWidth , setScreenWidth] = useState(window.innerWidth)
  window.addEventListener('resize' , ()=>{
    setScreenWidth(window.innerWidth)
    localStorage.setItem('SCREEN_WIDTH' , screenWidth)
  })
  useEffect(()=>{
    if(clickedAt == 'Home'){
      setUI(<Home/>)
    }else if(clickedAt == 'Kasir'){
      setUI(<Kasir/>)
    }else if(clickedAt == 'Menu'){
      setUI(<Menu/>)
    }else{
      setUI(<Settings/>)
    }
  },[clickedAt])

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
            {screenWidth <= 750 ? '' : <div className="w-[40px] h-[40px] bg-black rounded-full"></div>}
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