import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons"; // for customizing icons
import './style.pagination.scss';


const Pagination = (props) => {

  // eslint-disable-next-line react/prop-types
  const { pageSize, totalPages, handlePageClick } = props;

  return (
    <div className="page-container">
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageSize}
        pageCount={totalPages}
        breakLabel="..."
        previousLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Pagination;