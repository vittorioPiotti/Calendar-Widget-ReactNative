/**
 * @access public
 * @package src.scripts.layouts
 * @author Vittorio Piotti
 * @class Calendar.tsx
 * @description Footer 
*/


import React,  {useState,useEffect}from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';


const Calendar = () => {

    const CURRDATE = new Date(); 
    const MINMONTH = CURRDATE.getMonth(); 
    const MINYEAR = CURRDATE.getFullYear();
    const MINDAY = CURRDATE.getDate();
    
    const MAXYEAR = 2025; 
    const MAXMONTH = 11; 
    const NUMCEL = 42

    const INX = 
      [  
        [0, 7, 14, 21, 28, 35],
        [1, 8, 15, 22, 29, 36],
        [2,9,16,23,30,37],
        [3,10,17,24,31,38],
        [4,11,18,25,32,39],
        [5,12,19,26,33,40],
        [6,13,20,27,34,41]
    ];


    const WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const MONTHS = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];


    const initDays = () => {
        return [
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
        ]
    }
    const resetDays = () => {
        setDays(initDays());
    };
    const getStartInxMonth = () => {
      

        return new Date(year, getInxMonth(), 1).getDay()  - 1 == -1  ? 0 : new Date(year, getInxMonth(), 1).getDay()  - 1
    }



  


    const getMonthIndex = () =>{
        return MONTHS.findIndex(m => m.toUpperCase() === month.toUpperCase()); 
    }
 
    const getNumDaysMonth = () => {
        return new Date(year,  getInxMonth() + 1, 0).getDate()
    }

    const getInxMonth = () =>{
        return MONTHS.indexOf(month)
    }
    
   
    const setNewYear = (dayIndex: number) =>{
        return (
            dayIndex > getNumDaysMonth() +  INX[getStartInxMonth()][0] ? calcYear(+1)
            :  dayIndex < INX[getStartInxMonth()][0] ? calcYear(-1)
            :year
        )
    }

    const setNewMonth = (dayIndex: number) => {
        return(
            dayIndex > getNumDaysMonth() + INX[getStartInxMonth()][0] ? calcMonth(+1)
            : dayIndex < INX[getStartInxMonth()][0] ? calcMonth(-1)
            :getCalcMonthInx(dayIndex)
        )

    }

    const getCalcMonthInx =(dayIndex: number) =>{
        const startInx = INX[getStartInxMonth()][0] 
        const inxMonth =  getMonthIndex()
        return (
            dayIndex < startInx ? inxMonth - 1
            : dayIndex >= getNumDaysMonth() + startInx ? inxMonth + 1 
            :  inxMonth  
        )
    }
    

    const setNewDay = (dayIndex:number) =>{
        return (
            days[dayIndex] + 1 > getNumDaysMonth() ? 1
            :    days[dayIndex] + 1
        )
                    
    }
    const handlePress = (dayIndex:number)=>{
        const startInx =  INX[getStartInxMonth()][0]
        const monthInx = getCalcMonthInx(dayIndex)
            

        if(dateState && dayFs != -1){

            if( ( days[dayIndex] > dayFs && monthInx == monthFs && year == yearFs) || ( monthInx > monthFs && year >= yearFs) || year > yearFs || (dayIndex > getNumDaysMonth() + startInx && dayFs < days[dayIndex])){
                    setYearNd(setNewYear(dayIndex))
                    setDayNd(days[dayIndex])
                    setInxNd(dayIndex)
                    setMonthNd(setNewMonth(dayIndex))
            }
         
        }else{
            console.log(dayIndex + " " +  days[dayIndex] +" "  + (dayIndex + 1)  + " " +days[dayIndex +1])
            if( (days[dayIndex] >= MINDAY && monthInx == MINMONTH && year == MINYEAR) || ( monthInx > MINMONTH && year >= MINYEAR) || year > MINYEAR ){
                setYearFs(setNewYear(dayIndex))
                setDayFs(days[dayIndex])
                setInxFs(dayIndex)
                setMonthFs(setNewMonth(dayIndex))


                setMonthNd(

                    setNewMonth(dayIndex +1)

                )
                setYearNd(
                    setNewYear(dayIndex + 1)
                )
                setDayNd(
                    setNewDay(dayIndex)
                )
                setInxNd(
                    dayIndex + 1
                )
    
    
            }
        






          

        }
        setDateState(!dateState)
    }
    const getDateUguale = (day: number,month:number, year:number, gg:number,mm:number,aaaa:number) => {
        
        return day == gg && month == mm && year == aaaa 
    }
    const getDateMinore = (day: number,month:number, year:number, gg:number,mm:number,aaaa:number) => {

        return (day < gg && month ==  mm && year == aaaa ) || ( month <  mm && year <= aaaa ) || year < aaaa

    }
    const getDateMaggiore = (day: number,month:number, year:number, gg:number,mm:number,aaaa:number) => {
        return (day > gg && month ==  mm && year == aaaa ) || ( month >  mm && year >= aaaa ) ||  year > aaaa
    }

    const getRelativeNumDaysMonth = () => {
       return getStartInxMonth() + getNumDaysMonth() - 1
    }
    const getNumDaysPreviousMonth = () => {
        return new Date(year,  getInxMonth() -1 == -1 ? 11  : getInxMonth() , 0).getDate()//new Date(year,  getInxMonth() -1 == -1 ? 11  : getInxMonth() (((- 1))), 0).getDate() //-1 a cosa server?
    }
    const getDaysPreviousMonth = (dayIndex:number) =>{
        return getNumDaysPreviousMonth()  - ((NUMCEL - dayIndex - (NUMCEL - (getStartInxMonth() + getNumDaysMonth() - 1)) ) - getNumDaysMonth())
    }

    const getDiffDaysMonth = () =>{
        return NUMCEL - getRelativeNumDaysMonth()
    }
    const getDaysNextMonth = (dayIndex:number) =>{
        return (NUMCEL - dayIndex - getDiffDaysMonth() )*(-1) 
    }

    const getCelInx = (day:number) =>{
        const inxMonth = getInxMonth() -1
        const numDays = getNumDaysMonth()
        for(let i = inxMonth; i < days.length - (NUMCEL - numDays - 1); i ++){
            if(day == days[i])return i;
        }
        return inxMonth +numDays
    }

    const calcMonth = (val : number) => {
        return (
            getInxMonth() + val == -1 ? 11 
            :  getInxMonth() + val == 12 ? 0
            : getInxMonth()  + val
        )
    }

    const calcYear = (val : number) =>{
        return (
            getInxMonth() + val == -1 ? year - 1
            :  getInxMonth() + val == 12 ? year + 1
            : year
        )
    }
    const [month,setMonth] = useState(MONTHS[CURRDATE.getMonth()])
    const [year,setYear] = useState(CURRDATE.getFullYear())
    const [days,setDays] = useState(initDays())


    const [monthFs,setMonthFs] = useState(MINMONTH)
    const [dayFs,setDayFs] = useState(MINDAY)
    const [inxFs,setInxFs] = useState(getStartInxMonth())
    const [yearFs,setYearFs] = useState(MINYEAR)

    const [monthNd,setMonthNd] = useState( MINDAY + 1 > getNumDaysMonth() ? setNewMonth(getCelInx(MINDAY) +1) :MINMONTH )
    const [dayNd,setDayNd] = useState(MINDAY + 1 > getNumDaysMonth() ? setNewDay(getCelInx(MINDAY) ) :MINDAY + 1  )
    const [inxNd,setInxNd] = useState( getCelInx(MINDAY)  )
    const [yearNd,setYearNd] = useState(MINDAY + 1 > getNumDaysMonth() ? setNewYear(getCelInx(MINDAY) + 1): MINYEAR)

    const [dateState,setDateState] = useState(false)
 
    useEffect(()=>{
        const startInx = INX[getStartInxMonth()][0];
        resetDays()
        setDays(prevDays => {
            const updatedDays = [...prevDays]; 
            for(let i = 0; i < days.length; i ++){
                updatedDays[i] = 
                    i < INX[getStartInxMonth()][0] ? getDaysPreviousMonth(i)
                    : i >= getNumDaysMonth() + startInx ? getDaysNextMonth(i) 
                    : i - startInx + 1
            }
    
            return updatedDays; 
        });

    },[month,year])


    
    const renderDays = () => {
       
        const rows = [];
        const startInxMonth = getStartInxMonth();
        const numDaysMonth = getRelativeNumDaysMonth();
        for (let i = 0; i < days.length; i += 7) {
            const weekDays = days.slice(i, i + 7); 
            const row = (
                <View key={i} style={styles.rowBody}>
                    {weekDays.map((day, index) => {
                        const dayIndex = i + index;
                        return (

                            <TouchableOpacity 
                                key={index} 
                                style={[
                                    styles.cellDayOfMonth,
                                    getStyleRow(startInxMonth,dayIndex,numDaysMonth)
                                  
                                         

                               
                                  ]}
                                  
                                onPress={() => handlePress(dayIndex)} 
                            >
                                <Text style={
                                    getStyleCel(startInxMonth,dayIndex,numDaysMonth)
                   
                                    }>
                                {day}
                                
                                </Text>
                            </TouchableOpacity>
                        );

                    })}
                </View>
            );
    
            rows.push(row);
        }


        
    
        return rows;
    };
    

  

    const getStyleRow = (startInxMonth:number,dayIndex:number,numDaysMonth:number) => {
        return(
            inxNd == -1 && startInxMonth <= dayIndex && numDaysMonth >= dayIndex && getDateUguale(days[dayIndex],getInxMonth(),year, dayFs, monthFs, yearFs) ? styles.selectedStartDayBefore
            : 
            inxNd != - 1 && startInxMonth <= dayIndex && numDaysMonth >= dayIndex && getDateMaggiore(days[dayIndex],getInxMonth(),year,dayFs, monthFs, yearFs) && getDateMinore(days[dayIndex],getInxMonth(),year, dayNd, monthNd, yearNd) ? styles.selectedDay
            :
            inxNd != - 1 && startInxMonth <= dayIndex && numDaysMonth >= dayIndex && getDateUguale(days[dayIndex],getInxMonth(),year, dayFs, monthFs, yearFs) ? styles.selectedStartDayAfter
            :
            inxNd != - 1 && startInxMonth <= dayIndex && numDaysMonth >= dayIndex && getDateUguale(days[dayIndex],getInxMonth(),year, dayNd, monthNd, yearNd) ? styles.selectedEndDay
            :
            inxNd == -1 && startInxMonth > dayIndex && getDateUguale(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayFs, monthFs, yearFs) ? styles.selectedStartDayBefore
            :
            inxNd == -1 && numDaysMonth < dayIndex && getDateUguale(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayFs, monthFs, yearFs) ? styles.selectedStartDayBefore
            :
            inxNd != -1 && numDaysMonth < dayIndex  && getDateUguale(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayFs, monthFs, yearFs) ? styles.selectedStartDayAfter
            :
            inxNd != -1 && numDaysMonth < dayIndex  && getDateMinore(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayNd, monthNd, yearNd) && getDateMaggiore(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayFs, monthFs, yearFs) && (calcMonth(+1) >= monthFs ||  calcYear(+1) > year)  ? styles.selectedDay
            :
            inxNd != -1 && numDaysMonth < dayIndex  && getDateUguale(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayNd, monthNd, yearNd) ? styles.selectedEndDay
            :
            inxNd != -1 && startInxMonth > dayIndex  && getDateUguale(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayFs, monthFs, yearFs) ? styles.selectedStartDayAfter
            :
            inxNd != -1 && startInxMonth > dayIndex  && getDateUguale(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayNd, monthNd, yearNd) ? styles.selectedEndDay
            :
            inxNd != -1 && startInxMonth > dayIndex  && getDateMaggiore(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayFs, monthFs, yearFs) && getDateMinore(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayNd, monthNd, yearNd) && (calcMonth(-1) <= monthNd ||  calcYear(-1) < year)  ? styles.selectedDay
            : null
        )
    }
    const getStyleCel = (startInxMonth:number,dayIndex:number,numDaysMonth:number) => {
        return (
            inxNd == -1 && startInxMonth <= dayIndex && numDaysMonth >= dayIndex && getDateUguale(days[dayIndex],getInxMonth(),year, dayFs, monthFs, yearFs) ? styles.textCurrDayOfMonthActive
            : 
            inxNd != - 1 && startInxMonth <= dayIndex && numDaysMonth >= dayIndex && getDateMaggiore(days[dayIndex],getInxMonth(),year,dayFs, monthFs, yearFs) && getDateMinore(days[dayIndex],getInxMonth(),year, dayNd, monthNd, yearNd) ? styles.textCurrDayOfMonthActive
            :
            inxNd != - 1 && startInxMonth <= dayIndex && numDaysMonth >= dayIndex && getDateUguale(days[dayIndex],getInxMonth(),year, dayFs, monthFs, yearFs) ? styles.textCurrDayOfMonthActive
            :
            inxNd != - 1 && startInxMonth <= dayIndex && numDaysMonth >= dayIndex && getDateUguale(days[dayIndex],getInxMonth(),year, dayNd, monthNd, yearNd) ? styles.textCurrDayOfMonthActive
            :
            inxNd == -1 && startInxMonth > dayIndex && getDateUguale(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayFs, monthFs, yearFs) ? styles.textCurrDayOfMonthActive
            :
            inxNd == -1 && numDaysMonth < dayIndex && getDateUguale(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayFs, monthFs, yearFs) ? styles.textCurrDayOfMonthActive
            :
            inxNd != -1 && numDaysMonth < dayIndex  && getDateUguale(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayFs, monthFs, yearFs) ? styles.textCurrDayOfMonthActive
            :
        inxNd != -1 && numDaysMonth < dayIndex  && getDateMinore(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayNd, monthNd, yearNd) && getDateMaggiore(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayFs, monthFs, yearFs) && ( calcMonth(+1) + 1 >= monthFs ||  calcYear(+1) > year)   ? styles.textCurrDayOfMonthActive
            :
            inxNd != -1 && numDaysMonth < dayIndex  && getDateUguale(getDaysNextMonth(dayIndex),calcMonth(+1),calcYear(+1), dayNd, monthNd, yearNd) ? styles.textCurrDayOfMonthActive
            :
            inxNd != -1 && startInxMonth > dayIndex  && getDateUguale(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayFs, monthFs, yearFs) ? styles.textCurrDayOfMonthActive
            :
            inxNd != -1 && startInxMonth > dayIndex  && getDateUguale(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayNd, monthNd, yearNd) ? styles.textCurrDayOfMonthActive
            :
            inxNd != -1 && startInxMonth > dayIndex  && getDateMaggiore(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayFs, monthFs, yearFs) && getDateMinore(getDaysPreviousMonth(dayIndex),calcMonth(-1),calcYear(-1), dayNd, monthNd, yearNd) && (calcMonth(-1) <= monthNd ||  calcYear(-1) < year)  ?styles.textCurrDayOfMonthActive
            : startInxMonth <= dayIndex && numDaysMonth >= dayIndex ? styles.textCurrDayOfMonth
            : styles.textDayOfMonth
        )
    }

    const renderWeek = () => {
        return WEEK.map((day, index) => (
            <View key={index} style={styles.cellDayOfWeek}>
                <Text style={styles.textDayOfWeek}>{day}</Text>
            </View>
        ));
    };

    const previousMonth = () => {
        const monthIndex = getMonthIndex()
        if(monthIndex != MINMONTH || year != MINYEAR){
            console.log(monthIndex)
            const previousMonthIndex = monthIndex - 1  == -1 ? 11 :monthIndex - 1; 
            setMonth(MONTHS[previousMonthIndex]); 
            if(monthIndex == 0)setYear(year - 1)

          
        }
    };
    
    const nextMonth = () => {
        const monthIndex = getMonthIndex()
        if(monthIndex != MAXMONTH || year != MAXYEAR){
            const nextMonthIndex =  monthIndex + 1  == 12 ? 0 :monthIndex + 1; 
            if(monthIndex == 11)setYear(year + 1)
            setMonth(MONTHS[nextMonthIndex]); 
        }
    };
    

    return (
        <View style={styles.calendar}>
            <View style={styles.rowHeader}>
                <View style={[styles.colMonthBefore, styles.col]}>
                <TouchableOpacity  onPress={() => previousMonth()}>

                <Text style={{ color: 'white', fontSize: 20 }}>{"<"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.colMonthYear, styles.col]}>
                    <Text style={styles.textMonthYear}>{month} {year}</Text>
                </View>
                <View style={[styles.colMonthAfter, styles.col]}>
                <TouchableOpacity  onPress={() => nextMonth()}>

                <Text style={{ color: 'white', fontSize: 20 }}>{">"}</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.rowBody}>
                {renderWeek()}
          
            </View>

            {renderDays()}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25
    },
    calendar: {
        width: 300,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    textMonthYear: {
        color: 'white',
        fontSize: 25
    },
    rowBody: {
        flexDirection: 'row',
        width: '100%',
        height: '11%',
        paddingTop:5,
        paddingBottom:5
       
    },
    rowHeader: {
        flexDirection: 'row',
        width: '100%',
        height: '20%',
        backgroundColor: '#6A994E',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    col: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    colMonthBefore: {
        width: '20%'
    },
    colMonthYear: {
        width: '60%'
    },
    colMonthAfter: {
        width: '20%'
    },
    cellDayOfWeek: {
        width: '14.3%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin:'auto',
    
    },
    selectedDay:{
        backgroundColor:'#93C16D',
        color:'white',

    },
    selectedStartDayBefore:{
        backgroundColor:'#93C16D',
        color:'white',
        borderRadius: 10
    },
    selectedStartDayAfter:{
        backgroundColor:'#93C16D',
        color:'white',
        borderStartStartRadius: 10,
        borderEndStartRadius: 10

    },
    selectedEndDay:{
        backgroundColor:'#93C16D',
        color:'white',
        borderStartEndRadius: 10,
        borderEndEndRadius: 10

    },
    cellDayOfMonth: {
        width: '14.3%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin:'auto',    
    },
    textDayOfWeek: {
        fontSize: 14,
        color:'#A44A3F'
    },
    textDayOfMonth: {
        fontSize: 14,
        color:'#CECECE'
    },
    textCurrDayOfMonth:{
        fontSize: 14,
        color:'black'
    },
    textCurrDayOfMonthActive:{
        fontSize: 14,
        color:'white'
    }
});

export default Calendar;
