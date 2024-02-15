import Home from "./pages/Home";

function App() {
  return <Home />;
}

export default App;

// ! - GET `tutorials/:id/` get Tutorial by id, buradaki : iki nokta ust uste demek, bu bir degiskendir. Bu arada bu app da id otomatik olarka backend en olusturuluyor. bu app in backend i django ile yazildigi icin url nin sonuna "/" koymayi unutma.
// ! getTutorial bilgisi bize hem AddTuto.js de ve TutoList.js de lazim olacak.
// ! editleme islemi icin getbootstrar.com dan modal comp cekelim; https://getbootstrap.com/docs/5.3/getting-started/introduction/  fakat bunu html de JSX e cevirmeliyiz. compiler lazim
// ! HTML to JSX Compiler yapmak icin bu siteye gideriz: https://magic.reactjs.net/htmltojsx.htm
// ! ONEMLI TAVSIYE;  mumkun mertebe App.js yi temiz tutmak lazim.
