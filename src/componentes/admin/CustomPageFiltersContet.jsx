import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { companyProfileIntegerData, companyProfileStringData, financialGrowthIntegerData, financialGrowthStringData, financialRatiosIntegerData, financialRatiosStringData, keyMetricsIntegerData, keyMetricsStringData, realTimeQuoteIntegerData, realTimeQuoteStringData } from '../../assets/data/customPagesData';
import Filter from '../Filter';
import './styles.css'

const CustomPageFiltersContet = () => {
    const { tableName } = useParams()
    const [valueType, setValueType] = useState('')
    const [filterCondition, setFilterCondition] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [integerOptions, setIntegerOptions] = useState([])
    const [stringOptions, setStringOptions] = useState([])
    const [allCompanies, setAllCompanies] = useState([])
    const [allFilteredCompanies, setAllFilteredCompanies] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        switch (tableName) {
            case "CompanyProfile":
                setIntegerOptions(companyProfileIntegerData)
                setStringOptions(companyProfileStringData)
                break;
            case "FinancialRatios":
                setIntegerOptions(financialRatiosIntegerData)
                setStringOptions(financialRatiosStringData)
                break;
            case "KeyMetrics":
                setIntegerOptions(keyMetricsIntegerData)
                setStringOptions(keyMetricsStringData)
                break;
            case "RealTimeQuotes":
                setIntegerOptions(realTimeQuoteIntegerData)
                setStringOptions(realTimeQuoteStringData)
                break;
            case "FinancialGrowth":
                setIntegerOptions(financialGrowthIntegerData)
                setStringOptions(financialGrowthStringData)
                break;

        }
        axios.get('https://humbletitanapi.herokuapp.com/alltickersort')
            .then(res => setAllCompanies([...res.data]))
    }, [])

    const filterConditionForInteger = ["Equal To", "Less Than", "Greater Than"]
    const filterConditionForString = ["Equal To", "Starting With", "Ending With"]

    const handleValueType = (e) => {
        document.querySelectorAll(".valueType").forEach(item => { item.classList.add('text-blue'); item.classList.add('bg-light-blue'); item.classList.remove('text-white'); item.classList.remove('bg-blue') })
        e.target.classList.add('text-white')
        e.target.classList.add('bg-blue')
        e.target.classList.remove('text-blue')
        e.target.classList.remove('bg-light-blue')
        let valueType = e.target.children[0].innerText
        setValueType(valueType)
        setFilterValue('')
    }

    const handleFilterCondition = (e) => {
        document.querySelectorAll(".filterCondition").forEach(item => { item.classList.add('text-blue'); item.classList.add('bg-light-blue'); item.classList.remove('text-white'); item.classList.remove('bg-blue') })
        e.target.classList.add('text-white')
        e.target.classList.add('bg-blue')
        e.target.classList.remove('text-blue')
        e.target.classList.remove('bg-light-blue')
        let valueType = e.target.children[0].innerText
        setFilterCondition(valueType)
        setFilterValue('')
    }

    const handleFilter = (newValue) => {
        setFilter(newValue.value)
    }
    const filtertionOfFilteredData = (filtered) => {
        
        const fD = filtered
        // fD.sort((a, b) => a?.Info[filter.toLocaleLowerCase()] - b?.Info[filter.toLocaleLowerCase()])
         
        setFilteredData([...fD])
        let newCompanies=[]
        // fD.map(item=>{
        //     allCompanies.map(i=> item?.Symbol === i?.Symbol && newCompanies.push(i) )
        // })
        // setAllFilteredCompanies([...newCompanies])
        setLoading(false)
    }

    const generateResults = () => {
        let url = ''
        switch (filterCondition) {
            case "Equal To":
                url = `https://humbletitanapi.herokuapp.com/getEqualTo/all${tableName}?label=${filter.toLowerCase()}&value=${filterValue}`
                break;
            case "Greater Than":
                url = `https://humbletitanapi.herokuapp.com/getGreaterThan/all${tableName}?label=${filter.toLowerCase()}&value=${filterValue}`
                break;
            case "Less Than":
                url = `https://humbletitanapi.herokuapp.com/getLessThan/all${tableName}?label=${filter.toLowerCase()}&value=${filterValue}`
                break;
            case "Starting With":
                url = `https://humbletitanapi.herokuapp.com/getStartingWith/all${tableName}?label=${filter.toLowerCase()}&value=${filterValue}`
                break;
            case "Ending With":
                url = `https://humbletitanapi.herokuapp.com/getEndingWith/all${tableName}?label=${filter.toLowerCase()}&value=${filterValue}`
                break;

        }
        setLoading(true)
        axios.get(url).then((res) => {
            filtertionOfFilteredData([...res.data])
        })
         
    }

    return (
        <div className="container container-y w-full pb-9">
            <h2 className="text-40 mt-2 text-center text-blue">
                Select The Value Type  You Wanted to be Filtered
            </h2>
            <div className="flex mt-4 wrap justify-between  row-gap-4">
                <div onClick={handleValueType} className="col-6 pt-5 pb-5  valueType text-blue cursor-pointer text-center border-rad-8 bg-light-blue">
                    <h4 className='ls-1-1 text-20 pointer-event-none '>Integer</h4>
                </div>
                <div onClick={handleValueType} className="col-6 pt-5 pb-5 valueType  text-blue cursor-pointer text-center border-rad-8 bg-light-blue">
                    <h4 className='ls-1-1 text-20  pointer-event-none'>String</h4>
                </div>
            </div>

            <div>
                {valueType &&
                    <>
                        <h2 className="text-40 mt-4 text-center text-blue">
                            Select The Filter
                        </h2>
                        <div className="inputWrapper chomu mt-4">
                            <Filter options={valueType === "Integer" ? integerOptions : stringOptions} handleChange={handleFilter} />
                        </div>

                    </>
                }
            </div>

            {filter &&

                <>
                    <h2 className="text-40 mt-4 text-center text-blue">
                        Select The Condition Type You Wanted to be Applied on Filter
                    </h2>
                    <div className="flex mt-4 wrap justify-between  row-gap-4">
                        {
                            valueType === "String" ?
                                filterConditionForString.map((filter) =>
                                    <div onClick={handleFilterCondition} key={filter} className="col-4 pt-5 pb-5 filterCondition text-blue  cursor-pointer text-center border-rad-8 bg-light-blue">
                                        <h4 className='ls-1-1 text-20 pointer-event-none'>{filter}</h4>
                                    </div>
                                )
                                :
                                filterConditionForInteger.map((filter) =>
                                    <div onClick={handleFilterCondition} key={filter} className="col-4 pt-5 pb-5 filterCondition text-blue  cursor-pointer text-center border-rad-8 bg-light-blue">
                                        <h4 className='ls-1-1 text-20 pointer-event-none'>{filter}</h4>
                                    </div>
                                )


                        }


                    </div>
                </>
            }

            <div>
                {filterCondition &&
                    <>
                        <h2 className="text-40 mt-4 text-center text-blue">
                            Enter The  Value You Wanted to be Filtered
                        </h2>
                        <div className="inputWrapper mt-4">
                            <input type={valueType === "Integer" ? "number" : 'text'} value={filterValue} onChange={(e) => setFilterValue(e.target.value)} maxLength={filterCondition == "Starting With" && 1 || filterCondition == "Ending With" && 1} placeholder='Enter the value you wanted to be filtered ' />
                        </div>
                        <div className="flex justify-center w-full mt-4">
                            <button className="btn btn-primary" data-text='Generate Results' onClick={generateResults}>

                            </button>
                        </div>
                    </>
                }
            </div>
          {loading ? "Loading...":   filteredData && <div className="filteredTable  bg-light-blue mt-4">
                <div className="p-1 flex justify-between">
                    <div className="col-4">
                        <span><h4 className='text-24 text-blue'>Company Symbol</h4></span>
                    </div>
                    <div className="col-4">
                        <span><h4 className='text-24 text-blue'>Filtered</h4></span>
                    </div>
                    <div className="col-4">
                        <span><h4 className='text-24 text-blue'>Value</h4></span>
                    </div>

                </div>
                {
                    filteredData?.map((item,index)=>
                        <div className="p-1 flex justify-between" key={item?.Symbol + index}>
                        <div className="col-4">
                            <span><h4 className=' text-blue'>{item?.Symbol}</h4></span>
                        </div>
                        <div className="col-4">
                            <span><h4 className=' text-blue'>{filter}</h4></span>
                        </div>
                        <div className="col-4">
                            <span><h4 className=' text-blue'>{item?.Info[filter.toLowerCase()]}</h4></span>
                        </div>
    
                    </div>

                    )
               
                    
                }
                {/* <div className="col-3">
<span><strong>Company Name</strong></span>
                </div> */}
            </div>}
        </div>
    )
};

export default CustomPageFiltersContet;
