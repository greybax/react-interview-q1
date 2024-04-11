import './Input.css'

// Toggle display of error text from props.error.
function InputName({onChange, ...props}) {
  return (
    <>
      <div className="inputNameBox">
        <label htmlFor="name" className="label">
          Name
        </label>
        <div className="inputField">
          <input 
            type="text"
            name="name"
            id="name"
            onChange={(e) => onChange(e.target.value)}
            className="input"
          />
          {props.error ? <p 
              className="error-text">
                  This name has already been taken
          </p> : ''}
        </div>
      </div>
    </>
  )
}

export default InputName;