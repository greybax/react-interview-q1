import './NameLocationTable.css'

function NameLocationTable(props) {
  return (
      <table id="namelocation">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {props.nameLocation.map((val, key) => 
          <tr key={key}>
            <td>{val.name}</td>
            <td>{val.location}</td>
          </tr>
        )}
      </tbody>
  </table>
  );
}

export default NameLocationTable