import React from 'react'
import marked from 'marked'
import SimpleMDE from 'simplemde'
import highlight from 'highlight.js'
import TagsSelect from "../tags/TagsSelect"
import CatalogSelect from "../catalog/CatalogSelect"
import 'simplemde/debug/simplemde.css'
import {Button, Input} from 'antd'
import {getConfig, getUrlParam} from '../../until/Tool'
import LCAxios from '../../until/LoginCheckAxios'
import axios from 'axios'
import '../../css/editor/EditorButton.css'
import '../../css/editor/Preview.css'
import '../../css/editor/Editor.css'


export default class Editor extends React.Component {
    constructor() {
        super();
        this.state = {
            smde: null,
            title: "请在这里输入标题",
            select_tags: null,
            select_catalog:null,
            catalog_id: null,
            login: null,
        };
        this.save = () => this._save();
        this.back = () => this._back();
        this.setTitle = (e) => this._setTitle(e);
        this.setTags = (tags) => this._setTags(tags);
        this.setCatalog = (catalog) => this._setCatalog(catalog);
    }

    _setTitle(e) {
        this.setState({title: e.target.value});
    }

    _back() {
        history.go(-1);
    }

    _setTags(tags) {
        this.setState({tags})
    }

    _setCatalog(catalog_id) {
        console.log(catalog_id)
        this.setState({catalog_id})
    }

    _save() {
        const url = getConfig("request_save_blog");
        const blog_id = getUrlParam('id');
        const post_params = {
            blog_id,//this.props.blog_id,
            'title': this.state.title,
            'tags': this.state.tags,
            'catalog_id': this.state.catalog_id,
            'content': this.state.smde.value()
        };
        LCAxios({
            url,
            type: "post",
            post_params,
            success: response => {
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
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
        });
        this.setState({smde});
        const url = getConfig("request_get_edit_content");
        const blog_id = getUrlParam('id');
        if (blog_id) {
            LCAxios({
                url,
                type: "post",
                post_params: {blog_id},
                success: response => {
                    if (response.data.code !== 200) {
                        alert(response.data.msg);
                    } else {
                        //需要把数字转换成字符串 插件要求的  但是又不能传入 [""]
                        let default_tags = []
                        if(response.data.data.tags){
                            default_tags = response.data.data.tags.split(",").map(function (value) {
                                return String(value);
                            });
                        }
                        //设置标签node   因为antd挂载之后不会更新  所以在这里设置
                        const select_tags = (
                            <div className="margin-t-50">
                                <span>选择标签：</span>
                                <TagsSelect
                                    setTags={this.setTags}
                                    defaultValue={default_tags}//这个值从后台博客信息中获取   如果是新增博客  则为空
                                />
                            </div>
                        );
                        //获取当前目录  catalog:"郑州|1|-1,荥阳|19|1,荥阳东|20|19"
                        const default_catalog = response.data.data.catalog.split(",").map(function(value){
                           return parseInt(value.split("|")[1]);
                        });
                        //设置目录node   因为antd挂载之后不会更新  所以在这里设置  catalog:"郑州|1|-1,荥阳|19|1,荥阳东|20|19"
                        const select_catalog = (
                            <div className="margin-t-50">
                                <span>选择目录：</span>
                                <CatalogSelect
                                    onChange={this.setCatalog}
                                    defaultValue={default_catalog} //这个值从后台博客信息中获取   如果是新增博客  则获取根目录
                                />
                            </div>
                        );
                        this.setState({
                            title: response.data.data.title,
                            select_tags,
                            select_catalog,
                            tags:response.data.data.tags,
                            catalog_id:response.data.data.catalog_id,
                        });
                        this.state.smde.value(response.data.data.content);
                    }
                },
                failSet: (login_node) => {
                    this.setState({login: login_node})
                },
            });
        }else{
            const select_tags = (
                <div className="margin-t-50">
                    <span>选择标签：</span>
                    <TagsSelect
                        setTags={this.setTags}
                    />
                </div>
            );
            //设置目录node   因为antd挂载之后不会更新  所以在这里设置  catalog:"郑州|1|-1,荥阳|19|1,荥阳东|20|19"
            const select_catalog = (
                <div className="margin-t-50">
                    <span>选择目录：</span>
                    <CatalogSelect
                        onChange={this.setCatalog}
                    />
                </div>
            );
            this.setState({
                select_tags,
                select_catalog,
            });
        }
    }

    render() {
        return (
            <div>
                <div className="editor-title">
                    <Input placeholder={this.state.title} size="large" onChange={this.setTitle}/>
                </div>
                {this.state.select_catalog}
                {this.state.select_tags}
                <div className="margin-t-50">
                    <textarea id="editor"/>
                </div>
                <div className="text-center">
                    <Button className="margin-b-15" onClick={this.save} type="primary" size="large">保存</Button>
                    <Button className="margin-l-50 margin-b-15" onClick={this.back} type="primary" size="large">返回</Button>
                </div>
                {this.state.login}
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