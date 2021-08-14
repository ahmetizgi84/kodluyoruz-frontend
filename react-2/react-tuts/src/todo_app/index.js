import React from "react";
import Filter from "./components/Filter";
import List from "./components/List";
import "./style.css";

function App() {
  const [value, setValue] = React.useState("");
  const [isNotDoneListLength, setIsNotDoneListLength] = React.useState(0);
  const [list, setList] = React.useState([
    {
      isDone: false,
      title: "Tamamlanmamış",
    },
    {
      isDone: true,
      title: "Tamamlanmış",
    },
    {
      isDone: false,
      title: "Ekmek alınacak",
    },
    {
      isDone: false,
      title: "Talı yapılacak",
    },
    {
      isDone: true,
      title: "Süt ısıtılacak",
    },
  ]);
  const [yedekList, setYedekList] = React.useState([...list]);

  React.useEffect(() => {
    const isNotDoneList = list.filter((item) => item.isDone === false);
    setIsNotDoneListLength(isNotDoneList.length);
  }, [list]);

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      let tempObj = {
        isDone: false,
        title: value,
      };
      setList([...list, tempObj]);
      setYedekList([...list, tempObj]);
      setValue("");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const statusHandler = (index) => {
    let tempArray = [...list];
    const found = tempArray.find((_, i) => i === index);
    found.isDone = !found.isDone;
    setList(tempArray);
    setYedekList(tempArray);
  };

  const deleteListItemHandler = (index) => {
    const filtered = list.filter((_, i) => i !== index);
    setList(filtered);
    setYedekList(filtered);
  };

  const filterBtnsHandler = (type) => {
    if (type === "active") {
      const actives = yedekList.filter((item) => item.isDone === true);
      setList(actives);
    } else if (type === "done") {
      const dones = yedekList.filter((item) => item.isDone === false);
      setList(dones);
    } else {
      setList(yedekList);
    }
  };

  return (
    <div className="todoAppContainer">
      <header className="mb-4">
        <center>
          <h2>Todo App</h2>
        </center>
      </header>

      <section>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="something"
            onChange={handleChange}
            onKeyPress={handleKeypress}
            value={value}
          />
          <label htmlFor="floatingInput">Yapılacak bir şey yaz...</label>
        </div>
      </section>

      <section>
        <Filter isNotDoneListLength={isNotDoneListLength} filterBtns={filterBtnsHandler} />
      </section>

      <section>
        <List list={list} changeStatus={statusHandler} deleteListItem={deleteListItemHandler} />
      </section>
    </div>
  );
}

export default App;
