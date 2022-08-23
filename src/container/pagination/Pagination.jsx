import React from "react";

const Pagination = ({ pager, setPageNo }) => {
  if (pager.pages && pager.pages.length && pager.totalPages > 1) {
    return (
      <div className="flex flex-wrap mx-auto my-8">
        <button
          className="py-3 px-5 bg-white border border-gray-300"
          onClick={() => setPageNo(1)}
          disabled={pager.currentPage === 1}
        >
          first
        </button>
        <button
          className="py-3 px-5 bg-white border border-gray-300"
          onClick={() => setPageNo(pager.currentPage - 1)}
          disabled={pager.currentPage === 1}
        >
          prev
        </button>
        {pager.pages.map((page) => (
          <button
            key={page}
            className={`py-3 px-5 bg-white border ${
              pager.currentPage === page
                ? "border-bluish bg-gray-400"
                : "border-gray-300"
            }`}
            onClick={() => setPageNo(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="py-3 px-5 bg-white border border-gray-300"
          onClick={() => setPageNo(pager.currentPage + 1)}
          disabled={pager.currentPage === pager.totalPages}
        >
          next
        </button>
        <button
          className="py-3 px-5 bg-white border border-gray-300"
          onClick={() => setPageNo(pager.totalPages)}
          disabled={pager.currentPage === pager.totalPages}
        >
          last
        </button>
      </div>
    );
  }
};

export default Pagination;
