## Reactjs - ders 1

### React neden ve ne için kullanmalıyız yada kullanmamalıyız?

Bu soruya kısaca cevap vermek gerekirse şöyle söylenebilir.
DOM manipülasyonunun çok sık yapıldığı web uygulamalarında react kullanmak mantıklıdır.
React kullanmadan yapılan uygulamalarda bir değişikliğin ekrana yansıması için bütün DOM’un yeniden render edilmesi gerekir.
Kullanıcıyı bilgilendirmek amacıyla yapılan bu değişiklikler çok sık gerçekleşiyorsa, tüm DOM’un her defasında yeniden render edilmesi çok masraflı olacaktır.
İşte tam bu noktada react kullanarak tüm DOM’un yeniden render edilmesi yerine ilgili UI komponentini render ederiz. Bu da diğer yaklaşıma göre performansı çok daha fazla artırır.
DOM'un sürekli bir değişikliğe maruz kalmadığı uygulamalarda React kullanmamıza gerek yoktur. Ancak istenirse yine bu tür uygulamalar React ile de yapılabilir.

### Callback fonksiyonlar ve async-await yapısı

Belli bir durum gerçekleştikten sonra çağırılan yada çalıştırılan fonksiyonlara callback fonksiyonlar diyoruz.
React’de native olarak callback fn alan yapılar bulunuyor. Bunlardan en bilineni `setTimeout` fonksiyounudur.

```js
    setTimeout(() => {
        console.log(“Merhaba Dünya”);
    }, 1500)
```

1500 milisaniye sonra callback fonksiyonu çağırılır. Ekrana `Merhaba Dünya` yazılır.

React ile yapılan bazı işlemler özellikle api istekleri, asenkron işlemlerdir. Asenkron işlemlerden hangisinin önce bitip sonuç vereceğini bilmek mümkün değildir.
Asenkron işlemlerin belirli bir sıraya göre yapılmasını istersek `async-await` yapısını kullanmalıyız.

```js
fetch("www.myendpoint1.com")
  .then((res) => res.json())
  .then((data) => {
    fetch("www.myendpoint2.com")
      .then((res) => res.json())
      .then((data) => {
        fetch("www.myendpoint3.com")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      });
  });
```

Yukarıdaki fetch api örneğinde `then` yapısı kulanılarak asenkron işlemlerin sırayla yapılması sağlanabilir.
Her ne kadar bu işimizi görse de, kodların okunması açısından pek uygun bir yazım sayılmaz. Bunu yerine async-await yapısını kullanabiliriz.

```js
async function getData() {
  const response1 = await fetch("www.myendpoint1.com").json();
  const response2 = await fetch("www.myendpoint1.com").json();
  const response3 = await fetch("www.myendpoint1.com").json();

  console.log(response3);
}

getData();
```

### Promise

`then` yapısını `fetch` api ile kullanabiliriz. Çünkü fetch işlemi bir `promise` döndürecektir. Peki biz then yapısını kendi kurguladığımız durumlarda kullanamaz mıyız? Cevap evet kullanabiliriz. Bunun için yeni bir promise yapısı oluşturmalıyız.
Promise yapısı parametre olarak bir callback fonksiyonu alır. Bu fonksiyon da `resolve` ve `reject` adında iki parametre döner. Esasen Promise gerçekleştiğinde resolve çalıştırılarak `then` yapısının çalışması, herhangi bir hata sonucu promise yapısı çalışmazsa reject çalıştırılarak `catch` yapısının çalıştırılması sağlanır.

```js
const getComments = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

getComments()
  .then(() => console.log("tamamlandı"))
  .catch((e) => console.log("Hata oluştu", e));
```

```js
const getComments = () => {
  return new Promise((resolve, reject) => {
    resolve("api response can pass as an argument here");
  });
};

getComments()
  .then((response) => console.log("Promise resolve cevabı: ", response))
  .catch((e) => console.log("Hata oluştu", e));
```

```js
const getUsers = () => {
  return new Promise(async (resolve, reject) => {
    const { data } = await axios("www.endpoint.com/users");
    resolve(data);
  });
};

getComments()
  .then((data) => console.log(data))
  .catch((e) => console.log("Hata oluştu", e));
```

- Promise'lerin sıralı gelmesini istiyorsak yine aşağıdaki gibi async-await yapısını kullanabiliriz.

```js
(async () => {
  try {
    const users = await getUsers();
    const post = await getPost(1);

    console.log(users);
    console.log(post);
  } catch (e) {
    console.log(e);
  }
})();
```

```js
(async () => {
  await getUsers()
    .then((data) => console.log(data))
    .catch((e) => console.log("Hata oluştu", e));

  await getPost(1)
    .then((data) => console.log(data))
    .catch((e) => console.log("Hata oluştu", e));
})();
```

- Tüm Promisleri aynı anda çalıştırabildiğimiz Promise.all yapısını da kullanabiliriz.

```js
Promise.all([getUsers(), getPost(1)])
  .then(console.log)
  .catch(console.log);
```

### Array Fonksiyonları

En çok kullanılan array fonksiyonları:

- push
- map
- find
- filter
- some
- every
- includes

`push` bir dizinin sonuna belirtilen elemanı ekler

```js
const users = ["ahmet", "mehmet", "murat"];

users.push("ayşe");
console.log(users); // ['ahmet', 'mehmet', 'murat', 'ayşe']
```

`map` fonksiyonu tıpkı for döngüsü gibi dizideki elemanın her biri için çalışır

```js
const users = ["ahmet", "mehmet", "murat"];

users.map((item) => {
  console.log(item); // ['ahmet', 'mehmet', 'murat']
});
```

`find` ilgili dizideki belirtilen elemanı bulup getirir

```js
const users = ["ahmet", "mehmet", "murat"];

const user = users.find((item) => item.name === "ahmet");
console.log(user); // ahmet
```

Not: find fonksiyonu name alanı ahmet olan datayı bulup getirecek. Şayet name alanı ahmet olan birden fazla data varsa
ilk sıradaki ahmet bilgisini alıp getirir. Sonrakileri getirmeyecektir. Tüm ahmet alanlarının getirilmesini istersek o zaman
find yerine `filter` fonksiyonunu kullanmalıyız. find fonksiyonu obje dönerken, filter bir array döner

```js
const users = [
  {
    name: "ahmet",
    age: 36,
  },
  {
    name: "murat",
    age: 35,
  },
  {
    name: "ahmet",
    age: 42,
  },
  {
    name: "ayşe",
    age: 23,
  },
];

const filtered = users.filter((item) => item.name == "ahmet");
console.log(filtered); // [{name: 'ahmet', age: 36}, {name: 'ahmet', age: 42}]
```

`some` arrayin elemanlarından herhangi biri verilen koşula uyuyorsa true, uymuyorsa false döner.

```js
const users = [
  {
    name: "ahmet",
    age: 36,
  },
  {
    name: "murat",
    age: 35,
  },
  {
    name: "ahmet",
    age: 42,
  },
  {
    name: "ayşe",
    age: 23,
  },
];

const some = users.some((item) => item.age == 35);
console.log(some); // true
```

`every` some fonksiyonundan farklı olarak bu kez dizinin tüm elemanlarının verilen şarta uyup uymadığını kontrol eder.
Sonuca göre true yada false döndürür.

```js
const users = [
  {
    name: "ahmet",
    age: 36,
  },
  {
    name: "murat",
    age: 35,
  },
  {
    name: "ahmet",
    age: 42,
  },
  {
    name: "ayşe",
    age: 23,
  },
];

const every = users.every((item) => item.age > 5);
console.log(every); // true
```

`includes` verilen elemanın array içinde olup olmadığını kontrol eder.

```js
const users = ["elma", "armut", "muz"];

const isIncluded = users.includes("muz");
console.log(isIncluded); // true
```
