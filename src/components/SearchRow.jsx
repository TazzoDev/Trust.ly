import Select from 'react-dropdown-select';
import { AngleDownIcon } from '../assets/icons';
import {  useState } from 'react';



export default function SearchRow({onFilterChange}){

    const categoryOptions = [
        {id: 1,category: 'home painting'},
        {id: 2, category: 'caretaker'}
    ]

    const priceOptions = [
        {id: 1, price: '10', label: '$10'},
        {id: 2, price: '20', label: '$20'},
        {id: 3, price: '50', label: '$50'},
        {id: 4, price: '100', label: '$100'},
    ]


    const handleCategoryChange = (option) => {
        if(option[0]) onFilterChange('category', option[0].category)
        else resetFilter('category')   
    };

    const handlePriceChange = (option) => {
        if(option[0]) onFilterChange('price', option[0].price)
        else resetFilter('price')   
    };

    function resetFilter(filterKey){
        onFilterChange(filterKey, '')
    }

    const tabStyle = {
        border: '1px solid #AAABAD',
        borderRadius: '8px',
        fontSize: '18px',
    }


    return(
        
            <nav className="search-tabs--row">
                    <Select
                        style={tabStyle}
                        options={categoryOptions}
                        labelField='category'
                        valueField='id'
                        placeholder='Category'
                        onChange={handleCategoryChange}
                        clearable
                    />
                    <Select
                        style={tabStyle}
                        options={priceOptions}
                        labelField='label'
                        valueField='id'
                        placeholder='Price'
                        onChange={handlePriceChange}
                        clearable
                    />
                    <div className="search-tab">
                        <b>Location</b>
                        <AngleDownIcon />
                    </div>
                    
            </nav>
        
    )
}

