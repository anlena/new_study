// 项目里刚刚写的，不知道符合不  
// params 参数 路径 文件名  
function downLoadMix(params, url, title) {
  axios({
    method: 'post',
    url,
    headers: {
      'Content - Type': 'application / json'
    },
    data: params,
    responseType: 'arraybuffer'
  }).then(res => {
    let headers = res.headers;
    let blob = new Blob([res.data], {
      type: headers['content - type']
    });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    if (!title) {
      const fileName = headers['content - disposition'];
      title = fileName.includes('filename = ') ? fileName.split(' = ')[1] : '下载的表单文件';
    }
    link.download = title;
    link.click();
  });
}
