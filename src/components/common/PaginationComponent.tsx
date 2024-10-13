import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../../components/ui/pagination"
import { IPaginationProps } from '../../types/Common'



export const PaginationComponent:React.FC<IPaginationProps> = ({page,totalPages,onPageChange,className}) => {
    return (
        <>
            <Pagination className={`${className}`}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href='#' className={`cursor-pointer ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => onPageChange(page - 1)} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className='bg-maincolr text-white' onClick={() => onPageChange(1)} isActive>{page} </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href='#' className={`cursor-pointer ${page === totalPages ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

