import { useEffect, useState } from "react";
import AddTutorial from "../components/AddTutorial";
import TutorialList from "../components/TutorialList";
import axios from "axios";

const Home = () => {
  const [tutorials, setTutorials] = useState([]);
  // const BASE_URL = "https://tutorial-api.fullstack.clarusway.com/tutorials/";

  const getTutorials = async () => {
    const BASE_URL = "https://tutorial-api.fullstack.clarusway.com/tutorials/"; //! burda da olur.
    try {
      // const data = await axios(BASE_URL); //! 1
      const { data } = await axios(BASE_URL);
      setTutorials(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tutorials);

  //! Mount asamasinda api ye istek atiyoriz.
  useEffect(() => {
    getTutorials();
  }, []);

  //! 2
  //! 3
  return (
    <>
      {/* //! 4 */}
      {/* <AddTutorial tutorials={tutorials} setTutorials={setTutorials} /> */}
      <AddTutorial getTutorials={getTutorials} />
      <TutorialList tutorials={tutorials} getTutorials={getTutorials} />
    </>
  );
};

export default Home;

//! burun CSS ismlemerinden sonra veri cekmek ile ise baslariz. axios kullaniriz, await varsa async de vardir. burda axios onune get de yazilabilir, yazilmaya da bilir. getTutorials() fonk. ile cagririz. ham veri data olarak gelir ama gelen veride bize data kismi lazim (list kisminda ki veriler). oyuzden console.log(data.data) yazariz. static verilerin DOM a bsilmasi guncellenmsi icin state yazariz. aksi halde veri guncellenmez.

//! 1 - ikinci bir method olarak destructuring islemi yapilabilir. const { data } = await axios(BASE_URL); boylece setTutorials(data.data); demek yerine setTutorials(data) deriz. sonrasinda TutorialList.jsx comp. una tutorials={tutorials} prop unu gondeririz. 2 ye hemen gecme!!

//! 2 - AddTutorialList.jsx den buraya geledik? Neden? cunku bir kurgumuz var: sonra title ve description un icini temizleme islemi yapariz. problem su, veri eklendiginde hemen ekrana basilmiyor. `PROBLEM!!!!! Refresh yapinca yeni veri gozukuyor. add tutorial icersinde yeni bir obje olusturuyoruz, backend e bu yeni bilgi gidiyor. ama tutorial list in bundan haberi olmuyor. backend liste giden veriyi TutorialList.jsx anlayamiyor. NASIL COZERIZ? COZUM YAPALIM !!! mesela TutorialList vbir state ve bu Home.jsx de tutuluyor. Ayni state biz AddTutorial.jsx e gondersek ve orada gunecellesek nasil olur? bunun icin once prop gonderelim; <AddTutorial tutorials={tutorials} /> . Ama guncelleme icin set de lazim. set i de ekleriz; <AddTutorial tutorials={tutorials} setTutorials={setTutorials} /> sonra AddTutorial.jsx e gidip proplari cekelim. 3 e hemen gecme!!

//! 3 - getTutorials i props olarak gondermek icin AddTutorial.jsx den buraya geldik. state ten ziyade fonksiyon gonderdik. 4 e hemen gecme !

//! 4 - silme islemi ve bundan dolayi props gondermemiz icin Home.jsx e geldik. getTutorials() propunu TutorialList.comp a gonderelim. 5. maddeye hemen gecme.

//! 5 -
