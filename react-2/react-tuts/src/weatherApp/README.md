## react-router-dom

- Aşağıdaki gibi oluşturulan route yapısında hangi sayfada olursak olalım `/` şartı sağlandığı için her zaman `Home` komponenti
  render edilecektir. Diğer sayfaları görmemiz mümkün olmayacaktır. Bu sorunun önüne geçmek için ya `<Route path="/" component={Home} />` satırını
  en alta alırız ya da bu satıra `exact` özelliğini ekleriz.

```js
<Switch>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>
```

## URL Parametreleri

```js
<Switch>
  <Route path="/:id" children={<Home />} />
</Switch>
```

```js
function Home() {
  let { id } = useParams();
}
```

## Nested Routing

## Link ve NavLink arasındaki fark

Navlink stilize edilebiliyor

## Var olmayan sayfa hatası - 404 sayfası

`*` ile var olmayan path leri karşılayıp Error404 komponentini ekrana basıyoruz.

```js
<Navlink to="*" component={Error404} />
```

## Formik Kullanımı

Formlarda bulunan fazla sayıda inputların girişlerini kontrol etmemize yarayan hazır bir kütüphanedir.

## Formik ile form validation işlemleri

`npm install formik` : state'leri kullanmadan hızlı bir şekilde form oluşturmamızı ve yönetmemizi sağlıyor
`npm install yup` : inputlar için validation işlemlerini kontrol ediyor.

```js
import { Formik, Field, Form } from 'formik';

import validationSchema from './validations'

const SignUp = () => (

  const {handleSubmit, handleChange, handleBlur, values, errors, touched} = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     onSubmit: values => {
       console.log(values)
     },
     validationSchema,
   });

  <div>
    <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
        {errors.firstName && touched.firstName && <div className="errors">{error.firstName}</div>}

        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
        {errors.lastName && touched.lastName && <div className="errors">{error.lastName}</div>}

        <label htmlFor="email">Email</label>
        <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
        {errors.email && touched.email && <div className="errors">{error.email}</div>}

        <button type="submit">Submit</button>
      </form>
  </div>
);

```

```js
import * as yup from "yup";

const validations = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email("Geçerli bir eposta adresi girin").required("Zorunlu alan"),

  //password: yup.string().min(5, 'Parolanız en az 5 karakter olmalıdır').required("Zorunlu alan")
});

export default validations;
```

## Memoization

- React.memo
- useMemo
- useCallback

Gereksiz re-render işlemlerinin önüne geçmek için memoization işlemlerini kullanırız.
Aşağıdaki senaryoda gereksiz re-render olan bir komponent gösterilmiştir.

Bilindiği üzere bir komponentin state'i değiştiğinde o komponent re-render edilir.
Aşağıdaki örnekte butona tıklandığında state bir artırılıp yeniden set ediliyor. Yani state değişiyor
Bu yüzden App komponenti re-render edilir. Header komponenti de re-render edilecektir. Çünkü re-render edilen App
komponentinin child'i konumundadır. Burada Header komponentinin re-render edilmesi gereksizdir.
İşte bu gereksiz re-render sorununu ortadan kaldırmamız gerekir.

```js
import Header from "./components/Header";

function App() {
  const [number, setNumber] = useState(0);
  return (
    <div>
      <Header />

      <hr />

      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>Artır</button>
    </div>
  );
}
```

```js
function Header() {
  return <div>Header</div>;
}
export default Header;
```

1. React.memo ile gereksiz re-render'ın önüne geçmek

```js
function Header() {
  return <div>Header</div>;
}
export default React.memo(Header);
```

2. useMemo() hook'unun kullanımı
   `const data = { name: 'Ahmet' }` objesi prop olarak Header komponentine geçiriliyor. App komponenti her defasında
   re-render olduğunda data sabitinin bellekteki referansı değişecektir. Referans her defasında değişeceğinden React.memo bu değişikliği bir fark olarak algılayacak ve
   Header komponentinin her defasında re-render olmasına izin verecektir. Bu sorunu çözmek için useMemo hook'unu kullanabiliriz.

Başka bir senaryo: Aşağıda tanımlanmış bir inputun içeriği her değiştiğinde onChange probu tetikleniyor ve setText fonksiyonu çalışarak
state değişiyor. state her değiştiğinde App komponenti re-render olacağından `const data2 = calculateObject()` fonksiyonu her re-render
işleminde çalışacaktır. Bu fonksiyon zaman alan, ağır bir fn olduğu için inputta yaptığımız değişiklikler anlık yansımayacaktır. Bu sorunu çözmek için `useMemo` hook'unu kullanırız.

```js
const data = useMemo(() => {
  return calculateObject();
}, []);
```

```js
import Header from "./components/Header";

function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");

  const data = useMemo(() => {
    return { name: "Ahmet" };
  }, []);

  const data2 = calculateObject();

  function calculateObject() {
    console.log("hesaplama başladı...");
    for (let i = 0; i < 100000000; i++) {}
    console.log("hesaplama bitti.");

    return { name: "Ahmet" };
  }

  return (
    <div>
      <Header data={data} />

      <hr />

      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>Artır</button>

      <input value={text} onChange={({ target }) => setText(target.value)} />
    </div>
  );
}
```

3. useCallback() hook'u kullanımı

```js
const increment = () => setNumber(number + 1);
```

Yukardaki şekilde kullanımda komponent her defasında render edildiğinde fonksiyon yeniden oluşturulacak ve bellekteki referansı
değiştiği için re-render sorunu oluşacaktır

Aşağıdaki kullanımda ise dependency array içine useCallback hook'u içinde `number` state'ini kullandığımız için number state'ini yazmak durumundayız. Bu durumda number state'i
her değiştiğinde Header komponenti de re-render olacaktır. Gereksiz re-render sorunu hala devam ediyor.

```js
const increment = useCallback(() => {
  setNumber(number + 1);
}, [number]);
```

Sorunu dependency array içini boş bırakarak çözebilir. Bunu da aşağıdaki gibi yapabiliriz.

```js
const increment = useCallback(() => {
  setNumber((prevState) => prevState + 1);
}, []);
```

```js
import Header from "./components/Header";

function App() {
  const [number, setNumber] = useState(0);

  const increment = useCallback(() => {
    setNumber((prevState) => prevState + 1);
  }, []);

  return (
    <div>
      <Header increment={increment} />

      <hr />

      <h1>{number}</h1>
    </div>
  );
}
```

```js
function Header({ increment }) {
  return (
    <div>
      Header
      <button onClick={increment}>Artır</button>
    </div>
  );
}
export default React.memo(Header);
```

## Context API ile global state yönetimi

State'lerin global olarak oluşturulmasını sağlayarak istediğimiz komponentden bu state'lere ulaşmaya ve manipüle etmeye yarayan yapıdır diyebiliriz.
Elimizdeki senaryoya göre uygulamamızın karanlık ve aydınlık modu olacağını düşünelim. Bu durumda ilgili state `dark` veya `light` adında bir string tutmalıdır.
Ayrıca gerekli komponentlerden bu state'e ulaşılmalı ki, state'in dark veya light olma durumuna göre gerekli manipülasyon yapılabilsin. Aşağıda senaryoya uygun kod bloğu
en temel haliyle yer almaktadır

```js
//ThemeContext.js

import { createContext } from "react";

const ThemeContext = createContext();

export default ThemeContext;
```

```js
//App.js

import ThemeContext from "./context/ThemeContext";
import Button from "./components/Button";

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
  );
}

export default App;
```

```js
//Button.js

import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

function Button() {
  const theme = useContext(ThemeContext);
  return <div>theme: {theme}</div>;
}

export default Button;
```

- Yukarıdaki örnek en temel haliyle bir Context yapısını göstermektedir. Daha temiz bir yapı elbette kurulabilir.

```js
//ThemeContext.js

import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const values = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
```

```js
//App.js

import { ThemeProvider } from "./context/ThemeContext";
import Button from "./components/Button";

function App() {
  return (
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  );
}

export default App;
```

```js
//Button.js

import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div>
      theme: {theme}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Change Theme</button>
    </div>
  );
}

export default Button;
```

## Custom Context Hook

```js
//ThemeContext.js

import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const values = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
```

```js
//Button.js

import { useTheme } from "../context/ThemeContext";

function Button() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      theme: {theme}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Change Theme</button>
    </div>
  );
}

export default Button;
```
