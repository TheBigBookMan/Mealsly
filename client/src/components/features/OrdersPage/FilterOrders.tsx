
interface FilterOrdersInterface {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterOrders = ({filter, setFilter}: FilterOrdersInterface) => {
    return (
        <div>
            <p>Filters</p>
            <p>Filters</p>
            <p>Filters</p>
            <p>Filters</p>
            <p>Filters</p>
            <p>Filters</p>
            <p>Filters</p>
            <p>Filters</p>
            <p>Filters</p>
        </div>
    )
}

export default FilterOrders;