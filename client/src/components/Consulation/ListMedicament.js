import React, { useState } from "react";
const ListMedicament = () => {
  const [task] = useState("");
  const [todoList, setTodoList] = useState([]);

  //create drug
  const addTaskHandler = (e) => {
    e.preventDefault(); // to prevent default behaviour on submit
    setTodoList(todoList.concat(task));
  };
  //remove drug
  const removeTodo = index => {
    const newTodos = [...todoList];
    newTodos.splice(index, 1);
    setTodoList(newTodos);
  };
 
  //drugs mapping
  const taskList = todoList.map((index, item) => {
    return (
      <tr key={index}>
        <td className="text-center text-muted">{item++}</td>
        <td>
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left flex2">
                <div className="widget-heading">
                  <input type="text" value="" />
                </div>
              </div>
            </div>
          </div>
        </td>
        <td className="text-center">
          <input type="text" value="" />
        </td>
        <td className="text-center">
          <input type="text" value="" />
        </td>
        <td className="text-center">
          <button
            className="fa fa-minus"
            onClick={() => removeTodo(index)}>

          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h3 className="card-title">
        Create ordonnance
        <button
          className="fa fa-plus add-line"
          onClick={addTaskHandler}
        ></button>
      </h3>
      {/* </form> */}
      <div className="row">
        <div className="table-responsive">
          <table
            id="tab"
            className="align-middle mb-0 table table-borderless table-striped table-hover"
          >
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Médicament</th>
                <th className="text-center">Dose</th>
                <th className="text-center">Durée</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>{taskList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListMedicament;
