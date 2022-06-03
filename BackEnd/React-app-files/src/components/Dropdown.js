import React from 'react'
import Searchable from 'react-searchable-dropdown';

export const Dropdown = () => {
    return (
        <>
            {/* <Searchable
                value=""
                placeholder="Search" // by default "Search"
                notFoundText="No result found" // by default "No result found"
                noInput
                options={[{
                    value: '',
                    label: 'All'
                }, {
                    value: 'popular',
                    label: 'Popular',
                }]}
                onSelect={value => {
                    console.log(value);
                }}
                listMaxHeight={200} //by default 140
            /> */}

            <Searchable
                color="white"
                hideSelected
                options={[{
                    value: 'all',
                    label: 'all'
                }, {
                    value: 'popular',
                    label: 'Popular',
                }, {
                    value: 'male',
                    label: 'male',
                }, {
                    value: 'femlae',
                    label: 'female',
                }, {
                    value: 'others',
                    label: 'others',
                }]}
                onSelect={value => {
                    console.log(value);
                }}
                listMaxHeight={200}
            />
        </>
    )
}
