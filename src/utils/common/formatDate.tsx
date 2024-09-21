import moment from "moment";

export const formateDatetotwo=(date:Date):string=>{
  return moment(date).format('MMMM YYYY')
}


export const formateDatetoThree=(date:Date):string=>{
    return moment(date).format('DD MMMM YYYY')
  }
  