import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import EditTutorial from "./EditTutorial";
import { useState } from "react";

// const TutorialList = ({ tutorials }) => {
const TutorialList = ({ tutorials, getTutorials }) => {
  //! 2
  //! 5
  const [editItem, setEditItem] = useState("");
  console.log(editItem);
  const BASE_URL = "https://tutorial-api.fullstack.clarusway.com/tutorials/";
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}${id}/`);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };
  //! 4
  // const editTutor = async (id, title, description) => {
  //! 6
  // const editTutor = async (tutor) => {
  //   try {
  //     await axios.put(`${BASE_URL}${tutor.id}/`, tutor);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   getTutorials();
  // };
  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-center">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {tutorials?.map((item) => {
            const { id, title, description } = item;
            return (
              <tr key={id}>
                <th>{id}</th>
                <td>{title}</td>
                <td>{description}</td>
                <td className="text-center text-nowrap">
                  <FaEdit
                    size={20}
                    type="button"
                    className="me-2 text-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#open-modal"
                    // onClick={() =>
                    //   editTutor({
                    //     id: 1924,
                    //     title: "VUE",
                    //     description: "VUE är viktigt.",
                    //   })
                    // }
                    //! 5
                    onClick={() => setEditItem(item)}
                  />
                  {/* //! 1 */}
                  <AiFillDelete
                    size={22}
                    type="button"
                    className="text-danger "
                    onClick={() => handleDelete(id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditTutorial editItem={editItem} getTutorials={getTutorials} />
    </div>
  );
};
//! 3
export default TutorialList;

// ! burdaki map isleminde key yazmamkzin sebebi, react her veriyi basarken unique lestirmek iser ve her veriye id verir. 1. maddeye hemen gecme!

//! 1 - AddTutorial.jsx de getTutorials() ilsleminden sonra buraya geliriz ve silme islemini yapariz. OnClick Event imizi yazariz. onClick={() => handleDelete(id)}. tabi bunun icin id ye ihtiyacimiz var.

//! 2 - const handleDelete degiskenini yazalim. BASE_URL yi yapistiralim  ekleyelim. axios.delete islemi yapilacak ve backtick ile ${} id nin degiskem oldugunu bilmeliyiz; await axios.delete(`${BASE_URL}${id}/`); BASE_URL kismi ve /id/ olmasina dikkat edelim. id iki slash arasi olacak. silme islemi oluyor ama guncellenmiyor. sayfayi kendimiz manuel refresh yaparsak siliniyor. NAPALIM? bunun icin tutorial list i guncellememiz lazim. tabi bu fonksiyonun bize, Home.jsx den prop olarak gelmesi gerekir. 3. maddeye gecme!!!

// ! 3 - editleme islemi TutorialList.jsx de olucak. bunun icin comp- yapalim. EditTutorial.jsx, ve bu comp a gidelim... 4 e hemen gecme!!

// ! 4 - modal a tiklanildiginda satirdaki desc ve title bilgisinin modal a gelmesini istiyoruz. mesela editleme butonu <FaEdit/>. eger OnClick ile buna guncelleme yapsak nasil olur. <FaEdit/> icinde  onClick={()=>{  editTutor()}} cagirsak nasil olur. simdi const editTutor ... yazalim. ve burada put islemi yapacagiz. eger put islemi yapacaksak, url sonuna id koymamiz lazim. `{${BASE_URL}${id}/}` yazdiktan snra virgul atip hemen guncellemek istedigimiz veriyi yazariz. const editTutor = async (id, title, description) => {....} yazmak yerine  const editTutor = async (tutor) => { try { await axios.put(`${BASE_URL}${tutor.id}/`, tutor) biciminde yazdik. tutor icinde, id description, title var. id ye ulasirken tutor.id diye ulacagiz. getTutorials() ile guncellenme yapilmali.

//! 5 - Az once EditTutorial.jsx de editleme islemini konusuo buraya geldik. editleme islemi icin bir state olustursam nasil olur? ama hangi satira tikladi isem o satirn title li ve description u nu modal da vericek. Benim once veriyi yakalama lazim!!!!!!. ve bu kisimlar; data-bs-toggle="modal" ve data-bs-target="#open-modal" modal i acamak icin gorevli buton kisimlari, basildiginda modal aciliyor. bu verileri gonderme isini props lar la yapabilirm. bunun icin bir state acalim; const [editItem, setEditItem] = useState("").

//! 5.1 -  FaEdit kismini yoruma aliriz. bir da onClick yazariz.  const { id, title, description } = item burada bize item lazim, cunku item degiskeni id,title ve discription iceriyor. o halde onClick={() => setEditItem(item)} yazariz. sonra editItem={editItem} propu olarak EditTutorial.jsx e gonderelim. 6 ya gecme

//! 6 - put islemi icin EditTutorial dan buraya geldik ve const editTutor u kopyala ve yoruma al ve EditTutorial.jsx e geri dön... 7 ye gecme

// ! 7 - editTutorial.jsx den geldik. getTutorials() i ekledik; <EditTutorial editItem={editItem} getTutorials={getTutorials} />
