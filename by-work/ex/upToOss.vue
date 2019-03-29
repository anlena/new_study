<template>
  <div
    class="upload"
    style="background:white;"
  >
    <div class="oss_file">
      <input
        type="file"
        :id="id"
        @change="downToken"
      />
      <img
        :src="url"
        alt=""
      >
    </div>
  </div>
</template>
<script>
import OSS from 'ali-oss'
import { uploadFileToken } from '../../api/api.js'
export default {
  name: 'upload',
  data() {
    return {
      region: 'oss-cn-zhangjiakou', //根据你买的那个区的做相应的更改
      bucket: 'jmlj',
      id: 'upload',
      percentage: 0,
      url: '',
      urls: [],
      getToken: {
        sign: '',
      }
    }
  },
  created() {
    // this.downToken();
  },
  methods: {
    downToken() {
      let _this = this;
      uploadFileToken().then(res => {
        let result = res.data.data;
        const client = new OSS({
          region: _this.region,
          accessKeyId: result['Access Key Id'],
          accessKeySecret: result['Access Key Secret'],
          stsToken: result['Security Token'],
          bucket: _this.bucket
        })

        let storeAs = 'upload-file123';
        const file = document.getElementById(_this.id).files[0];

        client.multipartUpload(storeAs, file).then(function (result) {
          console.log(result);
        }).catch(function (err) {
          console.log(err);
        });

        // const files = document.getElementById(_this.id);
        // if (files.files) {
        //   const fileLen = document.getElementById(_this.id).files
        //   const resultUpload = [];
        //   for (let i = 0; i < fileLen.length; i++) {
        //     const file = fileLen[i];
        //     const storeAs = file.name;
        //     client.multipartUpload(storeAs, file, {

        //     }).then((results) => {
        //       if (results.url) {
        //         resultUpload.push(results.url);
        //       }
        //     }).catch((err) => {
        //       console.log(err);
        //     });
        //   }
        //   _this.url = resultUpload;
        // }

      })
    }
  }
}
</script> 

<style lang="scss">
// .oss_file {
//   height: 150px;
//   width: 150px;
//   border-radius: 50%;
//   // background: red;
//   img {
//     width: 100%;
//     display: inline-block;
//     float: right;
//   }
// }
// .oss_file input {
//   right: 0;
//   top: 0;
//   opacity: 0;
//   // filter: alpha(opacity=0);
//   cursor: pointer;
//   width: 100%;
//   height: 100%;
// }
</style>