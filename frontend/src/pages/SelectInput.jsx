const SelectInput = (props) => {
    const select=props.select;

    return ( 
        <div>
            {select.map((select)=>(
            <div className="in">
                <label>{ select.label }</label>
                <select type={select.type} placeholder={ select.placeholder}>
                    <option>Default Value</option>
                </select>
            </div>
            ))}
        </div>
     );
}
 
export default SelectInput;