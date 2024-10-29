import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

interface paginacionProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
}

export function Paginacion({
    currentPage,
    onPageChange,
    totalItems,
    itemsPerPage,
}: paginacionProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                if (currentPage > 1) {
                                    onPageChange(currentPage - 1);
                                }
                            }}
                            aria-disabled={currentPage === 1}
                            className={currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={() => onPageChange(index + 1)}
                                isActive={index + 1 === currentPage}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {totalPages > 3 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => {
                                if (currentPage < totalPages) {
                                    onPageChange(currentPage + 1);
                                }
                            }}
                            aria-disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
