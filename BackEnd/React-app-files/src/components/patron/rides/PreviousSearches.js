import React from 'react'

export const PreviousSearches = ({ searches, setStartLocation, setEndLocation }) => {
    const setStartEnd = () => {
        setStartLocation(searches.start)
        setEndLocation(searches.end)
    }
    return (
        <>
            <button className='previous-searches' onClick={setStartEnd}>
                {searches.start}<i className='fa fa-arrow-right pl-2 pr-2'></i>{searches.end}
            </button>
        </>
    )
}
