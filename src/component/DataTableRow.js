function DataTableRow(props) {
  
  var classQuality;
  switch(props.quality){
    case "-1": classQuality = "negative1"; break;
    case "-2": classQuality = "negative2"; break;
    case "-3": classQuality = "negative3"; break;
    case "0": classQuality = "neutral"; break;
    case "1": classQuality = "positive1"; break;
    case "2": classQuality = "positive2"; break;
    case "3": classQuality = "positive3"; break;
    default: classQuality = "undefined"; break;
  }
  const rowData = props.data.map((e, i) => <td className={classQuality} key={"row-" + props.id + "-" + i}>{e}</td>)

  return (
      <tr>
          {rowData}
      </tr>
  );
}

export default DataTableRow;
