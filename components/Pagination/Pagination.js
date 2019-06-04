import React from 'react';
import ReactPaginate from "react-paginate";

function Pagination(props) {
    const pageCount = Math.ceil(props.count / 10);
    return (
        <React.Fragment>
            <ReactPaginate
                pageCount={pageCount}
                containerClassName={'paginator'}
                pageClassName={'page'}
                previousLabel={'‹'}
                nextLabel={'›'}
                forcePage={props.forcePage}
                onPageChange={props.onPageChange}
            />
        </React.Fragment>
    );
}

export default Pagination;