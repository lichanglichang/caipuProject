import React, { useContext, useEffect, useRef, useState } from 'react';
import "./shoppingcart.css"
import ThemeContext from './MyContext';
import axios from 'axios';
import getCookieByKey from "../getCookie"
function Propose() {
	
	const [goods, setGoods] = useState<any>(null);
	const [num, setNum] = useState<any>(null);
	const cliStatue = React.useContext(ThemeContext);

	useEffect(() => {
		showcart()

	}, [num])

	function showcart() {
		axios.post("http://localhost:8200/shoppingcart", {
			username: getCookieByKey("username")
		})
			.then(function (r: any) {
				// console.log(r.data.shoppingcartResult);
				setGoods(r.data.shoppingcartResult);

			})
	}
	function deletecart(name: any, num: number) {
		
		axios.post("http://localhost:8200/deletecart", {
			goodsname: name,
			number: num,
			username: getCookieByKey("username")
		})
			.then(function (r: any) {
				showcart()
				alert("删除成功");

			})
	}

	function tzsl(goodsprice:any,e: any) {
		if (e.target.innerHTML === "-") {
			 
			e.target.nextElementSibling.innerHTML = Number(e.target.nextElementSibling.innerHTML) - 1;
			let parent=e.target.parentNode;
			 let p=parent.parentNode;
			 let price=Number(e.target.nextElementSibling.innerHTML)*goodsprice;
			 p.nextElementSibling.innerHTML="总价："+price.toFixed(2);
			 setNum(Number(e.target.nextElementSibling.innerHTML))
			
		} else if (e.target.innerHTML === "+") {
		
			e.target.previousElementSibling.innerHTML=Number(e.target.previousElementSibling.innerHTML) + 1;
			let parent1=e.target.parentNode;
			let p1=parent1.parentNode;
			let price=Number(e.target.previousElementSibling.innerHTML)*goodsprice
			 p1.nextElementSibling.innerHTML="总价："+price.toFixed(2);	
			 setNum(e.target.previousElementSibling.innerHTML)
		}

	}
	function changecart(name: any) {
		console.log(num);
		
		axios.post("http://localhost:8200/changecart", {
			goodsname: name,
			number: num,
			username: getCookieByKey("username")
		})
			.then(function (r: any) {
				alert("修改成功");
				showcart();
				
			})
	}
	function showcontent() {

		if (goods != null) {
			return goods.map(function (goods: any) {
				// setNum (goods.number);
				// const nums=goods.number
				return <div className="cartinnerq" key={goods.id}>

					<div className='goodsurlq'><img src={"http://localhost:8200/public/shopping/" + goods.img} alt="" /></div>
					<div className='goodsq'>
						<h3 className='goodsnmq'>商品名:{goods.goodsname}</h3>
						<div className='sellinfoq'>
							<span className='goodsopq'>单价:{goods.total_price}</span>
							<span className='goodsnumq'>数量:
								<div className='buynumq' onClick={tzsl.bind(null,goods.total_price)}>
									<div className='jianq'>-</div>
									<div className='buyNumq'>{goods.number}</div>
									<div className='jiaq' >+</div>
								</div>
							</span>
							<span className='goodsupq'>总价:{goods.unit_price}</span>
						</div>
					</div>
					<div className='deleteq' onClick={deletecart.bind(null, goods.goodsname, goods.number)}>删除</div>
					<div className='deleteq' onClick={changecart.bind(null, goods.goodsname)}>确认修改</div>

				</div>
			})
		}
	}
	return (
		<div>
			<div className="shopcartq" style={{ display: (cliStatue === 'meishi' ? 'block' : 'none') }}>
				{showcontent()}
			</div>
		</div>
	);
}
export default Propose;