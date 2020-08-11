import React from 'react';

const docFilters = props => {
    return (
        <div className="container" style={{backgroundColor: "white"}}>
            <h5 style={{padding: "10px"}}>Best Dermatologists/ Skin Specialists In Pakistan</h5>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <button className="btn btn-lg border border-info">
                            Available Today
                        </button>
                    </li>
                    <li className="list-inline-item">
                        <button className="btn btn-lg border border-info">
                            Most Booked
                        </button>
                    </li>
                    <li className="list-inline-item">
                        <button className="btn btn-lg border border-info">
                            Top Reviewed
                        </button>
                    </li>
                    <li className="list-inline-item">
                        <button className="btn btn-lg border border-info">
                            Near Me
                        </button>
                    </li>
                    <li className="list-inline-item">
                        <button className="btn btn-lg border border-info">
                            More Filters
                        </button>
                    </li>
                </ul>
        </div>
    )
}

export default docFilters;