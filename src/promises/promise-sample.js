// EcmaScript 6.0

const promise1 = Promise.resolve(3); // userlist
const promise2 = Promise.reject("error"); // user comment
const promise3 = new Promise((resolve, reject) => {
  // user likes
  setTimeout(resolve, 100, "foo");
});

const interval = setInterval(100, () => {
  console.log("timer");
});

// promise tetiklenmesi için then ve catch ile call edilmesi.
// promise chain yapısında ise işlem nerede kesintiye uğrarsa zincirin altındaki kod bloğuna girilmeden işlem kesiliyor
promise1
  .then((data) => {
    console.log("promise 1 data", data);
    return promise2;
  })
  .then((data) => {
    console.log("promise 2 data", data);
    return promise3;
  })
  .then((response) => {
    console.log("promise 3 data", response);
  })
  .catch((err) => {
    console.log("err", err);
  })
  .finally(() => {
    console.log("bitti");
    // interval değerlerini clear edebiliriz.
    clearInterval(interval);
    // her ihtimale karşı çalışan kısım
    // catch de olsa then de olsa burası çalışır
  });

// resolve olması durumunda hepsi çözümlenmesi lazım
// reject durumda ise reject hatası verip işlem kesiliyor.
Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log("promise error", err);
  });
// Expected output: Array [3, 42, "foo"]
