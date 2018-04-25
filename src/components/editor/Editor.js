import React from 'react'
import marked from 'marked'
import SimpleMDE from 'simplemde'
import highlight from 'highlight.js'
import SelectTag from "./SelectTag"
import ConnectCatalogSelect from "../../containers/ConnectCatalogSelect"
import 'simplemde/debug/simplemde.css'
import {Button, Input} from 'antd'
import {getConfig} from '../../until/Tool'
import axios from 'axios'
import '../../css/editor/EditorButton.css'
import '../../css/editor/Preview.css'
import '../../css/editor/Editor.css'


export default class Editor extends React.Component {
    constructor() {
        super();
        this.state = {smde: null, title: "请在这里输入标题", tags: null, catalog: null};
        this.save = () => this._save();
        this.setTitle = (e) => this._setTitle(e);
        this.setTags = (tags) => this._setTags(tags);
        this.setCatalog = (catalog) => this._setCatalog(catalog);
    }

    _setTitle(e) {
        this.setState({title: e.target.value});
    }

    _setTags(tags) {
        this.setState({tags})
    }

    _setCatalog(catalog) {
        this.setState({catalog})
    }
    componentDidMount(){
        //@todo 如果有博客ID   则去获取博客信息  通过ajax或者props传递
        //@todo  设置默认的文章信息
        //@todo  如果没有博客ID  是新博客 则去获取default catalog 根目录
    }
    _save() {
        axios.post(
            getConfig("request_save_blog"),
            {
                'blog_id': false,//this.props.blog_id,
                'title': this.state.title,
                'tags': this.state.tags,
                'catalog_id': this.state.catalog,
                'content': this.state.smde.value()
            }
        ).then(
            response => {
            }
        ).catch(e => console.log(e))
    }

    componentDidMount() {
        var smde = new SimpleMDE({
            element: document.getElementById('editor'),
            autofocus: true,
            autosave: true,
            toolbar: tool_bar,
            autoDownloadFontAwesome: false,
            previewRender: function (plainText) {
                return marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return highlight.highlightAuto(code).value;
                    }
                });
            },
        })
        this.setState({smde})
    }

    render() {
        return (
            <div>
                <div className="editor-title">
                    <Input placeholder={this.state.title} size="large" onChange={this.setTitle}/>
                </div>
                <SelectTag
                    setTags={this.setTags}
                    defaultValue={[1]}//这个值从后台博客信息中获取   如果是新增博客  则为空
                />
                <div className="margin-t-50">
                    <span>选择目录：</span>
                    <ConnectCatalogSelect
                        onChange={this.setCatalog}
                        defaultValue={[1]} //这个值从后台博客信息中获取   如果是新增博客  则获取根目录
                    />
                </div>

                <div className="margin-t-50">
                    <textarea id="editor"/>
                </div>
                <Button onClick={this.save} type="primary">保存</Button>
            </div>
        )
    }
}
const tool_bar = [
    {
        name: "bold",
        action: SimpleMDE.toggleBold,
        className: "fa fa-bold",
        title: "Bold"
    },
    {
        name: "italic",
        action: SimpleMDE.toggleItalic,
        className: "fa fa-italic",
        title: "Italic"
    },
    {
        name: "strikethrough",
        action: SimpleMDE.toggleStrikethrough,
        className: "fa fa-strikethrough",
        title: "Strikethrough"
    },
    {
        name: "heading",
        action: SimpleMDE.toggleHeadingSmaller,
        className: "fa fa-header",
        title: "Heading"
    },
    {
        name: "heading-smaller",
        action: SimpleMDE.toggleHeadingSmaller,
        className: "fa fa-header fa-header-x fa-header-smaller",
        title: "Smaller Heading"
    },
    {
        name: "heading-bigger",
        action: SimpleMDE.toggleHeadingBigger,
        className: "fa fa-header fa-header-x fa-header-bigger",
        title: "Bigger Heading"
    },
    {
        name: "heading-1",
        action: SimpleMDE.toggleHeading1,
        className: "fa fa-header fa-header-x fa-header-1",
        title: "Big Heading"
    },
    {
        name: "heading-2",
        action: SimpleMDE.toggleHeading2,
        className: "fa fa-header fa-header-x fa-header-2",
        title: "Medium Heading"
    },
    {
        name: "heading-3",
        action: SimpleMDE.toggleHeading3,
        className: "fa fa-header fa-header-x fa-header-3",
        title: "Small Heading"
    },
    {
        name: "code",
        action: SimpleMDE.toggleCodeBlock,
        className: "fa fa-code",
        title: "Code"
    },
    {
        name: "unordered-list",
        action: SimpleMDE.toggleUnorderedList,
        className: "fa fa-list-ul",
        title: "Generic List"
    },
    {
        name: "ordered-list",
        action: SimpleMDE.toggleOrderedList,
        className: "fa fa-list-ol",
        title: "Numbered List"
    },
    {
        name: "link",
        action: SimpleMDE.drawLink,
        className: "fa fa-link",
        title: "Create Link"
    },
    {
        name: "image",
        action: SimpleMDE.drawImage,
        className: "fa fa-picture-o",
        title: "Insert Image"
    },
    {
        name: "table",
        action: SimpleMDE.drawTable,
        className: "fa fa-table",
        title: "Insert Table"
    },
    {
        name: "horizontal-rule",
        action: SimpleMDE.drawHorizontalRule,
        className: "fa fa-minus",
        title: "Insert Horizontal Line"
    },
    {
        name: "preview",
        action: SimpleMDE.togglePreview,
        className: "fa fa-eye no-disable",
        title: "Toggle Preview"
    },
    {
        name: "side-by-side",
        action: SimpleMDE.toggleSideBySide,
        className: "fa fa-columns no-disable no-mobile",
        title: "Toggle Side by Side"
    },
    {
        name: "fullscreen",
        action: SimpleMDE.toggleFullScreen,
        className: "fa fa-arrows-alt no-disable no-mobile",
        title: "Toggle Fullscreen"
    },
    {
        name: "guide",
        action: "https://simplemde.com/markdown-guide",
        className: "fa fa-question-circle",
        title: "Markdown Guide"
    },
    {
        name: "undo",
        action: SimpleMDE.undo,
        className: "fa fa-undo no-disable",
        title: "Undo"
    },
    {
        name: "redo",
        action: SimpleMDE.redo,
        className: "fa fa-repeat no-disable",
        title: "Redo"
    }
]