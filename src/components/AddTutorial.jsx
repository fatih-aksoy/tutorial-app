import { useState } from "react";
import axios from "axios";

//! 6
// const AddTutorial = ({ tutorials, setTutorials }) => {
//! 8
const AddTutorial = ({ getTutorials }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //! 1
    const newTutorial = { title: title, description: description }; //! 4
    console.log(newTutorial);
    postTutorial(newTutorial);
    //! 5
    setTitle("");
    setDescription("");
    //! 7
    // setTutorials([...tutorials, newTutorial]);
    //! 9
  };

  // ! 3
  // const postTutorial = async () => {
  const postTutorial = async (newTutorial) => {
    try {
      const BASE_URL =
        "https://tutorial-api.fullstack.clarusway.com/tutorials/";
      // await axios.post(BASE_URL,{});
      // await axios.post(BASE_URL, { newTutorial });
      // const res = await axios.post(BASE_URL, { newTutorial }); //! 4
      const res = await axios.post(BASE_URL, newTutorial);
      console.log(res);
      //! 9
      // setTutorials([...tutorials, newTutorial]);
    } catch (error) {
      console.log(error);
    }
    //! 8
    //! Tum tutorial leri iste ve state i guncelle
    getTutorials();
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="display-6 text-danger">Add Your Tutorial</h1>
      {/* //! 2 */}
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
        <button type="submit" className="btn btn-danger mb-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTutorial;

//! 1 - veri girildiginde ve submit e basildiginda sayfayi refrest etmemesi icin e.preventDefault() yazariz. data sonra title ve description statle lerine odaklanalim. bunlari obje  haline getirip post lamamiz lazim. post lucagimiz veriden baslayalim; const newTutor.

//! 2 - burada submit islemi icin button tag ina onSubmit={handleSubmit} yazilmaz. onun yarine <form onSubmit={handleSubmit}>...</form> olarak yazilir. the onSubmit event should be attached to the <form> tag, not the <button> tag. In your code, you've correctly attached the onSubmit event to the <form> tag. This is the standard way of handling form submissions in React.The purpose of attaching the onSubmit event to the <form> tag is to capture the form submission event, preventing the default form submission behavior (which would cause a page reload) and allowing you to handle the form data in the handleSubmit function.If you attach the onSubmit event directly to the <button> tag, it won't work as expected because the form won't capture the submission event, and the handleSubmit function won't be called when the form is submitted.

//! 3 - post islemi icin const postTutorial = async () => {...} yazariz. burdaki const newTutorial = { title: title, description: description }; degiskenini postTutorial() icersinde nasil kullanirim? bunun icin newTutor u parametre olarak gecerim.  const postTutorial = async (newTutorial) => {..} ve await axios.post(BASE_URL, { newTutorial }); sonrasinda veriyi yakalamaik ustersek conts res ve console.log(res) olarak da yazilir.

//! 4 - Cok onemli birsey farkettik.   const newTutorial = { title: title, description: description }; bir obje oldugu icin { newTutorial } bu sekilde tekrardan obje formatinda yazmak dogru degil, hata verir. obje olarak geldi ise bir daha obje olarak yakalamya gerek yok.

//! 5 - sonra title ve description un icini temizleme islemi yapariz. problem su, veri eklendiginde hemen ekrana basilmiyor. `PROBLEM!!!!! Refresh yapinca yeni veri gozukuyor. add tutorial icersinde yeni bir obje olusturuyoruz, backend e bu yeni bilgi gidiyor. ama tutorial list in bundan haberi olmuyor. backend liste giden veriyi TutorialList.jsx anlayamiyor. NASIL COZERIZ? COZUM YAPALIM !!! mesela TutorialList vbir state ve bu Home.jsx de tutuluyor. Ayni state biz AddTutorial.jsx e gondersek ve orada gunecellesek nasil olur? :-)  Bunun icn Home.jsx e gidelim...

//! 6 - Home.js de <AddTutorial tutorials={tutorials} setTutorials={setTutorials} /> proplari gonderdikten sonra proplari cekelim.

//! 7 -  sonra const handleSubmit icine setTutorials(); yazalim. sonra setTutorials([...tutorials, newTutorial]); yazariz. ama burada id ler problem olusturur. bu bir yontem ama dez avantaji var. boylece yoruma aldik. Onun yerine state in guncellenmesi icin getTutorials yazsak nasil olur? bunun yaparsak verilen cekilmesini ve guncellenmesini saglamaz miyiz? bu sefer Home comp dan getTutorials i props olarak gondermeliyiz. Home.jsx e gidelim.

//! 8 - const AddTutorial = ({ getTutorials }) => {....} props u gectik ve asagida  getTutorials() biciminde cagirdik. yukarda ortak parentte bulunan bir fonk .u iki yerde cagirabilirsiniz. YAPTIKLARIMZI OZETLIYELIM: Home yazdigimiz getTutorials state tini , addTutorial.jsx e gonderdik. AddTutrorial da bir post istegi attiktan sonra get isteginde bulundum. getTutorials() yazarak, tum tutorial leri iste ve state i guncelle. title desc yazip submit e basinca ekranda yeni deger gozuktu, bu nasil oldu? post yaptiktan sonra biz yeniden  getTutorials() yani get istegi atiik. bu islemden sonra arik silme islemine gecebiliriz. Bunun icin TutorialList.jsx e gidelim...

//! 9 - Edit islemi icin,  setTutorials([...tutorials, newTutor]) state ni  AddTutorial.jsx e ekleyelim. spread ile eski tutorials leri tut, newTutor u icine ekle. Backend de istek atmanda bu islemi burda yapabilirim. aslinda bulundugumuz comp a props gondeririz. Neden backend e istek atiyorum ki? ne gerek var server a bosuna istek atmaya? bu set islemini AddTutorial.jsx de cagiralim. simdi satiri koplayip, AddTutorial.jsx e gidelim...  bu satiri const postTutorial icinde cagirabilirz.

//! ONEMLI BILGI !!! Gunccellemeyi her zaman backend den almak daha iyidir.
