import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<section className="container">
			<h2 className="mt-5">Welcome to admin home page</h2>
			<hr />
			<nav className="nav flex-column">
				<Link to={"/create-quiz"} className="nav-link">
					<button className='btn btn-outline-info'>Create a New Quiz</button>
				</Link>
				<Link to={"/all-quizzes"} className="nav-link">
					<button className='btn btn-outline-info'>Manage existing Quizes</button>
				</Link>
			</nav>
		</section>
	)
}

export default Admin