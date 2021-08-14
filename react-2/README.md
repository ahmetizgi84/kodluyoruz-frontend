## create-react-app

### Komponentler

- Komponent oluştururken bilhassa oluşturulmuş herhangi bir komponenti kullanmak istediğimiz yerde import ederken, büyük harfle başlamasına dikkat etmeliyiz.
  Bunun nedeni söz konusu komponent isminin html tarafında bir karşılığı olabilir. Dolayısıyla küçük harfle yazılan komponent react tarafından algılanmayacak
  html tarafından gelen bir etiket olarak algılanacaktır. Bu yüzden komponentlerin büyük harfle başlamasında yarar var.

* Koşullu render işlemi

```js
const isLoggedIn = true;

function App() {
  return <div>{isLoggedIn ? <h3>Logged In</h3> : <h4>Giriş yap</h4>}</div>;
}
```

### Proplar -

### PropTypes

Komponentlere gönderilen property'lerin tiplerini belirlemeye yarayan araçtır. Proptype içinde belirlenen tiplerin haricinde bir veri tipi göndermeye kalktığımızda development zamanında hata ile karşılaşırız.

```js
import PropTypes from 'prop-types'

function User({firstName, lastName, age, isLoggedIn}){
    return (
        ...
        ...
        ...
    )
}

User.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.age,
    isLoggedIn: PropTypes.bool
}

export default User


```

- PropTypes belirtilirken `isRequired` ile zorunlu alanlar da belirtebiliriz.

```js
User.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  age: PropTypes.age,
  isLoggedIn: PropTypes.bool,
};
```

- Prop ile birden fazla türde veri tipi gönderme ihtimali varsa `oneOfType` kullanırız.

```js
import PropTypes from 'prop-types'

function User({firstName, lastName, age, isLoggedIn}){
    return (
        ...
        ...
        ...
    )
}

User.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isLoggedIn: PropTypes.bool
}

export default User

.
.
.

<User
    age={36} // veya age="36" // Hem string hem de number gönderilebilir.
/>


```

- `shape` kullanımı: prop olarak bir object geçiliyorsa prop olarak gelen objenin nasıl bir yapıya sahip olması gerekitiği tanımlanır.

```js
User.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isLoggedIn: PropTypes.bool
    address: PropTypes.shape({
        title: PropTypes.string,
        zipCode: PropTypes.number
    })
}

export default User

.
.
.

<User
    age={36} // veya age="36" // Hem string hem de number gönderilebilir.
    address= {{
        title: 'Adana',
        zipCode: 01100
    }}
/>


```

- Eğer bir prop komponente gönderilmemişse, o komponentin o prop için değerini varsayılan olarak belirleyebiliriz.
  Bunu da `defaultProps` ile yapıyoruz.

```js
User.defaultProps = {
  isLoggedIn: false,
};
```

## State'ler

- Herhangi bir verinin değişme ihtimali var ve bu değişimden son kullanıcı haberdar edilmek istenirse bu veri state'ler de tutulur.
- Array state'ler, dizi olarak tutulan state'e ekleme yapmak istediğimizde spread operatörünü kullanarak dizinin sonuna veya başına ekleme işlemi yapabiliriz.

```js
const [friends, setFriends] = useState(["Levent", "Murat"]);

setFriends([...friends, "Ayşe"]);
```

- Object state'ler, object state'lerde de ekleme, güncelleme işlemi spread operatörü kullanılarak yapılır.

```js
const [address, setAddress] = useState({ title: "Adana", zip: 01110 });

setFriends({ ...address, zip: 01200 }); // title korunur, zip güncellenir.
```

- Form işlemleri

```js
const [form, setForm] = useState({name: "", surname: ""})

const onChangeInput = (e) => {
    setForm({...form, [e.target.name]: e.trget.value})
}


<input name="name" value={form.name} onChange={onChangeInput}>
<input name="surname" value={form.surname} onChange={onChangeInput}>
```

- Bir komponent unmount edildiğinde eğer o komponentin state'i unmount edilmesine rağmen hala değiştirilmeye çalışılırsa memory leak hatası alırız. Unmount edilen komponentin state'inin değiştirelemeyeceği çok açıktır. Bu hatanın önüne geçmek için ilgili komponentin state'ini güncelleştiren subscriptionların cleanup fonksiyonu ile temizlenmesi gerekir. Bu da komponent kaldırıldıktan sonra yakalancak olan event sayesinde yapılır.

```js
const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  return () => clearInterval(interval); // clean up fonksiyonu ile subscription kaldırılıyor
}, []);
```

- Filtreleme

```js
const [filteredText, setFilteredText] = useState("");

const filtered = contacts.filter((item) => {
  return Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(fiteredText.toLowerCase()));
});

{
  filtered.map((contact) => <div>{contact.fullname}</div>);
}
```
