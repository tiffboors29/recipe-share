import React from 'react';

const Table = (props) => {

  function renderRowData (item) {
    return (props.dataKeys || []).map((key, i) => {
      if (props.customRender && props.customRender[key]){
        let className = props.customRender[key].className || props.cellClassName;
        return (
          <td className={ className } key={ key }>
            { props.customRender[key].renderer(item, props) }
          </td> 
        )
      }
      return (
        <td className={ props.cellClassName } key={ key }>
          { item[props.dataKeys[i]] }
        </td>
      )
    });
  }

  return (
    <table className="table table-fixed">
      <thead>
        <tr>
          {
            (props.columns || []).map((col, i) =>
              <th key={ `th${i}` } width={ col.width } data-column={ col.data }>
                { col.name }
              </th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          (props.data || []).map(item =>
            <tr key={ item._id }>
              { renderRowData(item) }
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export { Table };