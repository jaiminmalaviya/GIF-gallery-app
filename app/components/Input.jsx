const Input = ({ type, label, name, id, value, placeholder, onChange, required }) => {
   return (
      <div className="mb-4">
         <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-900"
         >
            {label}
         </label>
         <input
            type={type}
            name={name}
            id={id}
            value={value}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder={placeholder}
            onChange={onChange}
            required={required}
         />
      </div>
   )
}

export default Input
