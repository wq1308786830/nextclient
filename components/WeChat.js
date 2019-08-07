import React from 'react';
import wx from 'weixin-js-sdk';
import Layout from '../components/MyLayout';

export default class About extends React.Component {
  onScan = () => {
    wx.scanQRCode({
      needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: res => {
        const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        window.console.log(result);
      }
    });
  };

  componentDidMount() {
    let encodedUrl = encodeURIComponent('http://russellwq.club:5003/about');
    async function fetchData(encodedUrl) {
      if (encodedUrl === '') {
        return;
      }
      const res = await fetch(
        `https://api.russellwq.club/weChat/getWeChatSign?url=${encodedUrl}`
      );
      const signResp = await res.json();
      if (signResp && signResp.code === 100) {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
          // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: signResp.data.appId, // 必填，公众号的唯一标识
          timestamp: signResp.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: signResp.data.nonceStr, // 必填，生成签名的随机串
          signature: signResp.data.signature, // 必填，签名
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
        });
      }
    }

    fetchData(encodedUrl);
  }

  render() {
    return (
      <Layout>
        <p>This is the about page</p>
        <button onClick={this.onScan}>扫码</button>
      </Layout>
    );
  }
}
