import React from 'react'
import Marked from 'marked'
import HighLight from 'highlight.js'
import "../../css/content/Content.css"


export default class Content extends React.Component {
    componentWillMount() {
        const renderer = new Marked.Renderer();
        //重写 Renderer.prototype.heading 方法   添加锚点ID  因为中文内容不会生成ID
        renderer.heading = (text, level, raw) => {
            return '<h' + level + ' id="' + text + '">' + text + '</h' + level + '>\n'
        }
        //原来的renderer 方法
        // Renderer.prototype.heading = function(text, level, raw) {
        //     return '<h'
        //         + level
        //         + ' id="'
        //         + this.options.headerPrefix
        //         + raw.toLowerCase().replace(/[^\w]+/g, '-')
        //         + '">'
        //         + text
        //         + '</h'
        //         + level
        //         + '>\n';
        // };
        Marked.setOptions({
            renderer,
            highlight: code => HighLight.highlightAuto(code).value,
        })
    }

    render() {
        return (
            <div>
                <div className="content-title">
                    {this.props.title}
                </div>
                <div className="content-time">
                    {this.props.created_at}
                </div>
                <div className="content-detail" dangerouslySetInnerHTML={{__html: Marked(this.props.content)}}></div>
            </div>
        )
    }
}