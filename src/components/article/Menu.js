import React from 'react'
import "../../css/content/Menu.css"
//@todo scrollIntoView
export default class Menu extends React.Component{
    scrollIntoContent(event){
        const name = event.target.getAttribute("name");
        const dom = document.getElementById(name)
        dom.scrollIntoView()
    }
    render(){
        let menu_list = [];
        if(this.props.menu_list){
            this.props.menu_list.map((value,key,arr)=>{
                menu_list.push(<div name={value.value} onClick={e=>this.scrollIntoContent(e)} key={key} className="menu-item" style={{marginLeft:value.level*10}}>{value.value}</div>)
            });
        }
        return(
            <div>
                <h1 className="text-center borderBottom">目录</h1>
                {menu_list}
            </div>
        )
    }
}