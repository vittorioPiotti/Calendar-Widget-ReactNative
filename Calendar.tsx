/*
  Calendario-React-Native v1.0.0 (https://github.com/vittorioPiotti/Calendario-React-Native/releases/tag/1.0.0)
  Copyright 2024 Vittorio Piotti
  Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Calendario-React-Native/blob/main/LICENSE.md)
*/

/*
  React Native v0.74.0 (https://github.com/facebook/react-native/releases/tag/v0.74.0)
  Copyright Facebook, Inc.
  Licensed under MIT (https://github.com/facebook/react-native/blob/main/LICENSE)
*/

/**
 * @access public
 * @package src.scripts.layouts
 * @author Vittorio Piotti
 * @class Calendar.tsx
 * @description Calendar 
*/


import React,  {useState,useEffect}from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';

const Calendar = () => {

    const resetCalendar = ():number[] => {
        return [
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
        ]
    };


    const newCalendar = ():number[]  => {
        const calendar:number[] = [];
        const fsInx = getFsInx(curDate.mm,curDate.aa);
        const ggs = getGGs(curDate.mm,curDate.aa);
        for(let i = 0; i < DIM_CALENDAR; i ++){
            calendar[i] = (
                i < fsInx ? getGGs(calcMM(curDate.mm - 1),calcAA(curDate.mm - 1,curDate.aa))- fsInx + i  + 1
                : i > ggs + fsInx - 1 ? i - fsInx - ggs + 1
                : i - fsInx + 1
            )
        }
        return calendar;
    };

    const initCalendar = ():void => {
 
        setCalendar(newCalendar())
    };


    const initNewCurDate = (mm:number,aa:number):void =>{
        const mmRel =  calcMM(mm)
        const aaRel = calcAA(mm,aa)
        if(
            !(
                (
                    aaRel > MAX_DATE.aa 
                    || (mmRel > MAX_DATE.mm &&  aaRel == MAX_DATE.aa )
                )
                || (
                    aaRel < MIN_DATE.aa 
                    || (mmRel < MIN_DATE.mm &&  aaRel == MIN_DATE.aa )
                )
            )

          )
        setCurDate(
            newCurDate(
                mmRel,
                aaRel
            )
        )
    }   
    const newCurDate = (mm:number,aa:number):{ mm: number, aa: number } =>{
        return (
            {
                mm:mm,
                aa:aa
            }
        )
    }

    const getFsInx = (mm:number,aa:number):number => {
        const inx = new Date(aa, mm , 1).getDay()
        return inx == 0 ? 6 : inx - 1;
    }

  
    const calcMM = (mm:number):number => {
        return (
            mm == -1 ? 11
            : mm == 12 ? 0
            : mm
        )
    }

    const calcAA = (mm:number,aa:number):number => {
        return(
            mm == -1 ? aa-1
            : mm == 12 ? aa+1
            : aa
        )
    }
    const getGGs = (mm:number, aa:number):number => {
        return new Date(aa, mm +1 , 0).getDate();
    }
    
    const calcGG =(ggInx:number):number =>{
        const fsInx:number = getFsInx(curDate.mm,curDate.aa)
        const ggs:number = getGGs(curDate.mm,curDate.aa)
        return (
            ggInx < fsInx ? -1
            : ggInx >= ggs + fsInx ? +1
            : 0
        )
    }

   

    const getAppDate = (ggInx:number):{ gg: number, mm: number, aa: number }=>{
       
        const i = calcGG(ggInx)
        const mmApp:number = curDate.mm + i;
        const mmRel:number = calcMM(mmApp)
        const aaRel:number = calcAA(mmApp, curDate.aa)
        const ggRel:number = calendar[ggInx] == undefined ? calendar[ggInx - 1] + 1 : calendar[ggInx]
        return {
            gg:ggRel,
            mm:mmRel,
            aa:aaRel
        }
        
    }
    const isDate =( appDate: { gg: number, mm: number, aa: number }):boolean=>{
        if( 
            appDate.aa  < MIN_DATE.aa
            || appDate.aa  > MAX_DATE.aa
            || (appDate.aa  == MIN_DATE.aa && appDate.mm < MIN_DATE.mm)
            || (appDate.aa  == MAX_DATE.aa && appDate.mm > MAX_DATE.mm)
            || (appDate.aa  == MIN_DATE.aa && appDate.mm == MIN_DATE.mm && appDate.gg < MIN_DATE.gg)
            || (appDate.aa  == MAX_DATE.aa && appDate.mm == MAX_DATE.mm && appDate.gg > MAX_DATE.gg)
         ){
            return false
        }else{
            return true
        }
    }

    const initFsDate = ( appDate: { gg: number, mm: number, aa: number })=>{
        setFsDate({ gg: appDate.gg, mm: appDate.mm, aa: appDate.aa });
    }

    const initNdDate = ( appDate: { gg: number, mm: number, aa: number })=>{
        setNdDate({ gg: appDate.gg, mm: appDate.mm, aa: appDate.aa });
    }



    const incCurDate = ():void=>{
        initNewCurDate(curDate.mm + 1,curDate.aa)
    }
    const decCurDate = ():void =>{
        initNewCurDate(curDate.mm - 1,curDate.aa)
    }
    
    const DIM_CALENDAR:number = 42;
    const GG_NAMES:string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    
    const MM_NAMES:string[] = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const MAX_MM:number = 11
    const MAX_AA:number = 2025
    const MAX_GG:number = new Date(MAX_AA, MAX_MM + 1, 0).getDate();

    const DATE:Date = new Date();

    const MIN_DATE: { gg: number, mm: number, aa: number } = {
        gg: DATE.getDate(),
        mm: DATE.getMonth(),
        aa: DATE.getFullYear()
    };
    
    const MAX_DATE: { gg: number, mm: number, aa: number } = {
        mm: MAX_MM,
        aa: MAX_AA,
        gg: MAX_GG
    };

    const [calendar,setCalendar] = useState<number[]>(resetCalendar());
 
    const [curDate, setCurDate] = useState<{ mm: number, aa: number }>({ mm: MIN_DATE.mm, aa: MIN_DATE.aa });
    
    const [fsDate, setFsDate] = useState<{ gg: number, mm: number, aa: number }>({ gg: MIN_DATE.gg, mm: MIN_DATE.mm, aa: MIN_DATE.aa });

    const fixGG =(gg: number, mm: number, aa: number ):number => {
        const ggs = getGGs(mm,aa)
        return (
            gg > ggs ? gg - ggs : gg
        )
    }

    const fixMM =(gg: number, mm: number, aa: number ):number => {
        const ggs = getGGs(mm,aa)
        return (
            gg > ggs ? calcMM(mm + 1) : mm
        )
    }

    const fixAA =(gg: number, mm: number, aa: number ):number => {
        const ggs = getGGs(mm,aa)
        return (
            gg > ggs ? calcAA(mm + 1,aa) : aa
        )
    }
    const [ndDate, setNdDate] = useState<{ gg: number, mm: number, aa: number }>(
        { gg:fixGG( MIN_DATE.gg + 1,MIN_DATE.mm, MIN_DATE.aa), mm: fixMM(MIN_DATE.gg + 1,MIN_DATE.mm, MIN_DATE.aa), aa:fixAA(MIN_DATE.gg + 1,MIN_DATE.mm, MIN_DATE.aa)}
    );
    


    const [isFsDate,setIsFsDate] = useState<boolean>(false);

    const inputDate = (ggInx:number)=>{
        const appDate:{ gg: number, mm: number, aa: number } = getAppDate(ggInx)
        
        if(isDate(appDate)){
        if(isFsDate){
                if(
                    !(  appDate.aa < fsDate.aa
                        || (appDate.mm < fsDate.mm &&  appDate.aa ==fsDate.aa) 
                        || (appDate.mm == fsDate.mm &&  appDate.aa ==fsDate.aa && appDate.gg <= fsDate.gg) 
                    )
                ){
                    initNdDate(appDate)
                
                }
             
                
            }else{
                
                    if(!(appDate.gg == MAX_DATE.gg && appDate.mm == MAX_DATE.mm && appDate.aa == MAX_DATE.aa) ){
                        initFsDate(appDate);
                        initNdDate(getAppDate(ggInx + 1))

                       
                    }     
                
            }
        }
        


    
        setIsFsDate(!isFsDate)
        
    }

 

    useEffect(()=>{

        initCalendar()
        

    },[curDate])





    
    const renderDays = () => {
    
        const rows = [];
        
        for (let i = 0; i < calendar.length; i += 7) {
            const weekDays = calendar.slice(i, i + 7); 
            const row = (
                <View key={i} style={styles.rowBody}>
                    {weekDays.map((day, index) => {
                        const ggInx = i + index;
                        return (

                            <TouchableOpacity 
                                key={index} 
                                style={[
                                    styles.cellDayOfMonth,
                                    getStyleRow(ggInx)
                                  ]}
                                  
                                onPress={() => inputDate(ggInx)} 
                            >
                                <Text 
                                    style={getStyleCel(ggInx)}
                                >
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
    

  

    const getStyleRow = (ggInx:number) => {
        const appDate:{ gg: number, mm: number, aa: number } = getAppDate(ggInx)

        return (
            appDate.gg == fsDate.gg && appDate.mm == fsDate.mm && appDate.aa == fsDate.aa ? styles.selectedStartDayAfter
            : appDate.gg == ndDate.gg && appDate.mm == ndDate.mm && appDate.aa == ndDate.aa ? styles.selectedEndDay
            : !(  
                    (
                        appDate.aa < fsDate.aa
                        || (appDate.mm < fsDate.mm &&  appDate.aa ==fsDate.aa) 
                        || (appDate.mm == fsDate.mm &&  appDate.aa ==fsDate.aa && appDate.gg <= fsDate.gg) 
                    )
                    || (
                        appDate.aa > ndDate.aa
                        || (appDate.mm > ndDate.mm &&  appDate.aa ==ndDate.aa) 
                        || (appDate.mm == ndDate.mm &&  appDate.aa ==ndDate.aa && appDate.gg >= ndDate.gg) 
                    )
                 )  ? styles.selectedDay
            : null
        )


    }
    const getStyleCel = (ggInx:number) => {
        const fsInx = getFsInx(curDate.mm,curDate.aa)
        const ggs = getGGs(curDate.mm,curDate.aa);
        const appDate:{ gg: number, mm: number, aa: number } = getAppDate(ggInx)

        return (
            !(  
                (
                    appDate.aa < fsDate.aa
                    || (appDate.mm < fsDate.mm &&  appDate.aa ==fsDate.aa) 
                    || (appDate.mm == fsDate.mm &&  appDate.aa ==fsDate.aa && appDate.gg < fsDate.gg) 
                )
                || (
                    appDate.aa > ndDate.aa
                    || (appDate.mm > ndDate.mm &&  appDate.aa ==ndDate.aa) 
                    || (appDate.mm == ndDate.mm &&  appDate.aa ==ndDate.aa && appDate.gg > ndDate.gg) 
                )
             )  ? styles.textCurrDayOfMonthActive
            :ggInx < fsInx ? styles.textDayOfMonth
            : ggInx > ggs + fsInx - 1 ? styles.textDayOfMonth
            : styles.textCurrDayOfMonth
        )
    }

    const renderWeek = () => {
        return GG_NAMES.map((day, index) => (
            <View key={index} style={styles.cellDayOfWeek}>
                <Text style={styles.textDayOfWeek}>{day}</Text>
            </View>
        ));
    };


    

    return (
        <View style={styles.calendar}>
            <View style={styles.rowHeader}>
                <View style={[styles.colMonthBefore, styles.col]}>
                <TouchableOpacity  onPress={() => decCurDate()}>

                <Text style={{ color: 'white', fontSize: 20 }}>{"<"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.colMonthYear, styles.col]}>
                    <Text style={styles.textMonthYear}>{MM_NAMES[curDate.mm]} {curDate.aa}</Text>
                </View>
                <View style={[styles.colMonthAfter, styles.col]}>
                <TouchableOpacity  onPress={() => incCurDate()}>

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
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 0,
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
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
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
