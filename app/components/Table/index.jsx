/* eslint-disable @next/next/no-img-element */

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TableComponent({ columns = [], rows = [] }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="border-t border-gray-200">
          {columns.map((column, i) => (
            <th
              key={i}
              className={classNames(
                "px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                column.className ? column.className : ""
              )}
              style={column.style || {}}
            >
              <span className="lg:pl-2">{column.name}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {rows.map((row) => (
          <tr key={row._id}>
            {columns.map((column, i) => (
              <td
                key={i}
                className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500"
              >
                {column.render ? column.render(row) : row[column.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
