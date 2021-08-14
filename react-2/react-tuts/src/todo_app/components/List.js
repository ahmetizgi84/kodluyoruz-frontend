import React from "react";

function List({ list, changeStatus, deleteListItem }) {
  if (list.length <= 0) {
    return <div className="noItem">Yapılacak iş yok!</div>;
  }

  return (
    <ul className="list-group">
      {list.map((listItem, i) => (
        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <input
              className="form-check-input me-1"
              type="checkbox"
              value=""
              checked={listItem.isDone ? true : false}
              onChange={() => changeStatus(i)}
            />
            <span id="list-input" className={listItem.isDone ? "text-decoration-line-through" : undefined}>
              {listItem.title}
            </span>
          </span>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => deleteListItem(i)}></button>
        </li>
      ))}
    </ul>
  );
}

export default List;
