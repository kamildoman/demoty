import React from "react";

function Pagination(props){
    const pageNumbers = []
    for (let i=1; i<=Math.ceil(props.totalPosts / props.postsPerPage); i++){
        pageNumbers.push(i)
    }

    return (<div>
        <ul className="pagination">
            {pageNumbers.map((number) =>(
                <li key={number} className="page-item">
                    <div onClick={() => {
                        props.paginate(number)
                        window.scrollTo({
                        top: (0, 0),
                        left: 0,
                        behavior: 'smooth'
                        });
                    }}  className="page-link">
                        {number}
                    </div>
                </li>
            ))}

        </ul>
        </div>)

}

export default Pagination