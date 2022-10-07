import React from "react"
import styles from "./styles.module.scss"
import logo from "assets/logos/venrup_logo.jpg"

const DummyComponent = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div>
					<img src={logo} alt="" className={styles.logo} />
					<p className="">React boilerplate</p>
				</div>
			</div>
		</>
	)
}

export default DummyComponent
