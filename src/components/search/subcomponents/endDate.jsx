import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { useState, useEffect } from 'react';
import { Months } from "./startDate";

// End date logic is a bit messy. Most cases are accounted for but could be done cleaner.
// The only caveat is that right now if a user is tries to set the date of February 29 from 1-2 entrypoints it won't work, 
// but it's so miniscule it probably doesn't matter.
export default function EndDate({props: { endMonth, setEndMonth, endDay, setEndDay, endYear, setEndYear }}) {

    const days28 = calendarRange(0, 28, "Day");
    const days29 = calendarRange(0, 29, "Day");
    const days30 = calendarRange(0, 30, "Day"); 
    const days31 = calendarRange(0, 31, "Day");

    const allYears = calendarRange(2005, new Date().getFullYear(), "Year");
    var leapYears;

    const [ yearsSelection, setYearsSelection ] = useState(allYears);
    const [ daysSelection, setDaysSelection ] = useState(days31);

    function calendarRange (start, end, type) {
        var scale;
        var arr = new Array(end - start).fill().map((d, i) => i + start + 1);
        if (type == "Day"){
            scale = ["Day"];
        } else if (type == "Year"){
            scale = ["Year"];
            const leap = arr.filter(year => year % 4 == 0);
            leapYears = [...scale, ...leap];
        }
        return([...scale, ...arr]);
    }

    useEffect(() => {
        switch (endMonth){
            case Months.Month:
            case Months.January: 
            case Months.March: 
            case Months.May: 
            case Months.July: 
            case Months.August: 
            case Months.October: 
            case Months.December:
                setDaysSelection(days31);
                setYearsSelection(allYears);
                break;
            case Months.April:
            case Months.June:
            case Months.September: 
            case Months.November:
                setYearsSelection(allYears);
                setDaysSelection(days30);
                if(endDay == 31){
                    setEndDay("Day");
                }
                break;
            case Months.February:
                if(endDay > 29){
                    if (leapYears.includes(endYear)){
                        setDaysSelection(days29);
                        setYearsSelection(leapYears);
                    } else {
                        setDaysSelection(days28);
                    }
                    setEndDay("Day");
                } else if(endDay === 29){
                    setDaysSelection(days29);
                    setYearsSelection(leapYears);
                    if (!yearsSelection.includes(endYear)){
                        setEndYear("Year");
                    } 
                } else {
                    setDaysSelection(days28);
                    if(!daysSelection.includes(endDay)){
                        setEndDay("Day");
                    }
                }
                break;
        }
    }, [endMonth])

    useEffect(() => {
        if(leapYears.includes(endYear)){
            if(endMonth == Months.February){
                setDaysSelection(days29);
                setYearsSelection(leapYears);
            } else {
                setYearsSelection(allYears);
            }
        } else {
            setYearsSelection(allYears);
            if(endMonth == Months.February){
                setDaysSelection(days28);
            } 
        }
    }, [endYear])

    return (
        <>
            <p className='filter-subtitle'>From</p>
            <div className='w-100 d-flex'>
            <Dropdown className="mb-1 col-6">

                <Dropdown.Toggle
                className='w-100 standard-button'
                id="month"
                title="Month">
                    {endMonth}
                </Dropdown.Toggle>
                <DropdownMenu>
                {
                        Object.keys(Months).map((key) => (
                        <Dropdown.Item 
                            onClick={() => {setEndMonth(Months[key]);}}
                            key={Months[key].toLowerCase()}>
                            {Months[key]}
                        </Dropdown.Item>
                        ))
                }
                </DropdownMenu>

            </Dropdown>

            <Dropdown className="mb-1 col-3">

                <Dropdown.Toggle
                id="day"
                className='w-100 standard-button'
                title={endDay}>
                    {endDay}
                </Dropdown.Toggle>
                <DropdownMenu>
                {
                        daysSelection.map((day) => (
                        <Dropdown.Item 
                            onClick={() => {setEndDay(day);}}
                            key={day}>
                            {day}
                        </Dropdown.Item>
                        ))
                }
                </DropdownMenu>

            </Dropdown>

            <Dropdown className="mb-1 col-3">

                <Dropdown.Toggle
                id="year"
                className='w-100 standard-button'
                title="Year">
                    {endYear}
                </Dropdown.Toggle>
                <DropdownMenu>
                {
                        yearsSelection.map((year) => (
                        <Dropdown.Item 
                            onClick={() => {setEndYear(year);}}
                            key={year}>
                            {year}
                        </Dropdown.Item>
                        ))
                }
                </DropdownMenu>

            </Dropdown>

        </div>

        </>
    )

}