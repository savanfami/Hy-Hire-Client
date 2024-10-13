import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../components/ui/pagination"

export const PaginationSection = ({currentPage,itemPerPage,totalJobs,setCurrentPage}:{
    currentPage:number;
    itemPerPage:number;
    totalJobs:number;
    setCurrentPage?:any;
    }) => {
    
        let pages=[]
        for(let i=1;i<=Math.ceil(totalJobs/itemPerPage);i++){
            pages.push(i)
        }
    
    
       const handlePrevPage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
       }
    
       const handlenextPage=()=>{
        if(currentPage<pages.length){
            setCurrentPage(currentPage+1)
        }
       }
    
        return (

            <Pagination>
                <PaginationContent>
                   <PaginationItem>
                    <PaginationPrevious  className='cursor-pointer font-semibold ' onClick={()=>handlePrevPage()}/>
                   </PaginationItem>
                    {pages.map((page,idx)=>(
                        <PaginationItem key={idx}
                        className={currentPage===page?'bg-maincolr text-white rounded-md':''}>
                            <PaginationLink  className='cursor-pointer' onClick={()=>setCurrentPage(page)}>{page}</PaginationLink>
                        </PaginationItem>
                    ))}
    
                   <PaginationItem>
                   <PaginationNext className='cursor-pointer font-semibold ' onClick={()=>handlenextPage()}/>
                  </PaginationItem>
                </PaginationContent>
            </Pagination>
    
        )
    }