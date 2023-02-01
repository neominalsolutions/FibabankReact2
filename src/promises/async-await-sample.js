const promise1 = Promise.resolve(3); // userlist
const promise2 = Promise.reject("Error"); // user comment
const promise3 = new Promise((resolve, reject) => {
  // user likes
  setTimeout(resolve, 100, "foo");
});

// ECMAScrıpt 7.0 ile hayatımıza girdik.
// sıralı asenkron işlemlerimiz varsa bu durumda async await yapısını kullanarak işleri uyutup senkronlaştırabiliriz.
const invoke = async () => {
  try {
    // sequence işlem
    // birbirlerinin sonucunda göre bir iş yapacaklar.
    var response1 = await promise1; // bu resolve olmadan bir sonraki adıma geçme garantisi aldık.
    var response2 = await promise2;
    var response3 = await promise3;
    // çalışması beklenen resolve olması beklenen kod blokları
  } catch (err) {
    // herhangi bir reject durumda girilen scope
    // try catch bloğu içerisine sarılan kodlar bir hata durumunda aynen promise.all gibi davranır.
    console.log("err", err);
  } finally {
    console.log("bitti");
  }

  console.log(
    "response1",
    response1,
    "response2",
    response2,
    "response3",
    response3
  );
};

invoke();
