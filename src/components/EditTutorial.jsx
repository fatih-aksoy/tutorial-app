import axios from "axios";
import React, { useEffect, useState } from "react";

//! 3
const EditTutorial = ({ editItem, getTutorials }) => {
  console.log(editItem);
  const { id, title: currentTitle, description: currentDescription } = editItem;
  console.log("current", currentTitle);
  console.log("current", currentDescription);
  //? https://react.dev/reference/react/useState#usestate
  //! State degiskeninin degeri, 1. render ile initialState parametresinin ilk degerini alir. Dolayisi ile bu durumda prop'tan gelen ilk deger state'e aktarilir. Sonradan degisen props degerleri useState'e aktarilmaz. Eger props tan gelen degerleri her degisimde useState'e aktarmak istersek useEffect hook'unu componentDidUpdate gibi kullanabiliriz. stae lerin ilk initial degerleri sabit kalir. ne zaman degisir? setter metodlarini cagirdigimiz zaman.
  // ! *************************
  //! 2
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // ! 3.1
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);

  // ! component did update
  useEffect(() => {
    setTitle(currentTitle);
    setDescription(currentDescription);
    // ! currentTitle veya currentDescription her degistiginde local titel ve description state lerimizi guncelliyoruz.
  }, [currentDescription, currentTitle]);

  console.log(title); //! ilk render da undefined.
  console.log(description);

  //! 4
  const editTutor = async (tutor) => {
    const BASE_URL = "https://tutorial-api.fullstack.clarusway.com/tutorials/";
    try {
      // ! id yukaridan geldigi icin tutor u silip sadece id kalabilir.
      // await axios.put(`${BASE_URL}${tutor.id}/`, tutor);
      await axios.put(`${BASE_URL}${id}/`, tutor);
    } catch (error) {
      console.log(error);
    }
    // ! 5.1
    getTutorials();
  };

  //! 4
  const handleSubmit = (e) => {
    e.preventDefault();
    editTutor({ title, description });
  };

  //! 1
  return (
    <div
      className="modal fade"
      id="open-modal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-danger" id="exampleModalLabel">
              Edit Tutorial
            </h1>
            {/* //! 2 */}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setDescription("");
                setTitle("");
              }}
            />
          </div>
          {/* //! 2 */}
          <div className="modal-body">
            {/* //! 5 */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter your title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="desc"
                  placeholder="Enter your Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-danger"
                  //! 5.2
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTutorial;

//! 1 - Bootstarp modal, compile ve buraya yapistirma isleminden sonra, bu comp u TutorialList.jsx e gidelim ve orada cagiralim. Javascript codu olgudu icin, bootstrap dan dolayi public klasoru, index,html icerisne <script></script> koymaliyiz.

//! 2 -  simdi dusunelim, modal a basinca ne olmasi gerekiyor? inputlarin olmasi gerekiyor. bunun icin AddTutorial.jsx deki form elementini almaliyiz. AddTutorial.jsx e gidelim. form elementini kopyadik, buraya yine geldik. class name i modal body olan kisma yapistirdik. AddTutorial dan state leri alalim. bu component in en ust seviyesine yapistiririz. handleSubmit kismini simdilik kaldrabiliriz. gereksiz butonlari kaldiralim. Css islmerinden sonra ONEMLI kisma gecelim. MODAL a tikladgimizda ilgili satirin gelmesi icin ne yapmaliyim? cunku tiklayinca title ve desc kismi BOS GELIYOR. bide modal i kapatinca sifirlama islemi yapmaliyim. bunun icin handleClose u biz nerde yapiyoruz. burda kapatma butonuna tikladigimda state yi bosaltmam lazim . bu yuzden kapatma butonuna tiklandiginda sifirlama icin  setDescription(""); setTitle(""); yazariz. simdi modal a tikladigimizda satirdaki desc ve title nasil gelicek? Modal a tikladigimda form acilacak, burasi kullanicinin degisikligi yapacagi alan, ve bu form acildiginda form dolu olmasi lazim. bu veriler tikladigim alandan gelicek. nereye tikladi isem ona ait veriyi yakalamam lazim. silme isleminde id yi yakalayarak islem yapti isek, gene id yi yakalayarak edit islemi yapamaz miyim? GUZEL SORU :-) bunun icin EditTutorial comp a bilgi vermeliyiz. simdi TutorialList.jsx comp a gidelim. 3 e hemen gecme!!!

//! 3 - Tutorial.jsx den editItem prop unu aldik. const EditTutorial = ({ editItem }) => {....} ve const { id, titel: newTitle, description: newDescription } = editItem; bu bilgilerin  const [title, setTitle] = useState(newTitle) ,const [description, setDescription] = useState(newDescription) state lerine gelmesi gerekir. ({ editItem }) icinde title, ve desc bilgileri var.

//! 3.1 - state lerin icini doldur. bu state ler neden lazim bana. modal iicnde birseyler yazdik ve bunlari yakalayip backend e gondermek icin. aslinda benim input alanini yonetmem gerekiyor. eger input alanni yoneteceksem, value={titel} attribute tunu eklerim. state lere sirasi ile useState kisimlarina hello ve digerine ,erhaba yazsak. edit kismina basinca bu yazilar gelecek (test amacli). staelerin icinde title la olana currentTitel, digerine currentDescription yazariz. console.log(title); console.log(description); yazdirirsam clg de bunlar undefined geliyor. local statetim bos, undefined geliyor NEDEN?!!!  ilk render da undefined.  edit e tiklayinca cuurentTitle ve currentDescription doluyor ama hala state undefined geliyor NEDEN? COK ONEMLI!!!! BU REACT TIN BIR CAZUBESI :-) 01.38.00 ONMELI ACIKLAMA. (tutorial app Anthony hoca) bunu cozmek icin component did update, useEffect() ve dependency icince currentTitel ve currentDescription u takip ettirmem lazim. sen guncellemeleri takip et diyoruz aslinda. useEffect dependency e bu ikisine yazariz. ve artik tiklayinca modal in inputlari satirda yazilanlarla dolmus olur. HARIKA :-) !!!!! component did update ne yapti, her edite tikladigimda local state leri guncelleyip, ekrana basti. State degiskeninin degeri, 1. render ile initialState parametresinin ilk degerini alir. Dolayisi ile bu durumda prop'tan gelen ilk deger state'e aktarilir. Sonradan degisen props degerleri useState'e aktarilmaz. Eger props tan gelen degerleri her degisimde useState'e aktarmak istersek useEffect hook'unu componentDidUpdate gibi kullanabiliriz. artik modal doldu. ARTIK PUT ISTEGINI EDIT COMP. ICERISNDE CALISTIRALIM.

//! 4 - put istegi icinc const handleSubmit yazalim ve Tutorial.List Comp tan const editTutor i kopyalayalim ve yoruma alallim. TutorialList. comp a gidelim... geri gelince yapistiralim. Simdi  handleSubmit ne zaman calisicak editTutor({ title, description }), editTutor a title ce desription u gonderiyorum. sonrasinda artik form a onSubmit yazabiliriz.

//! 5 - onSubmit islemi; <form onSubmit={handleSubmit}></form>. consoldan baktik 200 bildirisi ni aldik, sayfayi guncelleyince edit isleminin calisitigini gorudk, title ve description update oldu. sonra getTutorials() i artik guncel verileri alalim.  5.1 getTutorials() actigimida bunun buraya props olarak da gelmesi gerekir; const EditTutorial = ({ editItem, getTutorials }) olarak. sonra TutorialList.jsx e gidip orada da getTutorials i props olarak ginderelim.... TutorialList.jsx e  git... geldikten sonra artik ne bekliyorum? submit ten sonra modal kapanacak. modal i kapatan ne? form tag inin ustundeki Button tag i icindeki  data-bs-dismiss="modal"  butonu kapatir. 5.2 data-bs-dismiss="modal"; bunu asagidaki submit buttonu na da ekleyelim.
