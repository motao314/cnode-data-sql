module.exports = {
    name: "KKB-CNode 项目的后端 RESTful API 接口文档",
    version: "0.1.0",
    description: `<div>为了确保返回格式的统一，无论成功还是错误，返回的格式都为：</div><pre>{
    code: 错误码,
    message: 错误描述文字,
    results: 数据
}</pre><div>当返回成功时：code 为 0，message 为 ''</div><div>当返回错误时：code 为对应的错误码（如 100100），message 为对应的错误描述文字，同时配合 HTTP 的 status 进行返回</div>
    `,
    title: "CNode RESTful API 接口文档",
    url: "http://localhost:8888/api",
    sampleUrl: "http://localhost:8888/api"
}