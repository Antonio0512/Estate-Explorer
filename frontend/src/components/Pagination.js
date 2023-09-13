export const Pagination = (props) => {
    const getNumbers = () => {
        let numbers = [];

        for (let pageNumber = 1; pageNumber <= props.count; pageNumber++) {
            let style = 'pagination__number';
            let content = null;

            if (props.active === pageNumber) {
                style = 'pagination__number pagination__number--active';
            }

            content = (
                <div key={pageNumber} onClick={() => props.visitPage(pageNumber)} className={style}>
                    {pageNumber}
                </div>
            );

            numbers.push(content);
        }

        return numbers;
    };


    return (
        <div className='pagination'>
            <div onClick={() => props.previous()} className='pagination__number'>
                Previous
            </div>
            {getNumbers()}
            <div onClick={() => props.next()} className='pagination__number'>
                Next
            </div>
        </div>
    );
};