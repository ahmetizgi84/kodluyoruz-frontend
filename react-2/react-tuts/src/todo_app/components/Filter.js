import React from "react";

function Filter({ isNotDoneListLength, filterBtns }) {
  return (
    <div className="filterContainer my-3">
      {/* item count */}
      <p className="fst-italic mb-0">{isNotDoneListLength} iş kaldı.</p>
      {/* Buttons */}
      <div className="btn-group" role="group" aria-label="...">
        <button type="button" className="btn btn-outline-dark" onClick={() => filterBtns("all")}>
          Tümü
        </button>
        <button type="button" className="btn btn-outline-dark" onClick={() => filterBtns("done")}>
          Aktif
        </button>
        <button type="button" className="btn btn-outline-dark" onClick={() => filterBtns("active")}>
          Tamamlanmış
        </button>
      </div>
      {/* Clear completed */}
      {/* <div>
        <button type="button" className="btn btn-outline-dark">
          Tamamlananı Kaldır
        </button>
      </div> */}
    </div>
  );
}

export default Filter;
