import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./css/personalNote.css";
import getNoteCookie from './getNoteCookie';

function PersonalNote() {
	const [personalN, setPersonalN] = useState<any>([]);
	// const [id, setId] = useState<any>(null);
	// const [flag, setFlag] = useState<any>(false);
	const cookie0 = document.cookie.split(";");
	const cookie = getNoteCookie(cookie0);

	useEffect(() => {
		showPersonalN();
	}, [])

	function showPersonalN() {
		axios.post("http://localhost:8200/personalNote", {
			cookie: cookie
		})
			.then(function (r: any) {
				setPersonalN(r.data);
				// console.log( r.data );
				
			}).catch(function (r: any) {
				// console.log(personalN);
			})
	}

	function deleteNote(id: any) {
		axios.post("http://localhost:8200/deleteNote1", {
			id: id
		}
		).then(function (r: any) {
			showPersonalN();
			alert("删除成功")
		}).catch(function (error:any){
			showPersonalN();
			alert("删除成功")
		})
	}

	function mapPersonal() {
		// console.log(personalN.length);
		if (personalN.length != 0) {
			// console.log(222);
			return personalN.map(function (personalN: any) {
				var picture1 = personalN.picture.substring(1,personalN.picture.length-1);
				// console.log( picture1 );
				var picture2 = picture1.split(",");			
				return <div className="perNote1" key={personalN.id} >
					<div className="perNoteLeft">
						<img src={"http://localhost:8200/public/bximg/"+picture2[0]} />
						<div className="perLeftIntr">
							<span>{personalN.title}</span>
							<p>{personalN.content}</p>
						</div>
					</div>
					<div className="perNoteRight">
						<div className="perR1">编辑</div>
						<div className="perR2" onClick={deleteNote.bind(null, personalN.id)} >删除</div>
					</div>
				</div>

			})
		}
		else {
			// console.log(111);
			return <div style={{ lineHeight: "300px", width: "700px", height: '300px', color: "green", textAlign: "center" }}>
				暂无笔记！！！
			</div>
		}
	}

	return (
		<>
			<div className="personalNote" >
				{
					mapPersonal()
				}
			</div>
		</>
	);

}
export default PersonalNote;