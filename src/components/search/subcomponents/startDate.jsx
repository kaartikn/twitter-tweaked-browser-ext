import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useEffect } from 'react';


export default function StartDate({props: { startMonth, setStartMonth, startDay, setStartDay, startYear, setStartYear }}) {

    const Months = {
        Month: "Month",
        January: "January",
        February: "February",
        March: "March",
        April: "April",
        May: "May",
        June: "June",
        July: "July",
        August: "August",
        September: "September",
        October: "October",
        November: "November",
        December: "December"
    }

    var days = calendarRange(0,31, "Day");
    var years = calendarRange(2005, new Date().getFullYear(), "Year")
    var leapYears;

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
        switch (startMonth){
            case Months.January: 
            case Months.March: 
            case Months.May: 
            case Months.July: 
            case Months.August: 
            case Months.October: 
            case Months.December:
                break;
            case Months.April:
            case Months.June:
            case Months.September: 
            case Months.November:
                if(startDay == 31){
                    setStartDay("Day");
                }
                break;
            case Months.February:
                if(startDay > 29){
                    setStartDay("Day");
                } else if(startDay == 29){
                    years = leapYears;
                    console.log(years);
                    if (years.includes(startYear)){
                        setStartYear(startYear);
                    } else {
                        setStartYear("Year");
                    }
                    console.log(startYear);
                }
                break;
        }
    }, [startMonth])

    return (
        <>
            <p className='filter-subtitle'>From</p>

            <div className='w-100 d-flex'>
            <Dropdown className="mb-1 col-6">

                <Dropdown.Toggle
                className='w-100'
                id="month"
                title="Month">
                    {startMonth}
                </Dropdown.Toggle>
                <DropdownMenu>
                {
                        Object.keys(Months).map((key) => (
                        <Dropdown.Item 
                            onClick={() => {setStartMonth(Months[key]);}}
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
                className='w-100'
                title={startDay}>
                    {startDay}
                </Dropdown.Toggle>
                <DropdownMenu>
                {
                        days.map((day) => (
                        <Dropdown.Item 
                            onClick={() => {setStartDay(day);}}
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
                className='w-100'
                title="Year">
                    {startYear}
                </Dropdown.Toggle>
                <DropdownMenu>
                {
                        years.map((year) => (
                        <Dropdown.Item 
                            onClick={() => {setStartYear(year);}}
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