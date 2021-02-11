import React from "react";
import { useState } from "react";
import shortid from "shortid";

export function ToDo() {
	const [tarea, setTarea] = useState("");
	const [tareas, setTareas] = useState([]);

	const Agregar = e => {
		e.preventDefault();
		setTareas([
			{
				id: shortid.generate(),
				nombreTarea: tarea
			},
			...tareas
		]);

		setTarea("");
	};

	function Borrar(variable) {
		let borrar = tareas.find(arr => arr.id === variable);
		let index = tareas.indexOf(borrar);
		tareas.splice(index, 1);
		setTareas([...tareas]);
	}

	function SubmitForm(variable) {
		if (variable === "Enter") {
			Agregar();
		}
	}

	function Mensaje() {
		if (tareas.length != 1) {
			return "Faltan " + tareas.length + " tareas por completar";
		} else {
			return "Falta " + tareas.length + " tarea por completar";
		}
	}

	return (
		<div className="contenido d-flex flex-column">
			<form onSubmit={Agregar}>
				<div className="d-flex flex-column justify-content-center">
					<div className="d-flex align-items-center">
						<input
							className="form-control m-4 p-2"
							type="text"
							placeholder="Agregar una tarea"
							onChange={e => setTarea(e.target.value)}
							onKeyUp={k => SubmitForm(k.target.key)}
							value={tarea}
							required
						/>
					</div>
				</div>
			</form>
			<div>
				<ul className="list-group">
					{tareas.map(item => (
						<li
							className="list-group-item d-flex flex-row flex-wrap"
							key={item.id}>
							<div className="ml-4 flex-fill">
								{item.nombreTarea}
							</div>
							<div>
								<i
									className="fas fa-trash-alt"
									onClick={() => Borrar(item.id)}></i>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div id="pie">
				<span>{Mensaje()}</span>
			</div>
		</div>
	);
}
