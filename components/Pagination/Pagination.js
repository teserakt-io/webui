//@flow
import React from 'react';
import ReactPaginate from "react-paginate";

type Props = {
    count: number,
    forcePage?: number,
    onPageChange: Function,
    onPage?: number,
};

function Pagination(props: Props) {
    const pageCount = Math.ceil(props.count / (props.onPage || 10));
    return (
        <React.Fragment>
            <ReactPaginate
                pageCount={pageCount}
                containerClassName={'paginator ' + props.className}
                pageClassName={'page'}
                previousLabel={'‹'}
                nextLabel={'›'}
                forcePage={props.forcePage}
                onPageChange={props.onPageChange}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
            />
        </React.Fragment>
    );
}

export default Pagination;