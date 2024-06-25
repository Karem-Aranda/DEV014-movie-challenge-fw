import "../styles/Pagination.scss";
import React from "react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onSelectPage: (page: number) => void;
}

const Pagination: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onSelectPage,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onSelectPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onSelectPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pagesToShow = 20; // Número de casillas a mostrar
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = startPage + pagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onSelectPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
    </div>
  );
};

export default Pagination;
